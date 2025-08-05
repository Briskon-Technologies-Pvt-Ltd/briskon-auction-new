  import { NextResponse } from "next/server";
  import { createClient } from "@supabase/supabase-js";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  interface RecentAuction {
    id: string;
    productname: string;
    currentbid: number;
    createdat: string; // Assuming createdat is a string in ISO format

  }

  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (profileError || !profileData) {
        return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
      }

      const sellerId = profileData.id;

      const { data, error } = await supabase
        .from("auctions")
        .select("id, productname, currentbid")
        .eq("createdby", userEmail)
        .eq("ended", true)
        .not("currentbidder", "is", null)
        .order("createdat", { ascending: false }) // Assuming ended_at exists
        .limit(5);

      if (error) {
        return NextResponse.json({ error: "Failed to fetch recent auctions" }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching recent auctions:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
