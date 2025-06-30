import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ auctionId: string }> }
) {
  try {
    const params = await context.params;
    const { auctionId } = params;

    console.log("Fetching bids for auctionId:", auctionId); // Debug log

    const { data, error } = await supabase
      .from("bids")
      .select("*")
      .eq("auction_id", auctionId);

    if (error) {
      console.error("Supabase Error for auctionId", auctionId, ":", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" }, // Ensure JSON object
      { status: 500 }
    );
  }
}
