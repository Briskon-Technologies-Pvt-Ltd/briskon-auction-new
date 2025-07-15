import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the Bid interface
interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export async function GET(
  request: Request,
  { params }: { params: { auctionId: string } }
) {
  try {
    const { auctionId } = params;

    const { data, error } = await supabase
      .from("bids") // Adjust table name if different
      .select(
        `
  id,
  auction_id,
  user_id,
  amount,
  created_at,
`
      ) // Adjust fields as needed (e.g., "id, auction_id, user_id, amount, created_at")
      .eq("auction_id", auctionId);

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
