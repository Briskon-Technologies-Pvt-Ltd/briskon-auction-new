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

  // Step 1: Get the seller ID from email
  const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

const now = new Date().toISOString();

const { data ,count, error: countError } = await supabase
  .from("auctions")
  .select("*", { count: "exact" })
  .eq("createdby", userEmail) // use seller ID
  .lte("scheduledstart", now)  // has started
  .eq("ended", false);         // not yet ended

if (countError) {
  return NextResponse.json({ success: false, error: countError.message });
}

return NextResponse.json({ success: true, count });

}
