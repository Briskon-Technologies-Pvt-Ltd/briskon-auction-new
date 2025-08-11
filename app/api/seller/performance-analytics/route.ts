import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AnalyticsData {
  totalSales: number;
  averagePrice: number;
  salesByDate: { date: string; total: number }[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    console.log("Fetching performance analytics for email:", userEmail);
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
        createdby,
        ended
      `)
      .eq("createdby", userEmail)
      .eq("ended", true)
      .not("currentbid", "is", null);

    if (auctionError) {
      console.log("Auction error:", auctionError);
      return NextResponse.json({ error: "Failed to fetch auctions" }, { status: 500 });
    }

    // console.log("Auction data:", auctionData);
    if (!auctionData || auctionData.length === 0) {
      return NextResponse.json({ success: true, data: { totalSales: 0, averagePrice: 0, salesByDate: [] } });
    }

    // Aggregate metrics
    const totalSales = auctionData.reduce((sum, auction) => sum + (auction.currentbid || 0), 0);
    const averagePrice = auctionData.length > 0 ? totalSales / auctionData.length : 0;

    // Fetch bids to get sale dates
    const salesByDate = await Promise.all(
      auctionData.map(async (auction) => {
        const { data: bidData } = await supabase
          .from("bids")
          .select("created_at")
          .eq("auction_id", auction.id)
          .eq("amount", auction.currentbid)
          .order("created_at", { ascending: false })
          .limit(1);

        const saleDate = bidData?.[0]?.created_at
          ? DateTime.fromISO(bidData[0].created_at, { zone: "utc" })
              .setZone("Asia/Kolkata")
              .toISODate() // Group by date only (YYYY-MM-DD)
          : null;

        return { date: saleDate, total: auction.currentbid || 0 };
      })
    ).then((results) =>
      results
        .filter((item) => item.date !== null) // Filter out null dates
        .reduce((acc, { date, total }) => {
          if (date) {
            const existing = acc.find((item) => item.date === date);
            if (existing) existing.total += total;
            else acc.push({ date: date as string, total }); // Type assertion after filter
          }
          return acc;
        }, [] as { date: string; total: number }[])
    );

    const analyticsData: AnalyticsData = {
      totalSales,
      averagePrice: Number(averagePrice.toFixed(2)),
      salesByDate: salesByDate.sort((a, b) => a.date.localeCompare(b.date)),
    };

    return NextResponse.json({ success: true, data: analyticsData });
  } catch (error) {
    console.error("Error fetching performance analytics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
