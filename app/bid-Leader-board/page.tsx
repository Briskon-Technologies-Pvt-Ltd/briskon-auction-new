"use client";
import { useEffect, useState } from "react";
import { User, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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

export default function BidLeadersBoard({
  auctionId,
  loggedInUserId,
}: {
  auctionId: string;
  loggedInUserId: string;
}) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [showAllBids, setShowAllBids] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    async function fetchBids() {
      const res = await fetch(`/api/bids/${auctionId}`);
      const json = await res.json();
      if (json.success) {
        setBids(json.data);
      }
    }
  fetchBids(); // fetch immediately on mount

  intervalId = setInterval(fetchBids, 3000); // fetch every 5 seconds

  return () => clearInterval(intervalId); // clean up on unmount
}, [auctionId]);

  const topBids = bids.slice(0, 3);
  const otherBids = bids.slice(3);
  const userBids = bids.filter((b) => b.user_id === loggedInUserId);

  // Calculate highest bid amount of the logged-in user here (close to usage)
  const highestUserBidAmount =
    userBids.length > 0 ? Math.max(...userBids.map((b) => b.amount)) : 0;
  const [visibleOtherBidsCount, setVisibleOtherBidsCount] = useState(0);

  const loadMoreCount = 10; // bids per chunk
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500 animate-bounce" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Bid Leaders Board
            </h3>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-blue-100 text-blue-800 text-left text-xs font-medium tracking-wide border-b border-blue-300">
              <tr>
                <th className="py-2 px-3 border-r border-blue-300">
                  Buyer Name
                </th>
                <th className="py-2 px-3">Bid Price</th>
              </tr>
            </thead>

            <tbody>
              {topBids.map((bid) => {
                // Only the logged-in user's highest bid is green and clickable
                const isHighestUserBid =
                  bid.user_id === loggedInUserId &&
                  bid.amount === highestUserBidAmount;

                return (
                  <tr
                    key={bid.id}
                    className={`border-t border-gray-300 ${
                      isHighestUserBid
                        ? "bg-green-300 font-semibold cursor-pointer hover:bg-green-400 transition"
                        : "bg-white"
                    }`}
                    onClick={() => isHighestUserBid && setShowModal(true)}
                  >
                    <td className="py-2 px-3 border-r border-gray-300 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      {bid.user_id === loggedInUserId && (
                        <User className="w-4 h-4" />
                      )}
                      {bid.profile?.fname || "Unknown"}
                    </td>
                    <td className="py-2 px-3 text-xs text-gray-600 dark:text-gray-300">
                      {bid.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}

              {otherBids.slice(0, visibleOtherBidsCount).map((bid) => (
                <tr key={bid.id} className="bg-white border-t border-gray-300">
                  <td className="py-2 px-3 border-r border-gray-300 text-xs text-gray-600 dark:text-gray-300">
                    {bid.profile?.fname || "Unknown"}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-600 dark:text-gray-300">
                    {bid.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {otherBids.length > 0 && (
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  if (visibleOtherBidsCount >= otherBids.length) {
                    setVisibleOtherBidsCount(0); // Hide all bids
                  } else {
                    setVisibleOtherBidsCount((count) =>
                      Math.min(count + loadMoreCount, otherBids.length)
                    );
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                {visibleOtherBidsCount >= otherBids.length
                  ? "Hide Bids"
                  : "View More Bids"}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Bid History - You</DialogTitle>
    </DialogHeader>

    {userBids.length > 0 ? (
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200 border border-gray-300 rounded-md">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-2 px-3 border-b border-gray-300">Bid Amount</th>
              <th className="py-2 px-3 border-b border-gray-300">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {userBids.map((bid) => (
              <tr key={bid.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800">
                <td className="py-2 px-3 border-b border-gray-300 font-semibold">${bid.amount.toLocaleString()}</td>
                <td className="py-2 px-3 border-b border-gray-300">
                  {new Date(bid.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">No bid history found.</p>
    )}
  </DialogContent>
</Dialog>

    </>
  );
}
