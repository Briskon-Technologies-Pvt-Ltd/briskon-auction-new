import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { email, password, fname, lname, location, role, type, phone,city, state, country,addressline1, addressline2  } = await request.json();
    const formattedLocation = city && country ? `${city}, ${country}, ${state}` : "";
    console.log("Received:", { email, password, fname, lname, location: formattedLocation, role, type, addressline1, addressline2, phone,city, state, country });
//     const addressinfo = {
//   city,
//   state,
//   country,
// };
    // Validate required fields
    if (!email || !password || !fname || !lname || !role) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json({ success: false, error: "All required fields (email, password, fname, lname, role) are required" }, { status: 400 });
    }

    // Validate role
    if (!["buyer", "seller", "both"].includes(role)) {
      console.log("Validation failed: Invalid account type");
      return NextResponse.json({ success: false, error: "Invalid account type. Must be 'buyer', 'seller', or 'both'" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: Invalid email");
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    // Check for existing user
    const { data: existingUser, error: existingError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();
    if (existingError && existingError.code !== "PGRST116") throw existingError;
    if (existingUser) {
      console.log("Validation failed: Email already registered");
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
    }

    // Sign up user with email verification
    console.log("Signing up user with email:", email);
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fname,
          lname,
          location: formattedLocation,
          role,
          type,
          addressline1, 
          addressline2,
          phone,
          verified: false,
        },
      },
    });
    if (authError) {
      console.log("Auth error:", authError.message);
      throw authError;
    }

    if (data?.user) {
      console.log("Creating profile for user:", data.user.id);
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        fname,
        lname,
        role,
        location: formattedLocation,
        type,
        addressline1, 
        addressline2,
        phone,
        created_at: new Date().toISOString(),
        verified: false,
      });
      if (profileError) {
        console.log("Profile error:", profileError.message);
        throw profileError;
      }
    }

    return NextResponse.json({ success: true, message: "Registration successful. Check your email for verification." }, { status: 201 });
  } catch (error) {
    console.error("Catch error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create profile",
    }, { status: 400 });
  }
}
