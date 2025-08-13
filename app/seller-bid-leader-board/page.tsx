"use client";

import { Award } from "lucide-react";
import { useEffect, useState } from "react";

interface Bid {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
  profile: {
    fname: string;
    location: string;
  };
}

export default function SellerBidLeaderboard({
  auctionId,
}: {
  auctionId: string;
}) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBids() {
      setLoading(true);
      try {
        const res = await fetch(`/api/bids/${auctionId}`);
        const json = await res.json();
        if (json.success) {
          setBids(json.data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBids();
  }, [auctionId]);

  // Keep only the highest bid per user
  const highestBidsMap = bids.reduce((map, bid) => {
    const existing = map.get(bid.user_id);
    if (!existing || bid.amount > existing.amount) {
      map.set(bid.user_id, bid);
    }
    return map;
  }, new Map<string, Bid>());

  const uniqueBids = Array.from(highestBidsMap.values()).sort(
    (a, b) => b.amount - a.amount
  );

  return (
    <div className="p-4 max-w-md bg-white rounded shadow">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-yellow-500 animate-bounce" />
        <h2 className="text-lg font-semibold">Bid Leaderboard</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm text-center py-4 animate-pulse">
          Loading bids...
        </p>
      ) : uniqueBids.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No bidders yet for this auction.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left border-b pb-1">Buyer</th>
              <th className="text-right border-b pb-1">Bid Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {uniqueBids.map((bid) => (
              <tr key={bid.user_id} className="border-b last:border-0">
                <td className="py-1">{bid.profile?.fname || "Unknown"}</td>
                <td className="py-1 text-right font-semibold text-green-700">
                  {bid.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

