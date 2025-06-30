"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gavel } from "lucide-react";

export default function LoginPage() {
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case "buyer":
          router.push("/auctions");
          break;
        case "seller":
          router.push("/dashboard/seller");
          break;
        case "both":
          router.push("/dashboard");
          break;
        default:
          router.push("/");
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center text-gray-900">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const FloatingOrb = ({ size, color, position, delay }: { size: string; color: string; position: string; delay: number }) => (
    <div
      className={`absolute ${position} ${size} ${color} rounded-full blur-xl animate-pulse`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );

  const Floating3DShape = ({
    className,
    shape,
    size,
    color,
  }: { className: string; shape: string; size: number; color: string }) => {
    const shapeStyle = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    };

    let shapeElement;
    switch (shape) {
      case "cube":
        shapeElement = <div className="cube" style={shapeStyle} />;
        break;
      case "sphere":
        shapeElement = <div className="sphere" style={shapeStyle} />;
        break;
      case "pyramid":
        shapeElement = (
          <div
            className="pyramid"
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
        break;
      default:
        shapeElement = <div style={shapeStyle} />;
    }

    return (
      <div className={`absolute ${className}`} style={{ transformStyle: "preserve-3d" }}>
        {shapeElement}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4">
      {/* Interactive Auction Atmosphere Background */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid-gray-200/[0.04] bg-[size:30px_30px]"></div>

      {/* Auction-Related Floating Elements */}
      <FloatingOrb size="w-20 h-20" color="bg-blue-200/40" position="top-20 left-10" delay={0} />
      <FloatingOrb size="w-32 h-32" color="bg-cyan-200/40" position="top-40 right-20" delay={1000} />
      <Floating3DShape className="top-32 right-32 animate-rotate-slow" shape="cube" size={40} color="rgba(59, 130, 246, 0.15)" />
      <Floating3DShape className="bottom-32 left-16 animate-float" shape="gavel" size={60} color="rgba(168, 85, 247, 0.15)" />

      <div className="w-full max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl card-hover">
          <CardHeader className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-10 text-center relative">
            <div className="absolute inset-0 bg-grid-gray-200/[0.1] bg-[size:20px_20px]"></div>
            <div className="absolute -top-4 right-6 w-10 h-10 bg-blue-200/30 rounded-full animate-pulse"></div>
            <div className="flex justify-center mb-4">
              <Gavel className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sign In to Briskon Auctions</h1>
            <p className="text-gray-600 text-lg">Access your account to start bidding on exclusive auctions</p>
          </CardHeader>

          <CardContent className="p-10 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                />
              </div>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md transition-all duration-300 animate-pulse-once"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="text-center text-gray-600 text-sm mt-4">
              <Link href="/forgot-password" className="hover:text-blue-600">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center">
              <Link href="/register" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Need an account? Create one here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
