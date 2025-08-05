import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Sale {
  id: string;
  productname: string;
  salePrice: number;
  buyer: string;
  saleDate: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    console.log("Fetching sales for email:", userEmail);
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      console.log("Profile error or not found:", profileError);
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = profileData.id;

    const { data: auctionData, error: auctionError } = await supabase
      .from("auctions")
      .select(`
        id,
        productname,
        currentbid,
        createdby
      `)
      .eq("createdby", userEmail)
      .eq("ended", true)
      .not("currentbid", "is", null);

    if (auctionError) {
      console.log("Auction error:", auctionError);
      return NextResponse.json({ error: "Failed to fetch auctions" }, { status: 500 });
    }

    console.log("Auction data:", auctionData);
    if (!auctionData || auctionData.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    const sales: Sale[] = await Promise.all(
      auctionData.map(async (auction) => {
        console.log("Processing auction:", auction.id, "with currentbid:", auction.currentbid);
        const { data: bidData, error: bidError } = await supabase
          .from("bids")
          .select("created_at, user_id, amount")
          .eq("auction_id", auction.id)
          .eq("amount", auction.currentbid)
          .order("created_at", { ascending: false })
          .limit(1);

        if (bidError) {
          console.log("Bid error for auction", auction.id, ":", bidError);
        }

        console.log("Bid data for auction", auction.id, ":", bidData);
        const lastBid = bidData?.[0];
        const saleDate = lastBid?.created_at
          ? DateTime.fromISO(lastBid.created_at, { zone: "utc" })
            .setZone("Asia/Kolkata")
            .toISO()
          : null;

        let buyer = " ";
        if (lastBid?.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("fname, lname")
            .eq("id", lastBid.user_id)
            .single();
          if (profileError) {
            console.log("Profile error for user", lastBid.user_id, ":", profileError);
          }
          buyer = profileData
            ? `${profileData.fname || ""} ${profileData.lname || ""}`.trim() || lastBid.user_id
            : lastBid.user_id;
        }

        const sale = {
          id: auction.id,
          productname: auction.productname || "Untitled",
          salePrice: auction.currentbid || 0,
          buyer,
          saleDate,
        };
        console.log("Sale object for auction", auction.id, ":", sale);
        return sale;
      })
    );

    console.log("Final sales:", sales);
    return NextResponse.json({ success: true, data: sales });
  } catch (error) {
    console.error("Error fetching sales history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
