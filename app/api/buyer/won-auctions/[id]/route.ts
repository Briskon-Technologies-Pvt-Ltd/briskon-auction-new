import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Auction {
  id: string;
  productname?: string;
  title?: string;
  categoryid?: string;
  auctiontype: "forward" | "reverse";
  currentbid?: number;
  bidincrementtype?: "fixed" | "percentage";
  minimumincrement?: number;
  startprice?: number;
  scheduledstart?: string | null;
  auctionduration?: { days?: number; hours?: number; minutes?: number };
  bidders?: number;
  watchers?: number;
  productimages?: string[];
  productdocuments?: string[];
  productdescription?: string;
  specifications?: string;
  buyNowPrice?: number;
  participants?: string[];
  bidcount?: number;
  createdby?: string;
  questions?: { user: string; question: string; answer: string | null; question_time: string | null; answer_time: string | null }[];
  question_count?: number;
  issilentauction?: boolean;
  currentbidder?: string;
  percent?: number;
  attributes?: string;
  sku?: string;
  brand?: string;
  model?: string;
  reserveprice?: number;
  auctionsubtype?: string;
  ended?: boolean;
  editable?: boolean;
}

interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
  productimages?: string[]; // Bid-specific images for reverse auctions
  productdocuments?: string[]; // Bid-specific documents for reverse auctions
}

interface Profile {
  id: string;
  fname?: string;
  lname?: string;
  email?: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    // Fetch the auction
    const { data: auctionData, error: auctionError } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", params.id)
      .eq("ended", true)
      .single();

    if (auctionError || !auctionData) {
      return NextResponse.json({ error: "Auction not found or not ended" }, { status: 404 });
    }

    const auction = auctionData as Auction;

    // Verify the user won the auction
    if (auction.currentbidder !== userEmail) {
      return NextResponse.json({ error: "You did not win this auction" }, { status: 403 });
    }

    // Fetch bid history with bid-specific images and documents
    const { data: bidData, error: bidError } = await supabase
      .from("bids")
      .select("*")
      .eq("auction_id", params.id);

    if (bidError) {
      return NextResponse.json({ error: "Failed to fetch bid history" }, { status: 500 });
    }

    const bids = bidData as Bid[];
    const bidHistory = await Promise.all(
      bids.map(async (bid) => {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("fname, lname, email")
          .eq("id", bid.user_id)
          .single();

        const profile = profileData as Profile | null;
        const bidderName = profile
          ? `${profile.fname || ""} ${profile.lname || ""}`.trim() || profile.email || bid.user_id
          : `User ${bid.user_id} (Profile not found)`;
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
          productimages: bid.productimages || [], // Use bid-specific images
          productdocuments: bid.productdocuments || [], // Use bid-specific documents
        };
      })
    );

    const response = {
      success: true,
      data: {
        ...auction,
        bidHistory,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching won auction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
