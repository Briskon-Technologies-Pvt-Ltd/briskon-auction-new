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

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

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
  addressline1?: string;
  addressline2?: string;
  phone?: string;
}

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const userId = params.id || user?.id;
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [activeTab, setActiveTab] = useState("view");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // For edit form fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");

  // Password change fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        setAddress1(data.data.addressline1 || "");
        setAddress2(data.data.addressline2 || "");
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
  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      alert("User session invalid. Please log in again.");
      return;
    }

    // Re-authenticate with old password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (signInError) {
      alert("Current password is incorrect.");
      return;
    }

    // Update to new password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(`Error updating password: ${error.message}`);
      return;
    }

    alert("Password changed successfully. Please log in again.");
     setTimeout(async () => {
  await supabase.auth.signOut();
  router.push("/login");
}, 1000); // delay 1 second
  };

  const handleSaveChanges = async () => {
    if (!user?.id) {
      toast.error("User not logged in");
      return;
    }

    const updates = {
      fname,
      lname,
      addressline1: address1, // ✅ match your DB column
      addressline2: address2,
      phone,
      // updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow rounded-xl p-10 space-y-12">
        {/* Top Info Section */}
        <div className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 mb-6">
          My Profile
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Profile Picture */}
          <div className="flex-1 w-full flex flex-col gap-4 text-sm mt-4 md:mt-0">
            <div>
              <Label className="text-gray-600">Email</Label>
              <div className="text-base font-medium text-gray-700 dark:text-white">
                {profile.email}
              </div>
            </div>
            <div>
              <Label className="text-gray-600">Role</Label>
              <div className="text-base font-medium text-gray-700 dark:text-white capitalize">
                {profile.role}
              </div>
            </div>
            <div>
              <Label className="text-gray-600">Joined On</Label>
              <div className="text-base font-medium text-gray-700 dark:text-white">
                {createdAtIST}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 relative">
              <Image
                src={
                  profile.avatar_url
                    ? `${profile.avatar_url}?t=${Date.now()}`
                    : "/images/user.png"
                }
                alt="Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            {/* THIS label must wrap BOTH input and button */}

            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              onChange={handleFileChange}
              className="hidden"
            />

            <label htmlFor="profile-upload" className="cursor-pointer">
              <Button variant="secondary" size="sm">
                Change Photo
              </Button>
            </label>
          </div>

          {/* Read-only Info */}
        </div>

        {/* Editable Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              className="text-sm font-medium text-gray-700 dark:text-white"
              htmlFor="fname"
            >
              First Name
            </Label>
            <Input
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-gray-600" htmlFor="lname">
              Last Name
            </Label>
            <Input
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-gray-600" htmlFor="address1">
              Address Line 1
            </Label>
            <Input
              id="addressline1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="address2">
              Address Line 2
            </Label>
            <Input
              id="addressline2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="md:col-span-1 text-gray-600">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              className="w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="md:col-span-2 text-center">
            <Button
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 active:scale-95 transition-transform duration-100"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="space-y-6 pt-10">
          <div className="text-2xl font-semibold text-gray-800 dark:text-white border-b pb-2 mb-6">
            Change Password
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            {/* Old Password */}
            <div className="relative">
              <Label htmlFor="old-password">Current Password</Label>
              <Input
                required
                id="old-password"
                type={showOldPassword ? "text" : "password"}
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                required
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative md:col-span-1">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                required
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Button */}
            <div className="md:col-span-2 text-center">
              <Button
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 active:scale-95 transition-transform duration-100"
                onClick={handleUpdatePassword}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
