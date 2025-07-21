import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const isApproximatelyEqual = (a: number, b: number, epsilon = 0.01) =>
  Math.abs(a - b) < epsilon;

interface Auction {
  id: string;
  productname?: string;
  productdescription?: string;
  productimages?: string[];
  productdocuments?: string[];
  startprice?: number;
  currentbid?: number;
  minimumincrement?: number;
  percent?: number;
  bidincrementtype?: "fixed" | "percentage";
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  scheduledstart?: string;
  bidcount?: number;
  participants?: string[];
  issilentauction?: boolean;
  currentbidder?: string;
  createdby?: string;
  auctionsubtype?: string;
  requireddocuments?: string | null;
  auctiontype?: "forward" | "reverse";
  ended?: boolean;
  editable?: boolean;
  questions?: {
    user: string;
    question: string;
    answer: string | null;
    question_time: string;
    answer_time: string | null;
  }[];
  question_count?: number;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { data, error } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }

    const auction = data as Auction;

    const startIST = auction.scheduledstart
      ? DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata")
      : DateTime.now().setZone("Asia/Kolkata");

    const durationSeconds = getDurationInSeconds(auction.auctionduration);
    const endIST = startIST.plus({ seconds: durationSeconds });
    const timeLeft = calculateTimeLeft(endIST);

    return NextResponse.json({ success: true, data: { ...auction, timeLeft } }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();
    const action = formData.get("action") as string;

    if (!action) {
      return NextResponse.json({ success: false, error: "Missing action parameter" }, { status: 400 });
    }

    if (action === "bid") {
      const user_id = formData.get("user_id") as string;
      const user_email = formData.get("user_email") as string;
      const amount = parseFloat(formData.get("amount") as string);
      const currentprice = parseFloat(formData.get("currentprice") as string);
      const created_at = formData.get("created_at") as string;

      const documents: { id: string; url: string }[] = [];
      const images: { id: string; url: string }[] = [];

      for (const [key, value] of formData.entries()) {
        if (key.startsWith("documents[")) documents.push(JSON.parse(value as string));
        if (key.startsWith("images[")) images.push(JSON.parse(value as string));
      }

      if (!user_id || !user_email || isNaN(amount) || !created_at || isNaN(currentprice)) {
        return NextResponse.json({ success: false, error: "Missing or invalid fields" }, { status: 400 });
      }

      const { data: auctionData, error: fetchError } = await supabase
        .from("auctions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !auctionData) {
        return NextResponse.json({ success: false, error: "Auction not found" }, { status: 404 });
      }

      const now = DateTime.now().setZone("Asia/Kolkata");
      const start = auctionData.scheduledstart
        ? DateTime.fromISO(auctionData.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata")
        : now;

      const durationSeconds = getDurationInSeconds(auctionData.auctionduration);
      const end = start.plus({ seconds: durationSeconds });

      if (now < start) return NextResponse.json({ success: false, error: "Auction has not started yet" }, { status: 400 });
      if (auctionData.ended) return NextResponse.json({ success: false, error: "Auction already ended" }, { status: 400 });
      if (!isApproximatelyEqual(amount, currentprice)) return NextResponse.json({ success: false, error: `Bid must match current price ₹${currentprice.toLocaleString()}` }, { status: 400 });
      if (user_email === auctionData.createdby) return NextResponse.json({ success: false, error: "Creator cannot bid" }, { status: 400 });

      const updatedParticipants = auctionData.participants?.includes(user_id)
        ? auctionData.participants
        : [...(auctionData.participants || []), user_id];

      const updatedBidCount = (auctionData.bidcount || 0) + 1;

      const { error: bidError } = await supabase
        .from("bids")
        .insert({
          auction_id: id,
          user_id,
          amount,
          created_at,
          productimages: images,
          productdocuments: documents,
        });

      if (bidError) return NextResponse.json({ success: false, error: bidError.message }, { status: 400 });

      const { data, error: updateError } = await supabase
        .from("auctions")
        .update({
          currentbid: amount,
          currentbidder: user_email,
          participants: updatedParticipants,
          bidcount: updatedBidCount,
          ended: true,
          editable: false, // Mark as not editable after a bid
        })
        .eq("id", id)
        .select();

      if (updateError) return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });

      return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
    }

   else if (action === "postQuestion") {
      const user_id = formData.get("user_id") as string;
      const user_email = formData.get("user_email") as string;
      const question = formData.get("question") as string;

      if (!user_id || !user_email || !question) {
        return NextResponse.json({ success: false, error: "Missing fields for question" }, { status: 400 });
      }

      const { data: auction, error } = await supabase
        .from("auctions")
        .select("participants, questions, question_count, createdby, scheduledstart, auctionduration")
        .eq("id", id)
        .single();

      if (error || !auction) return NextResponse.json({ success: false, error: "Auction not found" }, { status: 404 });

      const nowIST = DateTime.now().setZone("Asia/Kolkata");
      const startIST = auction.scheduledstart
        ? DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata")
        : nowIST;

      const durationSeconds = getDurationInSeconds(auction.auctionduration);
      const endIST = startIST.plus({ seconds: durationSeconds });

      if (nowIST < startIST || nowIST > endIST) {
        return NextResponse.json({ success: false, error: "Questions can only be posted during the auction period" }, { status: 400 });
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("fname, lname, email")
        .eq("id", user_id)
        .single();

      const userName = profileData
        ? `${profileData.fname || ""} ${profileData.lname || ""}`.trim() || profileData.email || user_id
        : user_id;

      const newQuestion = {
        user: userName,
        question,
        answer: null,
        question_time: nowIST.toISO(),
        answer_time: null,
      };

      const updatedQuestions = auction.questions ? [...auction.questions, newQuestion] : [newQuestion];
      const updatedQuestionCount = (auction.question_count || 0) + 1;

      const { error: updateError } = await supabase
        .from("auctions")
        .update({
          questions: updatedQuestions,
          question_count: updatedQuestionCount,
        })
        .eq("id", id);

      if (updateError) return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });

      return NextResponse.json({ success: true, data: { questions: updatedQuestions, question_count: updatedQuestionCount } }, { status: 200 });
    }

   else if (action === "answerQuestion") {
      const user_email = formData.get("user_email") as string;
      const questionIndex = parseInt(formData.get("questionIndex") as string);
      const answer = formData.get("answer") as string;

      if (!user_email || isNaN(questionIndex) || !answer) {
        return NextResponse.json({ success: false, error: "Missing fields to answer" }, { status: 400 });
      }

      const { data: auction, error } = await supabase
        .from("auctions")
        .select("questions, createdby, scheduledstart, auctionduration")
        .eq("id", id)
        .single();

      if (error || !auction) return NextResponse.json({ success: false, error: "Auction not found" }, { status: 404 });

      const now = DateTime.now().setZone("Asia/Kolkata");
      const start = auction.scheduledstart
        ? DateTime.fromISO(auction.scheduledstart, { zone: "utc" }).setZone("Asia/Kolkata")
        : now;

      const durationSeconds = getDurationInSeconds(auction.auctionduration);
      const end = start.plus({ seconds: durationSeconds });

      if (now > end) return NextResponse.json({ success: false, error: "Auction has ended" }, { status: 400 });
      if (user_email !== auction.createdby) return NextResponse.json({ success: false, error: "Only creator can answer" }, { status: 403 });

      if (!auction.questions || questionIndex < 0 || questionIndex >= auction.questions.length) {
        return NextResponse.json({ success: false, error: "Invalid question index" }, { status: 400 });
      }

      const updatedQuestions = [...auction.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answer,
        answer_time: now.toISO(),
      };

      const { error: updateError } = await supabase
        .from("auctions")
        .update({ questions: updatedQuestions })
        .eq("id", id);

      if (updateError) return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });

      return NextResponse.json({ success: true, data: { questions: updatedQuestions } }, { status: 200 });
    }
   else if (action === "markEnded") {
          // New action to mark auction as ended
          const { data: auctionData, error: fetchError } = await supabase
            .from("auctions")
            .select("ended")
            .eq("id", id)
            .single();
    
          if (fetchError || !auctionData) {
            return NextResponse.json(
              { success: false, error: fetchError?.message || "Auction not found" },
              { status: 404 }
            );
          }
    
          if (auctionData.ended) {
            return NextResponse.json(
              { success: false, error: "Auction is already marked as ended" },
              { status: 400 }
            );
          }
    
          const { error: updateError } = await supabase
            .from("auctions")
            .update({ ended: true, editable: false }) // Mark as ended and not editable
            .eq("id", id);
    
          if (updateError) {
            return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
          }
    
          return NextResponse.json({ success: true, data: { ended: true } }, { status: 200 });
        }


    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// Helper
function getDurationInSeconds(duration: Auction["auctionduration"]): number {
  if (!duration) return 0;
  return ((duration.days || 0) * 86400) + ((duration.hours || 0) * 3600) + ((duration.minutes || 0) * 60);
}

// Utility: Time left string in IST
function calculateTimeLeft(endDate: DateTime): string {
  const now = DateTime.now().setZone("Asia/Kolkata");
  const diff = endDate.diff(now, ["days", "hours", "minutes"]).toObject();
  if ((diff.days ?? 0) <= 0 && (diff.hours ?? 0) <= 0 && (diff.minutes ?? 0) <= 0) {
    return "Auction ended";
  }
  return `${diff.days ?? 0}d ${diff.hours ?? 0}h ${diff.minutes ?? 0}m`;
}
