import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Define types
interface Bid {
  auction_id: string;
  amount: number;
  user_id: string;
}

interface Auction {
  id: string;
  ended: boolean;
  productname: string;
  currentbidder: string;
  auctiontype: string | null;
  auctionsubtype: string | null;
  productquantity: number;
  participants: string[] | { id: string }[];
}

interface StatsResponse {
  activeBids: number;
  wonAuctions: number;
  recentActivities: string[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");
  const userId = url.searchParams.get("id");

  if (!userId && !userEmail) {
    return NextResponse.json({ error: "User ID or email is required" }, { status: 400 });
  }

  try {
    // Fetch active bids (count of auctions where ended is false and user has a bid)
    const { data: bids, error: bidsError } = await supabase
      .from("bids")
      .select("auction_id")
      .eq("user_id", userId || userEmail!);

    if (bidsError) throw new Error(`Failed to fetch bids: ${bidsError.message}`);

    const auctionIds = bids?.map((bid) => bid.auction_id) || [];
    const { data: auctions, error: auctionsError } = await supabase
      .from("auctions")
      .select("id, ended, productname")
      .in("id", auctionIds);

    if (auctionsError) throw new Error(`Failed to fetch auctions: ${auctionsError.message}`);

    const activeBidsCount = auctions?.filter((auction) => !auction.ended).length || 0;

    // Fetch won auctions
    let wonAuctionsCount = 0;

    // Fetch all ended auctions where user is current bidder
    const { data: allWonAuctions, error: wonError } = await supabase
      .from("auctions")
      .select("id, currentbidder, ended, auctiontype, auctionsubtype, productquantity, participants")
      .eq("currentbidder", userEmail!)
      .eq("ended", true);

    if (wonError) throw new Error(`Failed to fetch won auctions: ${wonError.message}`);

    if (allWonAuctions?.length) {
      const { data: allBids, error: bidsError } = await supabase
        .from("bids")
        .select("auction_id, user_id, amount");

      if (bidsError) throw new Error(`Failed to fetch bids: ${bidsError.message}`);

      for (const auction of allWonAuctions) {
        if (auction.auctiontype === "yankee" || auction.auctionsubtype === "yankee") {
          // Handle Yankee auction
          const bidsForAuction = allBids.filter((bid) => bid.auction_id === auction.id);
          if (bidsForAuction.length > 0) {
            const sortedBids = bidsForAuction.sort((a, b) => b.amount - a.amount); // Descending order
            const topNBids = sortedBids.slice(0, Math.min(auction.productquantity, bidsForAuction.length));
            if (topNBids.some((bid) => bid.user_id === userId) || (bidsForAuction.length === 1 && bidsForAuction[0].user_id === userId)) {
              wonAuctionsCount++;
            }
          }
        } else {
          // Handle non-Yankee auction
          wonAuctionsCount++;
        }
      }
    }

    // Fetch recent activity
    const recentActivities: string[] = [];

    // Recent bids
    const { data: recentBids, error: recentBidsError } = await supabase
      .from("bids")
      .select("auction_id")
      .eq("user_id", userId || userEmail!)
      .limit(1);

    if (recentBidsError) throw new Error(`Failed to fetch recent bids: ${recentBidsError.message}`);

    if (recentBids?.length) {
      const { data: bidAuction, error: bidAuctionError } = await supabase
        .from("auctions")
        .select("productname")
        .eq("id", recentBids[0].auction_id)
        .single();

      if (bidAuctionError) throw new Error(`Failed to fetch bid auction: ${bidAuctionError.message}`);
      if (bidAuction) {
        recentActivities.push(`You placed a bid on "${bidAuction.productname}".`);
      }
    }

    // Recent won auctions
    const { data: recentWon, error: recentWonError } = await supabase
      .from("auctions")
      .select("productname")
      .eq("currentbidder", userEmail!)
      .eq("ended", true)
      .limit(1);

    if (recentWonError) throw new Error(`Failed to fetch recent wins: ${recentWonError.message}`);

    if (recentWon?.length) {
      recentActivities.push(`Auction "${recentWon[0].productname}" ended, you won!`);
    }

    return NextResponse.json<StatsResponse>(
      {
        activeBids: activeBidsCount,
        wonAuctions: wonAuctionsCount,
        recentActivities: recentActivities.slice(0, 2),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching buyer stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
