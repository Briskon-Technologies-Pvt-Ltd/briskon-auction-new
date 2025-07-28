// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// interface Bid {
//   id: string;
//   auction_id: string;
//   user_id: string;
//   amount: number;
//   created_at: string;
// }

// export async function GET(
//   request: Request,
//   context: { params: Promise<{ auctionId: string }> }
// ) {
//   try {
//     const params = await context.params;
//     const { auctionId } = params;

//     console.log("Fetching bids for auctionId:", auctionId); // Debug log

//     const { data, error } = await supabase
//   .from("bids")
//   .select("*, profiles(fname, location)")
//   .eq("auction_id", auctionId)
//   .order("amount", { ascending: false });

//     if (error) {
//       console.error(
//         "Supabase Error for auctionId",
//         auctionId,
//         ":",
//         error.message
//       );
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     console.error("Route Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" }, // Ensure JSON object
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(
  request: Request,
  context: { params: Promise<{ auctionId: string }> }
) {
  try {
    const params = await context.params;
    const { auctionId } = params;

    // console.log("Fetching bids for auctionId:", auctionId);

    // Step 1: Get bids
    const { data: bids, error: bidsError } = await supabase
      .from("bids")
      .select("*")
      .eq("auction_id", auctionId)
      .order("amount", { ascending: false });

    if (bidsError) {
      console.error("Supabase Error fetching bids:", bidsError.message);
      return NextResponse.json(
        { success: false, error: bidsError.message },
        { status: 500 }
      );
    }

    // Step 2: Get all user IDs from bids
const userIds = [...new Set(bids.map((b) => b.user_id))];

const { data: profiles, error: profileError } = await supabase
  .from("profiles")
  .select("id, fname")
  .in("id", userIds);

    if (profileError) {
  console.error("Supabase Error fetching profiles:", profileError.message);
  return NextResponse.json(
    { success: false, error: profileError.message },
    { status: 500 }
  );
}

    // Step 3: Map profiles to bids
const profileMap = Object.fromEntries(
  profiles.map((p) => [p.id, { fname: p.fname }])
);

const enrichedBids = bids.map((bid) => ({
  ...bid,
  profile: profileMap[bid.user_id] || { fname: "Unknown" }
}));

    return NextResponse.json({ success: true, data: enrichedBids }, { status: 200 });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
