// app/api/auctions/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
        // 🔑 Get access token from header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    // 🔁 Recreate Supabase client with access token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized: No user found" }, { status: 401 });
    }
    const body = await request.json();
    const {
      auctiontype,
      auctionsubtype,
      ismultilot,
      productname,
      bidder_count,
      productdescription,
      productimages,
      productdocuments,
      lots,
      attributes,
      sku,
      brand,
      model,
      startprice,
      minimumincrement,
      auctionduration,
      currency,
      launchtype,
      scheduledstart,
      bidextension,
      bidextensiontime,
      allowautobidding,
      bidincrementtype,
      bidincrementrules,
      issilentauction,
      participationtype,
      participantemails,
      qualificationcriteria,
      termsandconditions,
      enabledispute,
      currentbid,
      language,
      enablenotifications,
      notificationtypes,
      enableanalytics,
      seller,
      reserveprice,
      createdby,
      status,
    } = body;

    // Basic validation for required fields
    if (!productname || !productdescription || !startprice || !auctionduration) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (isNaN(parseFloat(startprice)) || parseFloat(startprice) < 0) {
      return NextResponse.json(
        { success: false, error: "Starting price must be a non-negative number" },
        { status: 400 }
      );
    }
    if (minimumincrement && (isNaN(parseFloat(minimumincrement)) || parseFloat(minimumincrement) < 0)) {
      return NextResponse.json(
        { success: false, error: "Minimum increment must be a non-negative number" },
        { status: 400 }
      );
    }
    if (reserveprice && (isNaN(parseFloat(reserveprice)) || parseFloat(reserveprice) < 0)) {
      return NextResponse.json(
        { success: false, error: "Reserve price must be a non-negative number" },
        { status: 400 }
      );
    }
    if (bidextensiontime && (isNaN(parseInt(bidextensiontime)) || parseInt(bidextensiontime) < 0)) {
      return NextResponse.json(
        { success: false, error: "Bid extension time must be a non-negative integer" },
        { status: 400 }
      );
    }

    // Parse text inputs to JSON where needed (unchanged)
    const parseJson = (text: string) => {
      try {
        return text ? JSON.parse(text) : {};
      } catch {
        return {};
      }
    };

    // Prepare payload with system-managed fields
    const payload = {
      ...body,
      auctiontype,
      auctionsubtype,
      ismultilot: ismultilot || false,
      productname,
      productdescription,
      bidder_count,
      productimages: productimages || [], // Array of URLs
      productdocuments: productdocuments || [], // Array of URLs
      lots: parseJson(JSON.stringify(lots)),
      attributes: parseJson(JSON.stringify(attributes)),
      sku: sku || null,
      brand: brand || null,
      model: model || null,
      startprice: parseFloat(startprice),
      minimumincrement: minimumincrement ? parseFloat(minimumincrement) : null,
      auctionduration: parseJson(JSON.stringify(auctionduration)),
      currency: currency || "",
      launchtype: launchtype || "immediate",
      scheduledstart: scheduledstart ? new Date(scheduledstart).toISOString() : null,
      bidextension: bidextension || false,
      bidextensiontime: bidextensiontime ? parseInt(bidextensiontime) : null,
      allowautobidding: allowautobidding || false,
      bidincrementtype: bidincrementtype || null,
      bidincrementrules: parseJson(JSON.stringify(bidincrementrules)),
      issilentauction: issilentauction || false,
      participationtype: participationtype || "public",
      participantemails: participantemails || [],
      qualificationcriteria: parseJson(JSON.stringify(qualificationcriteria)),
      termsandconditions: parseJson(JSON.stringify(termsandconditions)),
      enabledispute: enabledispute || false,
      language: language || "en",
      enablenotifications: enablenotifications || false,
      notificationtypes: notificationtypes || [],
      enableanalytics: enableanalytics || false,
      percent: body.percent ? parseFloat(body.percent) : null,
      reserveprice: reserveprice ? parseFloat(reserveprice) : null,
      createdby: createdby || "unknown",
      status: status || "pending",
      createdat: new Date().toISOString(),
      currentBid: 0,
      bidcount: 0,
      participants: {},
      templateid: null,
      categoryid: null,
      subcategoryid: null,
      // seller: createdby,
      seller: user.id,
      //  seller: seller || createdby,
    };

    // Insert into Supabase
    const { data, error } = await supabase.from("auctions").insert(payload).select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("auctions")
      .select(`
        *,
        profiles:seller (fname, lname, location)
      `)
      .eq(  "approved", true)
      .order("createdat", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

