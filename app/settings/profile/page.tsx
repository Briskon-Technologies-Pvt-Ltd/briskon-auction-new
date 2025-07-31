"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Profile {
  id: string;
  fname: string;
  lname: string;
  role: string;
  email: string;
  created_at: string;
}

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const userId = params.id || user?.id; // Fallback to auth user ID if no param

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profiles/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        if (!data.success)
          throw new Error(data.error || "Failed to load profile");
        setProfile(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!profile)
    return <div className="text-center py-20">Profile not found</div>;

  const createdAtIST = DateTime.fromISO(profile.created_at, { zone: "utc" })
    .setZone("Asia/Kolkata")
    .toLocaleString(DateTime.DATETIME_FULL);

  return (
    <div className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-md border border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                <Image
                  src={profile.avatar_url || "/images/user.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <input type="file" hidden id="profile-upload" />
              <label htmlFor="profile-upload">
                <Button variant="secondary" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </label>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Profile Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Full Name
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{`${profile.fname} ${profile.lname}`}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Role
              </h3>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {profile.role}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.email}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Joined
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{createdAtIST}</p>
            </div>

            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => router.push("/dashboard/buyer")}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
