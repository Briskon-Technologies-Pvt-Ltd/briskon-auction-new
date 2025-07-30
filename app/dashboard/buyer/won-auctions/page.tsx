// "use client";

// import { useAuth } from "@/hooks/use-auth"; // Adjust path based on your project structure
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Import Button component
// import { Trophy } from "lucide-react"; // Using Trophy icon for won auctions
// import { useEffect, useState } from "react";
// import Link from "next/link";

// // Define the shape of a won auction entry
// interface WonAuctionEntry {
//   auctionId: string;
//   productName: string;
//   auctionType: string | null;
//   startAmount: number;
//   winningBidAmount: number;
//   targetprice?: number; // Optional field for target price
// }

// export default function WonAuctions() {
//   const { user, isLoading } = useAuth();
//   const [wonAuctions, setWonAuctions] = useState<WonAuctionEntry[]>([]);
//   const [isLoadingAuctions, setIsLoadingAuctions] = useState(true);

//   useEffect(() => {
//     const fetchWonAuctions = async () => {
//       setIsLoadingAuctions(true);
//       try {
//         const response = await fetch(
//           `/api/buyer/won-auctions?email=${encodeURIComponent(
//             user?.email || ""
//           )}&id=${encodeURIComponent(user?.id || "")}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch won auctions");
//         const data = await response.json();
//         setWonAuctions(data);
//       } catch (error) {
//         console.error("Error fetching won auctions:", error);
//         setWonAuctions([]);
//       } finally {
//         setIsLoadingAuctions(false);
//       }
//     };

//     if (user) {
//       fetchWonAuctions();
//     }
//   }, [user]);

//   if (isLoading || isLoadingAuctions) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading won auctions...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Not logged in. Please log in to view your won auctions.</p>
//       </div>
//     );
//   }

//   if (user.role !== "buyer" && user.role !== "both") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Access Denied. This page is for buyers.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 md:py-20 bg-gray-100 dark:bg-gray-950">
//       <div className="container mx-auto px-4">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Trophy className="h-6 w-6 mr-2 text-yellow-500" /> My Won
//               Auctions
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {wonAuctions.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <thead>
//                     <tr className="border-b dark:border-gray-700">
//                       <th className="text-left p-2">Product Name</th>
//                       <th className="text-left p-2">Auction Type</th>
//                       <th className="text-left p-2">Start Amount</th>
//                       <th className="text-left p-2">Winning Bid Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {wonAuctions.map((auction) => {
//                       // Determine auction path based on auctiontype
//                       let auctionPath = `/dashboard/buyer/won-auctions/${auction.auctionId}`; // Redirect to dynamic route
//                       return (
//                         <tr
//                           key={auction.auctionId}
//                           className="border-b dark:border-gray-700"
//                         >
//                           <td className="p-2">
//                             <Link
//                               href={auctionPath}
//                               className="text-blue-500 hover:underline"
//                             >
//                               {auction.productName}
//                             </Link>
//                           </td>
//                           <td className="p-2">
//                             {auction.auctionType || "standard"}
//                           </td>
//                           <td className="p-2">
//                             {(auction.auctionType === "reverse"
//                               ? auction.targetprice
//                               : auction.startAmount
//                             )?.toFixed(2)}
//                           </td>
//                           <td className="p-2">
//                             {auction.winningBidAmount.toFixed(2)}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No won auctions found.</p>
//             )}
//             <div className="mt-4">
//               <Button variant="outline" asChild>
//                 <Link href="/dashboard/buyer">Back to Dashboard</Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
