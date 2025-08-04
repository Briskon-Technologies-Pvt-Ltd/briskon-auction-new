import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Profile {
  id: string;
  fname?: string;
  lname?: string;
  email?: string;
  role?: string;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log("Current user ID:", user?.id);
    const params = await context.params;
    const { userId } = params;

    // console.log("Fetching profile for userId:", userId); 

    const { data, error } = await supabase
      .from("profiles")
      .select("id, fname, lname, email, role, location, type, avatar_url, phone, addressline1, addressline2")
      .eq("id", userId) // Adjust column name if different (e.g., user_id)
      .single();

    if (error) {
      console.error("Supabase Error for userId", userId, ":", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }
    

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" }, // Ensure JSON object
      { status: 500 }
    );
  }
}
