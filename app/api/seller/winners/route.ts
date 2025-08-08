import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
interface Winner {
  id: string;
  productname: string;
  productimages: string;
  soldprice: number;
  buyername: string;
  buyeremail: string;
  closedat: string;
}


export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ success: false, error: "Missing email" });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (!profile) {
    return NextResponse.json({ success: false, error: "Seller not found" });
  }

  const { data, error } = await supabase
    .from("auction")
    .select(`
      id,
      productname,
      productimages,
      currentbid,
      scheduledstart,
      ended,
      currentbidder,
      profiles!auction_currentbidder_fkey (
        fname,
        email
      )
    `)
    .eq("createdby", email)
    .is("ended", true)
    .gt("current_bid", 0);

  if (error) {
    return NextResponse.json({ success: false, error: error.message });
  }

  // Transform data
  const winners: Winner[] = data.map((auction: any): Winner => ({
    id: auction.id,
    productname: auction.productname,
    productimages: auction.productimages,
    soldprice: auction.current_bid,
    buyername: auction.profiles?.fname ?? "Unknown",
    buyeremail: auction.profiles?.email ?? "N/A",
    closedat: auction.scheduledstart,
  }));


  return NextResponse.json({ success: true, data: winners });

}
