"use client";

// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import { useHasMounted } from "@/hooks/useHasMounted";

// interface LocationOption {
//   label: string;
//   value: string;
// }

// interface Props {
//   onLocationChange?: (location: {
//     country: string;
//     state: string;
//     city: string;
//   }) => void;
// }
 
// const headers = {
//   "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY",
//   "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
// };

// export default function LocationDropdownsGeoDB({ onLocationChange }: Props) {
//   const [countries, setCountries] = useState<LocationOption[]>([]);
//   const [states, setStates] = useState<LocationOption[]>([]);
//   const [cities, setCities] = useState<LocationOption[]>([]);

//   const [selectedCountry, setSelectedCountry] = useState<LocationOption | null>(null);
//   const [selectedState, setSelectedState] = useState<LocationOption | null>(null);
//   const [selectedCity, setSelectedCity] = useState<LocationOption | null>(null);
//   const hasMounted = useHasMounted();

//   // 🛠️ Just render empty shell or loading text
//   if (!hasMounted) {
//     return (
//       <div className="text-sm text-gray-500">Loading location options...</div>
//     );
//   }
//   // Fetch countries
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await axios.get("https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=250", {
//           headers,
//         });
//         const options = res.data.data.map((c: any) => ({
//           label: c.name,
//           value: c.code,
//         }));
//         setCountries(options);
//       } catch (err) {
//         console.error("Error fetching countries:", err);
//       }
//     };

//     fetchCountries();
//   }, []);

//   // Fetch states
//   useEffect(() => {
//     if (!selectedCountry) return;

//     const fetchStates = async () => {
//       try {
//         setStates([]);
//         setCities([]);
//         setSelectedState(null);
//         setSelectedCity(null);

//         const res = await axios.get(
//           `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${selectedCountry.value}/regions?limit=100`,
//           { headers }
//         );
//         const options = res.data.data.map((s: any) => ({
//           label: s.name,
//           value: s.code,
//         }));
//         setStates(options);
//       } catch (err) {
//         console.error("Error fetching states:", err);
//       }
//     };

//     fetchStates();
//   }, [selectedCountry]);

//   // Fetch cities
//   useEffect(() => {
//     if (!selectedCountry || !selectedState) return;

//     const fetchCities = async () => {
//       try {
//         setCities([]);
//         setSelectedCity(null);

//         const res = await axios.get(
//           `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${selectedCountry.value}/regions/${selectedState.value}/cities?limit=100`,
//           { headers }
//         );
//         const options = res.data.data.map((c: any) => ({
//           label: c.name,
//           value: c.name,
//         }));
//         setCities(options);
//       } catch (err) {
//         console.error("Error fetching cities:", err);
//       }
//     };

//     fetchCities();
//   }, [selectedState]);

//   // Notify parent
//   useEffect(() => {
//     onLocationChange?.({
//       country: selectedCountry?.label || "",
//       state: selectedState?.label || "",
//       city: selectedCity?.label || "",
//     });
//   }, [selectedCountry, selectedState, selectedCity]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       <div>
//         <label className="text-gray-700 block mb-1">Country</label>
//         <Select
//           options={countries}
//           value={selectedCountry}
//           onChange={(option) => setSelectedCountry(option)}
//           placeholder="Select Country"
//         />
//       </div>
//       <div>
//         <label className="text-gray-700 block mb-1">State</label>
//         <Select
//           options={states}
//           value={selectedState}
//           onChange={(option) => setSelectedState(option)}
//           placeholder="Select State"
//           isDisabled={!selectedCountry}
//         />
//       </div>
//       <div>
//         <label className="text-gray-700 block mb-1">City</label>
//         <Select
//           options={cities}
//           value={selectedCity}
//           onChange={(option) => setSelectedCity(option)}
//           placeholder="Select City"
//           isDisabled={!selectedState}
//         />
//       </div>
//     </div>
//   );
// }
