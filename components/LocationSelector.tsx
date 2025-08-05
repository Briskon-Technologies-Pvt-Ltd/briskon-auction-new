import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import type { City, State, Country } from "@/lib/locationTypes";

interface LocationSelectorProps {
  countries: Country[];
  formData: {
    country: string;
    state: string;
    city: string;
  };
  setFormData: (data: any) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  variant?: "register" | "profile";
}

export default function LocationSelector({
  countries,
  formData,
  setFormData,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}: LocationSelectorProps) {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const country = countries.find((c) => c.name === selectedCountry);
    if (country) {
      setStates(country.states);
    } else {
      setStates([]);
    }
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    const state = states.find((s) => s.name === selectedState);
    if (state) {
      setCities(state.cities);
    } else {
      setCities([]);
    }
    setSelectedCity("");
  }, [selectedState]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Country */}
      <div className="space-y-1.5">
        <Label htmlFor="country" className="text-gray-700">Country</Label>
        <select
          id="country"
          className="w-full border-gray-300 rounded-lg p-2"
          value={formData.country}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, country: value, state: "", city: "" });
            setSelectedCountry(value);
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="space-y-1.5">
        <Label htmlFor="state" className="text-gray-700">State</Label>
        <select
          id="state"
          className="w-full border-gray-300 rounded-lg p-2"
          value={formData.state}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, state: value, city: "" });
            setSelectedState(value);
          }}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="space-y-1.5">
        <Label htmlFor="city" className="text-gray-700">City</Label>
        <select
          id="city"
          className="w-full border-gray-300 rounded-lg p-2"
          value={formData.city}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, city: value });
            setSelectedCity(value);
          }}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
