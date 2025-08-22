import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface approvalRejected {
  id: string;
  productname: string;
  productimages: string;
  category: string;
  type: string;
  format: string;
  starting_bid: number;
  current_bid: number | null;
  created_at:string;
    scheduledstart:string;
  auctionduration:{ days?: number; hours?: number; minutes?: number };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json(
      { success: false, error: "User email is required" },
      { status: 400 }
    );
  }

  try {
    const { data: auctionsData, count: auctionsCount, error: auctionsError } =
      await supabase
        .from("auctions")
        .select(
          `
          id,
          productname,
          productimages,
          categoryid,
          auctiontype,
          auctionsubtype,
          startprice,
          createdat,
          currentbid,
          approved,
          scheduledstart,
          auctionduration,
          approval_status
          `,
          { count: "exact" }
        )
        .eq("createdby", userEmail)
        .eq("approval_status", "rejected");

    if (auctionsError) {
      return NextResponse.json(
        { success: false, error: auctionsError.message },
        { status: 500 }
      );
    }

    const formattedAuctions: approvalRejected[] = (auctionsData || []).map(
      (auction: any): approvalRejected => ({
        id: auction.id,
        productname: auction.productname || "Untitled",
        productimages:
          Array.isArray(auction.productimages) && auction.productimages.length > 0
            ? auction.productimages[0]
            : "/placeholder.svg",
        current_bid: auction.currentbid || 0,
        starting_bid: auction.startprice || 0,
        category: auction.categoryid || 0,
        type: auction.auctiontype || "",
        format: auction.auctionsubtype || "",
        created_at: auction.createdat || "",
        auctionduration:auction.auctionduration,
        scheduledstart:auction.scheduledstart
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedAuctions,
      count: auctionsCount,
    });
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
