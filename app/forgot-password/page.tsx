"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

  // 🔍 Check if user exists
  const { data: users, error: userCheckError } = await supabase
    .from("profiles") // Replace with your mirror table if needed
    .select("email")
    .eq("email", email);

  if (userCheckError || !users || users.length === 0) {
    setMessage({ type: "error", text: "No user found with this email address." });
    setLoading(false);
    return;
  }

  // 📧 Send password reset email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });


    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Password reset email sent successfully." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-sm text-gray-500">Enter your email to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {message && (
          <div
            className={cn(
              "mt-4 text-sm text-center p-2 rounded-md",
              message.type === "success"
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            )}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
