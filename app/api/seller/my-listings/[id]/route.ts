import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon"; // Ensure luxon is installed

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  startamount?: number;
  targetprice?: number;
  ended: boolean;
  questions?: { user: string; question: string; answer: string | null; question_time: string | null; answer_time: string | null }[];
  createdby?: string;
  scheduledstart?: string | null;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
}

interface Bid {
  user_id: string;
  amount: number;
  created_at: string;
  productimages?: string[];
  productdocuments?: string[];
}

function getDurationInSeconds(duration?: { days?: number; hours?: number; minutes?: number }): number {
  const { days = 0, hours = 0, minutes = 0 } = duration || {};
  return (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60);
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = profileData.id;

    const { data: auctionData, error: auctionError } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", params.id)
      .eq("createdby", userEmail)
      .single();

    if (auctionError || !auctionData) {
      return NextResponse.json({ error: "Listing not found or access denied" }, { status: 404 });
    }

    const auction = auctionData as Auction;

    const { data: bidData, error: bidError } = await supabase
      .from("bids")
      .select("*") // Include all fields, including productimages and productdocuments
      .eq("auction_id", params.id)
      .order("created_at", { ascending: false });

    if (bidError) {
      return NextResponse.json({ error: "Failed to fetch bid history" }, { status: 500 });
    }

    const bidHistory = await Promise.all(
      bidData.map(async (bid: Bid) => {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("fname, lname, email")
          .eq("id", bid.user_id)
          .single();
        const profile = profileData as { fname?: string; lname?: string; email?: string } | null;
        const bidderName = profile
          ? `${profile.fname || ""} ${profile.lname || ""}`.trim() || profile.email || bid.user_id
          : `User ${bid.user_id}`;
        const bidTimeIST = new Date(bid.created_at).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        });
        return {
          bidder: bidderName,
          amount: bid.amount,
          time: bidTimeIST,
          productimages: bid.productimages, // Include from bids table
          productdocuments: bid.productdocuments, // Include from bids table
        };
      })
    );

    return NextResponse.json({ success: true, data: { ...auction, bidHistory } });
  } catch (error) {
    console.error("Error fetching listing details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // No changes needed for POST, keeping it as a legacy method if used elsewhere
  return NextResponse.json({ error: "Use PUT method for updates" }, { status: 405 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const formData = await request.json();
  const action = formData.action;

  if (action === "answerQuestion") {
    const user_email = formData.user_email as string;
    const questionIndex = parseInt(formData.questionIndex as string);
    const answer = formData.answer as string;

    if (!user_email || isNaN(questionIndex) || !answer) {
      return NextResponse.json({ success: false, error: "Missing fields to answer" }, { status: 400 });
    }

    const { data: auction, error } = await supabase
      .from("auctions")
      .select("questions, createdby, scheduledstart, auctionduration")
      .eq("id", params.id)
      .single();

    if (error || !auction) {
      return NextResponse.json({ success: false, error: "Auction not found" }, { status: 404 });
    }

    // Removed the end time check to allow answering on ended auctions
    if (user_email !== auction.createdby) {
      return NextResponse.json({ success: false, error: "Only creator can answer" }, { status: 403 });
    }

    if (!auction.questions || questionIndex < 0 || questionIndex >= auction.questions.length) {
      return NextResponse.json({ success: false, error: "Invalid question index" }, { status: 400 });
    }

    const updatedQuestions = [...auction.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answer,
      answer_time: DateTime.now().setZone("Asia/Kolkata").toISO(),
    };

    const { error: updateError } = await supabase
      .from("auctions")
      .update({ questions: updatedQuestions })
      .eq("id", params.id);

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { questions: updatedQuestions } }, { status: 200 });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}
