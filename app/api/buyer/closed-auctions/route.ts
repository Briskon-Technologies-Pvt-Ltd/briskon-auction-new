import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface closedAuction {
  id: string;
  productname: string;
  currentbid: number | null;
  productimages: string;
  startprice: number;
  auctiontype: string;
  auctionsubtype: string;
  categoryid: string;
  targetprice:number;
  bidder_count:number;
  scheduledstart:string;
  auctionduration:{ days?: number; hours?: number; minutes?: number };
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

  // Fetch seller profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (profileError || !profileData) {
    return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
  }

  const now = new Date().toISOString();

  // Fetch upcoming auctions count
  const { data: auctionsData,count, error: countError } = await supabase
    .from("auctions")
    .select(`id, productname, currentbid, productimages, startprice, auctiontype, auctionsubtype, categoryid, scheduledstart,  auctionduration, targetprice, bidder_count`,
       { count: "exact"})
    .eq("createdby", userEmail) // use seller ID 
    .eq("ended", true)
    .order("productname", { ascending: true });    
         // not ended
   if (countError) {
      return NextResponse.json(
        { success: false, error: countError.message },
        { status: 500 }
      );
    }
    const closed: closedAuction[] = (auctionsData || []).map((auction) => {
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
    scheduledstart:auction.scheduledstart,
    targetprice:auction.targetprice,
    bidder_count:auction.bidder_count,
    auctionduration:auction.auctionduration
  };
});

  if (countError) {
    return NextResponse.json({ success: false, error: countError});
  }

  return NextResponse.json({ success: true, count, data: closed });

}
