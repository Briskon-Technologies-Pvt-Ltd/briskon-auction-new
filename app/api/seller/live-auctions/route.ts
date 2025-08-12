import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface LiveAuction {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: number;
  bidder_count:number;
}


export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  // Step 1: Get the seller ID from email
  const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

const now = new Date().toISOString();

const { data: auctionsData, count, error: countError } = await supabase
  .from("auctions")
  .select(
    `id, productname, currentbid, productimages, startprice, auctiontype, auctionsubtype, categoryid, bidder_count`,
    { count: "exact" }
  )
  .eq("createdby", userEmail)
  .lte("scheduledstart", now)
  .eq("ended", false);        // not yet ended

const liveAuctions: LiveAuction[] = (auctionsData || []).map((auction) => {
  // Check if productimages is truthy and has a 'length' property > 0 (likely an array)
  const productimages =
    auction.productimages && auction.productimages.length > 0
      ? auction.productimages[0]
      : "/placeholder.svg";

  return {
    id: auction.id,
    productname: auction.productname || "Untitled",
    currentbid: auction.currentbid,
    productimages, // single image string here
    startprice: auction.startprice,
    auctiontype: auction.auctiontype,
    auctionsubtype: auction.auctionsubtype,
    categoryid: auction.categoryid,
    bidder_count: auction.bidder_count,
  };
});



if (countError) {
  return NextResponse.json({ success: false, error: countError.message });
}

  return NextResponse.json({ success: true, count, data: liveAuctions });
}
