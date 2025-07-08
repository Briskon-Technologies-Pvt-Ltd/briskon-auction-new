// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input"; 
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/lib/supabaseClient";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//   // 🔍 Check if user exists
//   const { data: users, error: userCheckError } = await supabase
//     .from("profiles") // Replace with your mirror table if needed
//     .select("email")
//     .eq("email", email);

//   if (userCheckError || !users || users.length === 0) {
//     setMessage({ type: "error", text: "No user found with this email address." });
//     setLoading(false);
//     return;
//   }

//   //  Send password reset email
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${window.location.origin}/reset-password`,
//   });


//     if (error) {
//       setMessage({ type: "error", text: error.message });
//     } else {
//       setMessage({ type: "success", text: "Password reset email sent successfully." });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
//         <div className="mb-4 text-center">
//           <h2 className="text-2xl font-bold">Forgot Password</h2>
//           <p className="text-sm text-gray-500">Enter your email to reset your password.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email address
//             </label>
//             <Input
//               id="email"
//               type="email"
//               required
//               placeholder="Enter your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full"
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Sending..." : "Send Reset Link"}
//           </Button>
//         </form>

//         {message && (
//           <div
//             className={cn(
//               "mt-4 text-sm text-center p-2 rounded-md",
//               message.type === "success"
//                 ? "text-green-600 bg-green-100"
//                 : "text-red-600 bg-red-100"
//             )}
//           >
//             {message.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Gavel } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string | ReactNode} | null>(null);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data: users, error: userCheckError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email);

   

if (userCheckError || !users || users.length === 0) {
  setMessage({
    type: "error",
    text: (
      <>
        Invalid user.{" "}
        <a href="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Please sign up
        </a>
        
      </>
    ),
  });
  setLoading(false);
  return;
}


    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setMessage(
      error
        ? { type: "error", text: error.message }
        : { type: "success", text: "Password reset email sent successfully." }
    );

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative overflow-hidden px-4">
      <div
        className="absolute inset-0 opacity-20 transition-all duration-300"
        // style={{
        //   background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        // }}
      />
      <div className="absolute inset-0 bg-grid-gray-200/[0.05] bg-[size:30px_30px]" />

      <div className="w-full max-w-4xl relative z-10">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl card-hover">
          <CardHeader className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-10 text-center relative">
            <div className="absolute inset-0 bg-grid-gray-200/[0.1] bg-[size:20px_20px]" />
            <div className="absolute -top-4 right-6 w-10 h-10 bg-blue-200/30 rounded-full animate-pulse" />
            <div className="flex justify-center mb-4">
              <Gavel className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Forgot Your Password?</h1>
            <p className="text-gray-600 text-lg">We'll send you a reset link to your email</p>
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md transition-all duration-300 animate-pulse-once"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            {message && (
              <div
                className={cn(
                  "mt-6 text-sm text-center p-3 rounded-md",
                  message.type === "success"
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                )}
              >
                {message.text}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
