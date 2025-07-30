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
  productname: string;
  auctiontype: string | null;
  auctionsubtype: string | null;
  startprice: number | null;
  currentbid: number | null;
  productquantity: number;
  participants: string[] | { id: string }[];
  currentbidder: string;
  ended: boolean;
  targetprice?: number; // Optional field for reverse auctions
  profiles: { fname: string; lname: string }[];
}

interface WonAuction {
  auctionId: string;
  productName: string;
  auctionType: string;
  startAmount: number;
  winningBidAmount: number;
  targetprice?: number; // Optional field for target price
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");
  const userId = url.searchParams.get("id");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch auctions where the user is the current bidder and ended is true
    const { data: wonAuctions, error: auctionsError } = await supabase
      .from("auctions")
      .select("id, productname, auctiontype, auctionsubtype, startprice, currentbid, productquantity, participants, ended,targetprice, profiles:seller (fname, lname)")
      .eq("currentbidder", userEmail)
      .eq("ended", true);

    if (auctionsError) throw new Error(`Failed to fetch auctions: ${auctionsError.message}`);

    const wonAuctionsData: WonAuction[] = [];

    if (wonAuctions?.length) {
      const { data: allBids, error: bidsError } = await supabase
        .from("bids")
        .select("auction_id, user_id, amount");

      if (bidsError) throw new Error(`Failed to fetch bids: ${bidsError.message}`);

      for (const auction of wonAuctions) {
        if (auction.auctiontype === "yankee" || auction.auctionsubtype === "yankee") {
          // Handle Yankee auction
          const bidsForAuction = allBids.filter((bid) => bid.auction_id === auction.id);
          if (bidsForAuction.length > 0) {
            const sortedBids = bidsForAuction.sort((a, b) => b.amount - a.amount); // Descending order
            const topNBids = sortedBids.slice(0, Math.min(auction.productquantity, bidsForAuction.length));
            if (topNBids.some((bid) => bid.user_id === userId) || (bidsForAuction.length === 1 && bidsForAuction[0].user_id === userId)) {
              wonAuctionsData.push({
                auctionId: auction.id,
                productName: auction.productname,
                auctionType: auction.auctiontype || auction.auctionsubtype || "yankee",
                startAmount: auction.startprice || 0,
                winningBidAmount: auction.currentbid || 0,
                 sellerName: Array.isArray(auction.profiles)
          ? auction.profiles[0]?.fname ?? "Unknown"
          : auction.profiles?.fname ?? "Unknown",
              });
            }
          }
        } else {
          // Handle non-Yankee auction
          wonAuctionsData.push({
            auctionId: auction.id,
            productName: auction.productname,
            auctionType: auction.auctiontype || "standard",
            startAmount: auction.startprice || 0,
            winningBidAmount: auction.currentbid || 0,
            targetprice: auction.targetprice, // Include target price if available
            sellerName: Array.isArray(auction.profiles)
          ? auction.profiles[0]?.fname ?? "Unknown"
          : auction.profiles?.fname ?? "Unknown",
          });
        }
      }
    }

    return NextResponse.json(wonAuctionsData || []);
  } catch (error) {
    console.error("Error fetching won auctions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
