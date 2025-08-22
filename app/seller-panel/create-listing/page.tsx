"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/auth-provider";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuctionBuilderWizard from "@/auction-wizard"; // Adjust path based on your project structure
import { ArrowLeft, LogOut } from "lucide-react";

export default function CreateAuction() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // 🔒 Role-based redirect with debug
 useEffect(() => {
  console.log("CreateAuction useEffect - user:", user);
  if (!user || !["seller", "buyer", "both"].includes(user.role)) {
    console.log("Redirecting to / due to role restriction");
    router.replace("/");
  }
}, [user, router]);

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path); // Debug log
    router.push(path);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/"); // ⏹ Redirect to landing or login page on logout
  };

if (!user || !["seller", "buyer", "both"].includes(user.role)) return null;

  const displayName = user.fname || user.lname || user.email?.split("@")[0] || "Seller";

  return (
  // <div className="min-h-screen py-6 md:py-10 bg-gray-100 dark:bg-gray-950">
<div className="w-full">
  <div className=" max-w-8xl mx-auto rounded-lg bg-white dark:bg-gray-900 shadow-sm border-0">
    <AuctionBuilderWizard />
  </div>
</div>
// </div>
  );
}
