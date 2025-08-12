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
import { useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import LocationSelector from "@/components/LocationSelector";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import type { Country } from "@/lib/locationTypes";
import { countriesData } from "@/Data/Location";
// import useSWR from "swr";
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
  type: string;
  location: string;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Password change fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    accountType: "buyer", // Default to 'buyer'
    sellerType: "individual", // Default to 'individual' for seller/both
    buyerType: "individual", // Default for buyer when accountType is buyer or both
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    confirmPassword: "",
    organizationName: "", // New field for organization
    organizationContact: "", // New field for organization contact
    buyerOrganizationName: "", // new field for buyer organizations
    buyerOrganizationContact: "", // new field for buyer organizations
    location: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  useEffect(() => {
    setCountries(countriesData); // Only set once on mount
  }, []);
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

        const [city = "", state = "", country = ""] = (data.data.location || "")
          .split(",")
          .map((s: string) => s.trim());
        // Set form values
        setFormData((prev) => ({
          ...prev,
          city,
          state,
          country,
        }));

        // Set selected dropdowns
        setSelectedCity(city);
        setSelectedState(state);
        setSelectedCountry(country);
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
    .toLocaleString(DateTime.DATE_FULL);

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
    const location = [formData.city, formData.state, formData.country]
      .filter(Boolean) // removes any empty strings or nulls
      .join(", ");
    const updates = {
      fname,
      lname,
      addressline1: address1, // ✅ match your DB column
      addressline2: address2,
      phone,
      location,
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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow rounded-xl p-10 space-y-6">
        {/* Header */}
        <div className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 mb-6 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-600 dark:text-gray-300 animate-bounce" />
          My Profile
        </div>
        <div className="flex items-center justify-between">
          {/* Name */}
          <div className="flex flex-col -mt-[100px]">
            <div className="font-medium text-[30px] text-gray-800 dark:text-white mt-2">
              {fname} {lname}
            </div>
            {/* Email, Role, Joined */}
            <div className="flex flex-wrap gap-x-1 gap-y-2 mt-1 text-xs text-gray-500 dark:text-gray-300">
              <div>
                {profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
              </div>
              <div>
                <div className="font-normal capitalize">{profile.role} - </div>
              </div>
              <div>
                <div className="font-normal">{profile.email},</div>
              </div>
              <div>
                <div className="font-normal">Joined on: {createdAtIST}</div>
              </div>
            </div>
          </div>
          {/* Image + Change Photo button */}
          <div className="flex flex-col items-center gap-2 ">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 relative">
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
            <label className="cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={triggerFileInput}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 font-medium transition-colors duration-200 rounded-md shadow-md px-5 py-2"
              >
                Change Photo
              </Button>
            </label>
          </div>
        </div>

        {/* Read-only Info */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
          {/* Left Side: Info Fields */}
          <div className="flex-1 space-y-2 text-sm text-gray-700 dark:text-white">
            {/* <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 relative">
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
            <label className="cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={triggerFileInput}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-black transition-colors duration-200"
              >
                Change Photo
              </Button>
            </label>
          </div> */}

            {/* Fname, Lname */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
              <div>
                <Label htmlFor="fname" className="text-gray-600 mb-2 block">
                  First Name
                </Label>
                <Input
                  id="fname"
                  className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Enter First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lname" className="text-gray-600 mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lname"
                  className="  bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Enter Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            {/* Address1, Phone */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label
                  htmlFor="addressline1"
                  className="text-gray-600 mb-2 block"
                >
                  Address Line 1
                </Label>
                <Input
                  id="addressline1"
                  className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Eg: Florida"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <Label
                  htmlFor="addressline2"
                  className="text-gray-600 mb-2 block"
                >
                  Address Line 2
                </Label>
                <Input
                  id="addressline2"
                  className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Optional"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>
            {/* City, State, Country - in one row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-gray-600">
                  Country
                </Label>
                <select
                  id="country"
                  name="country"
                  className="w-full bg-white  border-gray-300 text-gray-500 transition-all focus:border-blue-500 focus:bg-white shadow-sm rounded-lg p-2"
                  value={formData.country}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      country: value,
                      state: "",
                      city: "",
                    }));
                    setSelectedCountry(value);
                    setSelectedState("");
                    setSelectedCity("");
                  }}
                >
                  <option className="text-gray-600" value="">
                    Select Country
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="state" className="text-gray-600">
                  State
                </label>
                <select
                  id="state"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:bg-white transition-all shadow-sm  rounded-lg p-2"
                  value={selectedState}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Update formData with selected state, reset city
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      state: value,
                      city: "", // Reset city when state changes
                    }));

                    // Update selected state and reset city
                    setSelectedState(value);
                    setSelectedCity("");
                  }}
                >
                  <option value="">Select State</option>
                  {countries
                    .find((country) => country.name === selectedCountry)
                    ?.states?.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="city" className="text-gray-600">
                  City
                </label>
                <select
                  id="city"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:bg-white transition-all shadow-sm  rounded-lg p-2"
                  value={selectedCity}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData((prev) => ({
                      ...prev,
                      city: value,
                    }));

                    setSelectedCity(value);
                  }}
                >
                  <option className="" value="">
                    Select City
                  </option>
                  {countries
                    .find((country) => country.name === selectedCountry)
                    ?.states.find((state) => state.name === selectedState)
                    ?.cities?.map((city) => (
                      <option className="" key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Phone input (half width) */}
              <div className="col-span-1">
                <Label htmlFor="phone" className="text-gray-600 mb-2 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  className="bg-white border border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Put another field here to use the second column, or leave empty */}
              <div className="col-span-1">
                {/* Optional: second input or leave blank */}
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
        </div>

        {/* Save Button */}
        <div className="md:col-span-2 text-center flex justify-start mt-6">
          <Button
            size="sm"
            variant="secondary"
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 font-medium transition-colors duration-200 rounded-md shadow-sm px-5 py-2"
            onClick={handleSaveChanges}
          >
            Update Profile
          </Button>
        </div>

        {/* Editable Form Section */}

        {/* Change Password Section */}
        <div className="pt-1">
          <div className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 mb-6 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-600 dark:text-gray-300 animate-bounce" />
            Change Password
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-600">
            {/* Current Password */}
            <div className="relative">
              <Label
                htmlFor="old-password"
                className="text-gray-600 mb-2 block"
              >
                Current Password
              </Label>
              <Input
                required
                id="old-password"
                type={showOldPassword ? "text" : "password"}
                placeholder="Current password"
                className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
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

            {/* Empty space */}
            <div></div>

            {/* New Password */}
            <div className="relative">
              <Label
                htmlFor="new-password"
                className="text-gray-600  mb-2 block"
              >
                New Password
              </Label>
              <Input
                required
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
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
            <div></div>
            {/* Confirm Password */}
            <div className="relative">
              <Label
                htmlFor="confirm-password"
                className="mb-2 block text-gray-600"
              >
                Confirm New Password
              </Label>
              <Input
                required
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className=" bg-white border-gray-300 text-gray-500 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white transition-all rounded-lg"
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
            <div></div>
            {/* Button (spanning full width) */}
            <div className="md:col-span-2 flex justify-start mt-6">
              <Button
                variant="secondary"
                size="sm"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 font-medium transition-colors duration-200 rounded-md shadow-sm px-5 py-2"
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
