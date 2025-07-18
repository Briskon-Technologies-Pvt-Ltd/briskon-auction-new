import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");
  const userEmail = url.searchParams.get("email");

  if (!userId || !userEmail) {
    return NextResponse.json({ error: "User ID and email are required" }, { status: 400 });
  }

  try {
    // Fetch auctions where the user has placed a bid (no ended filter)
    const { data: bids, error: bidsError } = await supabase
      .from("bids")
      .select("auction_id, amount")
      .eq("user_id", userId);

    if (bidsError) throw bidsError;

    const auctionIds = bids.map((bid) => bid.auction_id);
    const { data: auctions, error: auctionsError } = await supabase
      .from("auctions")
      .select("id, productname, currentbidder, auctiontype, auctionsubtype")
      .in("id", auctionIds);

    if (auctionsError) throw auctionsError;

    // Combine auction and bid data
    const bidHistory = auctions.map((auction) => {
      const userBid = bids.find((b) => b.auction_id === auction.id);
      return {
        auctionId: auction.id,
        productName: auction.productname,
        auctionType: auction.auctiontype || "standard",
        auctionSubtype: auction.auctionsubtype || null,
        bidAmount: userBid?.amount || 0,
        totalBids: 0, // Placeholder; calculate if needed (see below)
        isWinningBid: auction.currentbidder === userEmail,
      };
    });

    // Optionally calculate totalBids if needed
    const totalBidsData = await Promise.all(
      auctionIds.map(async (id) => {
        const { count } = await supabase
          .from("bids")
          .select("*", { count: "exact", head: true })
          .eq("auction_id", id);
        return { auction_id: id, total: count || 0 };
      })
    );
    bidHistory.forEach((bid) => {
      const total = totalBidsData.find((t) => t.auction_id === bid.auctionId)?.total || 0;
      bid.totalBids = total;
    });

    return NextResponse.json(bidHistory || []);
  } catch (error) {
    console.error("Error fetching bid history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
