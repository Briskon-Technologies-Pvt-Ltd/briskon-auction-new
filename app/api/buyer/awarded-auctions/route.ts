import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email is required" },
      { status: 400 }
    );
  }

  // Fetch all auctions created by this seller that already have an awarded bid
  const { data: auctionsRaw, error: auctionsError } = await supabase
    .from("auctions")
    .select(`
      id,
      productname,
      categoryid,
      auctiontype,
      auctionsubtype,
      startprice,
      currentbid,
      targetprice,
      awarded_bid_id,
      productimages
    `)
    .eq("createdby", userEmail)
    .not("awarded_bid_id", "is", null);

  if (auctionsError) throw auctionsError;

  const awardedBidIds =
    auctionsRaw?.map((a) => a.awarded_bid_id).filter(Boolean) || [];

  if (awardedBidIds.length === 0) {
    return NextResponse.json([]); // nothing awarded yet
  }

  // Fetch awarded bids
  const { data: bidsRaw, error: bidsError } = await supabase
    .from("bids")
    .select("id, auction_id, user_id, amount, created_at")
    .in("id", awardedBidIds);

  if (bidsError) throw bidsError;

  const bidsArray = bidsRaw || [];

  // Fetch buyer profiles for these bids
  const userIds = [...new Set(bidsArray.map((b) => b.user_id))];
  const { data: profilesRaw, error: profilesError } = await supabase
    .from("profiles")
    .select("id, fname, lname")
    .in("id", userIds);

  if (profilesError) throw profilesError;

  const profiles = profilesRaw || [];

  // Build response
  const response = bidsArray.map((bid) => {
    const auction = auctionsRaw.find((a) => a.id === bid.auction_id);
     const profile = profiles.find(p => p.id === bid.user_id);

    return {
      auctionId: auction?.id || "",
      productName: auction?.productname || "",
      categoryid: auction?.categoryid || "",
      auctionType: auction?.auctiontype || "",
      auctionSubtype: auction?.auctionsubtype || "",
      startAmount: auction?.startprice || 0,
      targetPrice: auction?.targetprice || 0,
      currentbid: auction?.currentbid || 0,
      bidAmount: bid.amount, // awarded bid amount
      sellerName: profile ? `${profile.fname} ${profile.lname}` : "Unknown",
      productimage:
        Array.isArray(auction?.productimages) &&
        auction.productimages.length > 0
          ? auction.productimages[0]
          : "/placeholder.svg",
      awardedAt: bid.created_at,
    };
  });

  return NextResponse.json(response);
}


export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const auctionId = url.searchParams.get("auctionId");
    const bidId = url.searchParams.get("bidId");

    if (!auctionId || !bidId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if auction already has an awarded bid
    const { data: auction, error: auctionCheckError } = await supabase
      .from("auctions")
      .select("id, awarded_bid_id")
      .eq("id", auctionId)
      .single();

    if (auctionCheckError) throw auctionCheckError;

    if (auction.awarded_bid_id) {
      return NextResponse.json(
        { error: "This auction already has an awarded bid" },
        { status: 400 }
      );
    }

    // Update auction with awarded bid
    const { data: updatedAuction, error: updateError } = await supabase
      .from("auctions")
      .update({ awarded_bid_id: bidId })
      .eq("id", auctionId)
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, auction: updatedAuction });
  } catch (err: any) {
    console.error("Error accepting bid:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
