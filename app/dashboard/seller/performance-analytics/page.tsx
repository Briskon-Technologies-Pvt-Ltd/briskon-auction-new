"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { DateTime } from "luxon";

// Import Chart.js directly
import Chart from "chart.js/auto";

interface AnalyticsData {
  totalSales: number;
  averagePrice: number;
  salesByDate: { date: string; total: number }[];
}

export default function PerformanceAnalytics() {
  const { user, isLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<InstanceType<typeof Chart> | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoadingAnalytics(true);
      try {
        if (!user?.email) throw new Error("User email is missing");
        const response = await fetch(`/api/seller/performance-analytics?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) throw new Error(`Failed to fetch analytics: ${response.statusText}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.error || "Failed to load analytics");
        setAnalytics(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    if (user) fetchAnalytics();
  }, [user]);

  // Destroy previous chart instance and create new one when data changes
  useEffect(() => {
    if (chartRef.current && analytics?.salesByDate.length && Chart) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Avoid memory leaks
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: analytics.salesByDate.map((item) => item.date),
          datasets: [{
            label: "Sales ($)",
            data: analytics.salesByDate.map((item) => item.total),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [analytics, Chart]);

  if (isLoading || isLoadingAnalytics) {
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
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold">Total Sales</h3>
                <p className="text-2xl font-bold">${analytics?.totalSales.toLocaleString() || 0}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="text-lg font-semibold">Average Price</h3>
                <p className="text-2xl font-bold">${analytics?.averagePrice.toLocaleString() || 0}</p>
              </div>
            </div>
            {analytics?.salesByDate.length ? (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Sales Over Time</h3>
                <canvas ref={chartRef} className="w-full h-64"></canvas>
              </div>
            ) : (
              <p className="text-center text-gray-500">No sales data available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
