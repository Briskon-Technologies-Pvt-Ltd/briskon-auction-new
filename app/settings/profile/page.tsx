"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useParams, useRouter } from "next/navigation";
import { DateTime } from "luxon";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  id: string;
  fname: string;
  lname: string;
  role: string;
  email: string;
  created_at: string;
  avatar_url?: string;
  address?: string;
  phone?: string;
}

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const userId = params.id || user?.id;

  const [activeTab, setActiveTab] = useState("view");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For edit form fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Password change fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profiles/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        if (!data.success)
          throw new Error(data.error || "Failed to load profile");

        setProfile(data.data);

        // Populate edit fields on load
        setFname(data.data.fname);
        setLname(data.data.lname);
        setAddress(data.data.address || "");
        setPhone(data.data.phone || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profileimage") // ✅ bucket name
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      alert("Failed to upload profile picture.");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("profileimage")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles") // ✅ your actual table name
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update avatar:", updateError.message);
      alert("Failed to update avatar URL.");
    } else {
      alert("Profile picture updated!");
      setProfile((prev) =>
  prev ? { ...prev, avatar_url: `${publicUrl}?t=${Date.now()}` } : prev
);
    }
  };

  // --- END handleFileChange ---
  if (loading)
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        {error}
      </div>
    );

  if (!profile)
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Profile not found
      </div>
    );

  const createdAtIST = DateTime.fromISO(profile.created_at, { zone: "utc" })
    .setZone("Asia/Kolkata")
    .toLocaleString(DateTime.DATETIME_FULL);

  // Handlers for save buttons (placeholders)
  const handleSaveProfile = () => {
    // Implement your API call to update profile here
    alert(`Saving profile:
    First Name: ${fname}
    Last Name: ${lname}
    Address: ${address}
    Phone: ${phone}`);
    setActiveTab("view");
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Implement your API call to update password here
    alert(`Password update requested`);
    // Optionally clear fields after update
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="flex max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex w-full"
          >
            {/* Sidebar Tabs */}
            <TabsList
              className="
            flex flex-col
            items-start
            justify-start
            w-1/4
            min-w-[150px]
            border-r border-gray-200 dark:border-gray-700
            p-6 gap-4
            bg-gray-100 dark:bg-gray-700
            h-full
          "
            >
              <TabsTrigger
                value="view"
                className="
    w-full
    justify-start
    border
    border-gray-300
    bg-white
    text-black
    hover:bg-gray-100
    data-[state=active]:font-semibold
    data-[state=active]:bg-gray-200
  "
                style={{ minHeight: "40px" }}
              >
                View Details
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className="
    w-full
    justify-start
    border
    border-gray-300
    bg-white
    text-black
    hover:bg-gray-100
    data-[state=active]:font-semibold
    data-[state=active]:bg-gray-200
  "
                style={{ minHeight: "40px" }}
              >
                Edit Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="
    w-full
    justify-start
    border
    border-gray-300
    bg-white
    text-black
    hover:bg-gray-100
    data-[state=active]:font-semibold
    data-[state=active]:bg-gray-200
  "
                style={{ minHeight: "40px" }}
              >
                Change Password
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="w-3/4 p-8 relative">
              {/* View Details */}
              <TabsContent value="view" className="space-y-6 text-sm">
                {/* Profile Image */}
                <div className="absolute top-8 right-8 text-center">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 mx-auto">
                    <Image
                      src={`${profile.avatar_url || "/images/user.png"}`}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Invisible but clickable file input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-upload"
                    onChange={handleFileChange}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      zIndex: 10,
                    }}
                  />

                  {/* Label acts as button */}
                  <label
                    htmlFor="profile-upload"
                    className="relative cursor-pointer inline-block mt-2 text-xs"
                  >
                    <Button variant="secondary" size="sm">
                      Change Photo
                    </Button>
                  </label>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                    Full Name
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {profile.fname} {profile.lname}
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
                    Role
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {profile.role}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                    Joined
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {createdAtIST}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => router.push("/dashboard/buyer")}
                >
                  Back to Dashboard
                </Button>
              </TabsContent>

              {/* Edit Profile */}
              <TabsContent value="edit" className="space-y-6 text-sm">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    First Name
                  </label>
                  <Input
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    Address
                  </label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="flex gap-4">
                  <Button className="mt-4" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* Change Password */}
              <TabsContent value="password" className="space-y-6 text-sm">
                <div>
                  <label
                    htmlFor="old-password"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    Current Password
                  </label>
                  <Input
                    id="old-password"
                    type="password"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    New Password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-gray-700 dark:text-gray-200"
                  >
                    Confirm New Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Button className="mt-4" onClick={handleUpdatePassword}>
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
