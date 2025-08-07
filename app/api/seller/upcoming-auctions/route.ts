import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  // Fetch seller profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (profileError || !profileData) {
    return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
  }

  const now = new Date().toISOString();

  // Fetch upcoming auctions count
  const { count, error: countError } = await supabase
    .from("auctions")
    .select("*", { count: "exact", head: true })
    .eq("createdby", userEmail) // use seller ID
    .gt("scheduledstart", now)       // upcoming
    .eq("ended", false);             // not ended

  if (countError) {
    return NextResponse.json({ success: false, error: countError.message });
  }

  return NextResponse.json({ success: true, count });
}
