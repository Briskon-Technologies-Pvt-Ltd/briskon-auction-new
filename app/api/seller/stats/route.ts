import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scheduler } from "timers/promises";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Stats {
  activeListings: number;
  totalSales: number;
  totalBids: number;
  topAuctions: {
    id: string;
    productname: string;
    productimages:string;
    category: string;
    type: string;
    format: string;
    starting_bid: number;
    current_bid: string;
    gain: number;
    bidders: number;
    auctionduration?: { days?: number; hours?: number; minutes?: number }; 
    scheduledstart:string;
  }[];
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    // Step 1: Get seller's ID
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = profileData.id;

    // Step 2: Active Listings (not ended)
    const { data: activeListingsData, error: activeListingsError } = await supabase
      .from("auctions")
      .select("id", { count: "exact" })
      .eq("createdby", userEmail)
      .gt("bidder_count", 0)
      .eq("ended", false);

    if (activeListingsError) {
      return NextResponse.json({ error: "Failed to fetch active listings" }, { status: 500 });
    }

    const activeListings = activeListingsData.length;

    // Step 3: Total Sales (sum of currentbid)
    const { data: totalSalesData, error: totalSalesError } = await supabase
      .from("auctions")
      .select("currentbid")
      .eq("createdby", userEmail);

    if (totalSalesError) {
      return NextResponse.json({ error: "Failed to fetch total sales" }, { status: 500 });
    }

    const totalSales = totalSalesData.reduce((sum, auction) => sum + (auction.currentbid || 0), 0);

    // Step 4: Total Bids (sum of bidcount)
    const { data: totalBidsData, error: totalBidsError } = await supabase
      .from("auctions")
      .select("bidcount")
      .eq("createdby", userEmail);

    if (totalBidsError) {
      return NextResponse.json({ error: "Failed to fetch total bids" }, { status: 500 });
    }

    const totalBids = totalBidsData.reduce((sum, auction) => sum + (auction.bidcount || 0), 0);

    const {data: { user },} = await supabase.auth.getUser();

const { data: soldAuctions, error } = await supabase
  .from("auctions")
  .select("id, currentbid")
  .eq("createdby", user?.id)
  .eq("status", "closed"); // only sold auctions
const totalSoldAmount = soldAuctions?.reduce(
  (sum, auction) => sum + (auction.currentbid || 0),
  0
);
// Step 5: Top 5 Active Auctions with Bids (sorted by currentbid)
const { data: topAuctionsData, error: topAuctionsError } = await supabase
  .from("auctions")
  .select(
    "id, productname, productimages, categoryid, auctiontype, auctionsubtype, startprice, currentbid, bidder_count, auctionduration, scheduledstart"
  )
  .eq("createdby", userEmail)
  .eq("ended", false) // Only active listings
  .gt("bidder_count", 0) // Only auctions with bidders
  .order("currentbid", { ascending: false });

if (topAuctionsError) {
  return NextResponse.json({ error: "Failed to fetch top auctions" }, { status: 500 });
}
const activeListingsCount = topAuctionsData?.length || 0;
const topAuctions = (topAuctionsData || []).map((auction: any) => {
        const productimages = Array.isArray(auction.productimages) && auction.productimages.length > 0
  ? auction.productimages[0]
  : "/placeholder.svg"; // fallback image
return {
  id: auction.id,
  productname: auction.productname,
  productimages,
  category: auction.categoryid,
  type: auction.auctiontype,
  format: auction.auctionsubtype,
  starting_bid: auction.startprice,
  current_bid: auction.currentbid,
  gain: auction.currentbid - auction.startprice,
  bidders: auction.bidder_count,
  auctionduration:auction.auctionduration,
  scheduledstart:auction.scheduledstart,
} 
});
    const stats: Stats = {
      activeListings:activeListingsCount,
      totalSales,
      totalBids,
      topAuctions,
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
