import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { title, description, sellerId } = req.body;

  if (!title || !sellerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("auctions")
      .insert([
        {
          title,
          description,
          seller: sellerId,
          status: "draft",
        },
      ])
      .select();

    if (error) throw error;

    res.status(200).json({ message: "Draft saved successfully", auction: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save draft" });
  }
}
