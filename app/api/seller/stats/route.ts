import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Stats {
  activeListings: number;
  totalSales: number;
  totalBids: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    // Fetch seller's profile to get user ID
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = profileData.id;

    // Fetch active listings (ongoing auctions created by seller)
    const { data: activeListingsData, error: activeListingsError } = await supabase
      .from("auctions")
      .select("id", { count: "exact" })
      .eq("createdby", userEmail)
      .eq("ended", false);

    if (activeListingsError) {
      return NextResponse.json({ error: "Failed to fetch active listings" }, { status: 500 });
    }

    const activeListings = activeListingsData.length;

    // Fetch total sales (sum of currentbid for all auctions created by seller)
    const { data: totalSalesData, error: totalSalesError } = await supabase
      .from("auctions")
      .select("currentbid")
      .eq("createdby", userEmail);

    if (totalSalesError) {
      return NextResponse.json({ error: "Failed to fetch total sales" }, { status: 500 });
    }

    const totalSales = totalSalesData.reduce((sum, auction) => sum + (auction.currentbid || 0), 0);

    // Fetch total bids (sum of bidcount for all auctions created by seller)
    const { data: totalBidsData, error: totalBidsError } = await supabase
      .from("auctions")
      .select("bidcount")
      .eq("createdby", userEmail);

    if (totalBidsError) {
      return NextResponse.json({ error: "Failed to fetch total bids" }, { status: 500 });
    }

    const totalBids = totalBidsData.reduce((sum, auction) => sum + (auction.bidcount || 0), 0);

    const stats: Stats = {
      activeListings,
      totalSales,
      totalBids,
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
