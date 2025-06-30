"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  fname: string;
  lname: string;
  role: "buyer" | "seller" | "both" | "admin";
  avatar?: string;
  verified: boolean;
  joinedDate: string;
  location?: string;
  type?: "individual" | "organization";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    email: string;
    password: string;
    fname: string;
    lname: string;
    location?: string;
    role: "buyer" | "seller" | "both";
    type?: "individual" | "organization";
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser.user && authUser.user.id && authUser.user.email) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", authUser.user.email)
            .single();
          if (profileError && profileError.code !== "PGRST116" && !authUser.user.confirmed_at) {
            throw new Error("Email not verified");
          }
          setUser({
            id: authUser.user.id,
            email: authUser.user.email,
            fname: profile?.fname || "",
            lname: profile?.lname || "",
            role: (profile?.role as "buyer" | "seller" | "both") || "buyer",
            avatar: profile?.avatar,
            verified: !!authUser.user.confirmed_at,
            joinedDate: authUser.user.created_at || new Date().toISOString(),
            location: profile?.location,
            type: profile?.type as "individual" | "organization",
          });
        }
      }
    } catch (error: any) {
      console.error("Error checking auth:", error);
      await supabase.auth.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  checkAuth();

  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      const fetchUser = async () => {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser.user && authUser.user.id && authUser.user.email && authUser.user.confirmed_at) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", authUser.user.email)
            .single();
          setUser({
            id: authUser.user.id,
            email: authUser.user.email,
            fname: profile?.fname || "",
            lname: profile?.lname || "",
            role: (profile?.role as "buyer" | "seller" | "both") || "buyer",
            avatar: profile?.avatar,
            verified: !!authUser.user.confirmed_at,
            joinedDate: authUser.user.created_at || new Date().toISOString(),
            location: profile?.location,
            type: profile?.type as "individual" | "organization",
          });
        } else {
          await supabase.auth.signOut();
          setUser(null);
        }
      };
      fetchUser();
    } else if (event === "SIGNED_OUT") {
      setUser(null);
    }
  });

  return () => authListener.subscription.unsubscribe();
}, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", { email, password });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser.user && authUser.user.id && authUser.user.email && authUser.user.confirmed_at) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .single();
          if (profileError && profileError.code !== "PGRST116") throw profileError;
          setUser({
            id: authUser.user.id,
            email: authUser.user.email,
            fname: profile?.fname || "",
            lname: profile?.lname || "",
            role: (profile?.role as "buyer" | "seller" | "both") || "buyer",
            avatar: profile?.avatar,
            verified: !!authUser.user.confirmed_at,
            joinedDate: authUser.user.created_at || new Date().toISOString(),
            location: profile?.location,
            type: profile?.type as "individual" | "organization",
          });
        } else {
          await supabase.auth.signOut(); // Log out if not confirmed
          setUser(null);
          return { success: false, error: "Please verify your email before logging in." };
        }
      }
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      setIsLoading(false);
      return { success: false, error: error.message || "Invalid email or password" };
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    fname: string;
    lname: string;
    location?: string;
    role: "buyer" | "seller" | "both";
    type?: "individual" | "organization";
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            fname: userData.fname,
            lname: userData.lname,
            location: userData.location,
            role: userData.role,
            type: userData.type,
            verified: false,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/verify`, // Redirect after verification
        },
      });
      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: userData.email,
          fname: userData.fname,
          lname: userData.lname,
          role: userData.role,
          location: userData.location,
          type: userData.type,
          created_at: new Date().toISOString(),
          verified: false,
        });
        if (profileError) throw profileError;
      }
      setIsLoading(false);
      return { success: true, message: "Registration successful. Please check your email to verify your account." };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: error.message || "Registration failed. Please try again." };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/"); // Navigate to root path after logout
      console.log("User logged out successfully and redirected to /");
    } catch (error: any) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, login, register, logout, isAuthenticated: !!user };
}

export { AuthContext };
