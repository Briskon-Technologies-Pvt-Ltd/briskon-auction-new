import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Auction {
  id: number;
  productname: string;
  current_bid: number;
  currentbidder: string;
  auctiontype: string | null;
  auctionsubtype: string | null;
  scheduledstart?: string;
  auctionduration?: { days?: number; hours?: number; minutes?: number } | null;
  profiles: { fname: string; lname: string }[] | { fname: string; lname: string };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");
  const userEmail = url.searchParams.get("email");

  if (!userId || !userEmail) {
    return NextResponse.json({ error: "User ID and email are required" }, { status: 400 });
  }

  try {
    // Step 1: Fetch user's bids
    const { data: userBids, error: bidsError } = await supabase
      .from("bids")
      .select("auction_id, amount, created_at")
      .eq("user_id", userId);

    if (bidsError) throw bidsError;

    const auctionIds = userBids.map((bid) => bid.auction_id);

    // Step 2: Fetch relevant auctions
    const { data: auctionsRaw, error: auctionsError } = await supabase
      .from("auctions")
      .select(`
        id,
        productname,
        currentbidder,
        currentbid,
        auctiontype,
        auctionsubtype,
        auctionduration,
        scheduledstart,
        profiles:seller (fname, lname)
      `)
      .in("id", auctionIds)
      .eq("ended", false)
      .returns<Auction[]>();

    if (auctionsError) throw auctionsError;

    const auctions = auctionsRaw as Auction[];
const now = new Date();
await Promise.all(
  auctions.map(async (auction) => {
    if (auction.scheduledstart && auction.auctionduration) {
      const startTime = new Date(auction.scheduledstart);
      const duration = auction.auctionduration;

      const endTime = new Date(startTime);
      if (duration.days) endTime.setDate(endTime.getDate() + duration.days);
      if (duration.hours) endTime.setHours(endTime.getHours() + duration.hours);
      if (duration.minutes) endTime.setMinutes(endTime.getMinutes() + duration.minutes);

      if (now > endTime) {
        await supabase
          .from("auctions")
          .update({ ended: true })
          .eq("id", auction.id);
      }
    }
  })
);
    // Step 3: Find latest bid by user per auction
    const latestBidsMap = new Map<string | number, { amount: number }>();
    userBids
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .forEach((bid) => {
        if (!latestBidsMap.has(bid.auction_id)) {
          latestBidsMap.set(bid.auction_id, { amount: bid.amount });
        }
      });

    // Step 4: For each auction, get all bids to calculate positions
    const rankings: Record<number, { userId: string; amount: number }[]> = {};
    await Promise.all(
  auctionIds.map(async (auctionId) => {
    const { data: allBids, error } = await supabase
      .from("bids")
      .select("user_id, amount")
      .eq("auction_id", auctionId);

    if (!error && allBids) {
      // 1. Map of user to highest bid
      const userMaxBids: Record<string, number> = {};

      for (const bid of allBids) {
        if (!userMaxBids[bid.user_id] || bid.amount > userMaxBids[bid.user_id]) {
          userMaxBids[bid.user_id] = bid.amount;
        }
      }

      // 2. Convert to array and sort descending
      const sorted = Object.entries(userMaxBids)
        .map(([userId, amount]) => ({ userId, amount }))
        .sort((a, b) => b.amount - a.amount);

      rankings[auctionId] = sorted;
    }
  })
);

    // Step 5: Build response
    const activeBids = auctions.map((auction) => {
      const userBid = latestBidsMap.get(auction.id);
      const bidList = rankings[auction.id] || [];
      const position = bidList.findIndex((b) => b.userId === userId);
      return {
        auctionId: auction.id,
        productName: auction.productname,
        sellerName: Array.isArray(auction.profiles)
          ? auction.profiles[0]?.fname ?? "Unknown"
          : auction.profiles?.fname ?? "Unknown",
        auctionType: auction.auctiontype || "standard",
        auctionSubtype: auction.auctionsubtype,
        scheduledstart: auction.scheduledstart ?? null,
        auctionduration: auction.auctionduration ?? null,
        bidAmount: userBid?.amount || 0,
        totalBids: bidList.length,
        isWinningBid: auction.currentbidder === userEmail,
        currentbid: auction.currentbid ?? 0,
        position: position !== -1 ? position + 1 : null,
      };
    });

    return NextResponse.json(activeBids);
  } catch (error) {
    console.error("Error fetching active bids:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
