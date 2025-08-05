import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ListingEntry {
  id: string;
  productname: string;
  auctiontype: string | null;
  startamount: number;
  currentbid: number;
  ended: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email");
  const userId = searchParams.get("id");

  if (!userEmail || !userId) {
    return NextResponse.json({ error: "User email and ID are required" }, { status: 400 });
  }

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .eq("id", userId)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = profileData.id;

    const { data, error } = await supabase
      .from("auctions")
      .select("id, productname, auctiontype, startprice, currentbid, ended")
      .eq("createdby", userEmail)
      .order("createdat", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
