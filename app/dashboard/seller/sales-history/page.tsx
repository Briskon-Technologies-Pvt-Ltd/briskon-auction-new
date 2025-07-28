"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon";

interface Sale {
  id: string;
  productname: string;
  salePrice: number;
  buyer: string;
  saleDate: string | null;
}

export default function SalesHistory() {
  const { user, isLoading } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoadingSales, setIsLoadingSales] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoadingSales(true);
      try {
        console.log("User object:", user); // Debug user object
        if (!user?.email) throw new Error("User email is missing");
        const response = await fetch(`/api/seller/sales-history?email=${encodeURIComponent(user.email)}`);
        console.log("Fetch response status:", response.status); // Debug status
        if (!response.ok) throw new Error(`Failed to fetch sales history: ${response.statusText}`);
        const data = await response.json();
        console.log("Fetch response data:", data); // Debug full response
        if (!data.success) throw new Error(data.error || "Failed to load sales history");
        setSales(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Fetch error:", err); // Debug error
      } finally {
        setIsLoadingSales(false);
      }
    };

    if (user) fetchSales();
  }, [user]);

  if (isLoading || isLoadingSales) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Not logged in.</div>;
  }

  if (user.role !== "seller" && user.role !== "both") {
    return <div className="min-h-screen flex items-center justify-center">Access Denied. This page is for sellers.</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            {sales.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2 text-left">Auction ID</th>
                      <th className="p-2 text-left">Product Name</th>
                      <th className="p-2 text-right">Sale Price</th>
                      <th className="p-2 text-left">Buyer</th>
                      <th className="p-2 text-left">Sale Date</th>
                      <th className="p-2 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="border-t">
                        <td className="p-2">{sale.id}</td>
                        <td className="p-2">{sale.productname}</td>
                        <td className="p-2 text-right">${sale.salePrice.toLocaleString()}</td>
                        <td className="p-2">{sale.buyer}</td>
                        <td className="p-2">
                          {sale.saleDate ? DateTime.fromISO(sale.saleDate).toLocaleString(DateTime.DATETIME_MED) : "N/A"}
                        </td>
                        <td className="p-2 text-right">
                          <Button asChild size="sm">
                            <Link href={`/dashboard/seller/my-listings/${sale.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No sales history available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
