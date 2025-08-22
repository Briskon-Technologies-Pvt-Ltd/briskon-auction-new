import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    // Step 1: Fetch auctions created by the user
    const { data: auctionsRaw, error: auctionsError } = await supabase
      .from("auctions")
      .select(`
        id,
        productname,
        categoryid,
        auctiontype,
        auctionsubtype,
        startprice,
        targetprice,
        productimages
      `)
      .eq("createdby", userEmail)
      .eq("approved", true)
      .gt("bidder_count", 0)
      .order("createdat", { ascending: false });

    if (auctionsError) throw auctionsError;

    const auctionIds = auctionsRaw?.map(a => a.id) || [];
    if (auctionIds.length === 0) return NextResponse.json([]);

    // Step 2: Fetch bids for these auctions
    const { data: bidsRaw, error: bidsError } = await supabase
      .from("bids")
      .select("id,auction_id, amount, user_id")
      .in("auction_id", auctionIds);

    if (bidsError) throw bidsError;

    // Step 3: Fetch profiles for all bidders
    const userIds = [...new Set(bidsRaw.map(b => b.user_id))];
    const { data: profilesRaw } = await supabase
      .from("profiles")
      .select("id, fname, lname")
      .in("id", userIds);
       const profiles = profilesRaw || []; 
    // Step 4: Map bids to auctions and include seller names
    const response = bidsRaw.map(bid => {
      const auction = auctionsRaw.find(a => a.id === bid.auction_id);
      const profile = profiles.find(p => p.id === bid.user_id);


      return {
        auctionId: auction?.id,
        bidId: bid.id,  
        productName: auction?.productname,
        categoryid: auction?.categoryid,
        auctionType: auction?.auctiontype,
        auctionSubtype: auction?.auctionsubtype,
        startAmount: auction?.startprice,
        targetPrice: auction?.targetprice,
        productImage:
          Array.isArray(auction?.productimages) && auction.productimages.length > 0
            ? auction.productimages[0]
            : "/placeholder.svg",
        bidAmount: bid.amount,
        sellerName: profile ? `${profile.fname} ${profile.lname}` : "Unknown",
      };
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching bids received:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
