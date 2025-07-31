import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");
  const userId = url.searchParams.get("id");

  if (!userEmail || !userId) {
    return NextResponse.json({ error: "Missing email or userId" }, { status: 400 });
  }

  try {
    // 1. Get all bids by this user
    const { data: userBids, error: bidsError } = await supabase
      .from("bids")
      .select("auction_id, amount")
      .eq("user_id", userId);

    if (bidsError) throw new Error(`Failed to fetch bids: ${bidsError.message}`);

    const auctionIds = [...new Set(userBids.map((b) => b.auction_id))];
    if (auctionIds.length === 0) return NextResponse.json([]);

    // 2. Fetch all ended auctions the user bid in
    const { data: auctions, error: auctionsError } = await supabase
      .from("auctions")
      .select("id, productname, auctiontype, auctionsubtype, startprice, currentbid, productquantity, currentbidder, ended, targetprice, profiles:seller(fname)")
      .in("id", auctionIds)
      .eq("ended", true);

    if (auctionsError) throw new Error(`Failed to fetch auctions: ${auctionsError.message}`);

    // 3. Fetch all bids for all relevant auctions
    const { data: allBids, error: allBidsError } = await supabase
      .from("bids")
      .select("auction_id, user_id, amount, created_at");

    if (allBidsError) throw new Error(`Failed to fetch all bids: ${allBidsError.message}`);

    const lostAuctions = [];

    for (const auction of auctions) {
      let userLost = false;
      let winningBidAmount = 0;

      const bidsForAuction = allBids.filter((b) => b.auction_id === auction.id);

      if (auction.auctiontype === "yankee" || auction.auctionsubtype === "yankee") {
        // Sort all bids in descending order
        const sortedBids = [...bidsForAuction].sort((a, b) => b.amount - a.amount);
        const topNBids = sortedBids.slice(0, auction.productquantity || 1);
        const userInTop = topNBids.some((b) => b.user_id === userId);

        userLost = !userInTop;
        winningBidAmount = topNBids.length > 0 ? topNBids[topNBids.length - 1].amount : 0;
      } else {
        userLost = auction.currentbidder !== userEmail;
        winningBidAmount = auction.currentbid || 0;
      }

      if (userLost) {
  const userBidsForAuction = bidsForAuction
    .filter((b) => b.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const userBidAmount = userBidsForAuction.length > 0 ? userBidsForAuction[0].amount : 0;

  lostAuctions.push({
    auctionId: auction.id,
    productName: auction.productname,
    auctionType: auction.auctiontype || "standard",
    startAmount: auction.startprice || 0,
    winningBidAmount,
    userBidAmount,
    targetprice: auction.targetprice,
    sellerName: Array.isArray(auction.profiles)
      ? auction.profiles[0]?.fname ?? "Unknown"
      : auction.profiles?.fname ?? "Unknown",
  });
}

    }

    return NextResponse.json(lostAuctions);
  } catch (err) {
    console.error("Error fetching lost auctions:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
