"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchProperty() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (category && category !== "all") params.set("category", category);
    if (maxPrice && maxPrice !== "all") params.set("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="-mt-14 relative z-20 px-6">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 border border-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Find Your Perfect Home
          </h2>
          <p className="text-gray-500 mt-1">
            Search from thousands of verified rental properties
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Location Input */}
          <div className="flex items-center gap-3 border rounded-xl px-4 py-2 bg-gray-50 hover:bg-white hover:shadow-md transition">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin size={20} className="text-blue-600" />
            </div>
            <Input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none outline-none shadow-none focus-visible:ring-0 text-sm p-0"
            />
          </div>


          <div className="flex items-center gap-3 border rounded-xl px-4 py-2 bg-gray-50 hover:bg-white hover:shadow-md transition">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Home size={20} className="text-purple-600" />
            </div>
            <Select value={category} onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="bg-transparent border-none outline-none shadow-none focus:ring-0 text-sm p-0 h-auto text-slate-700">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="room">Room / Sublet</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="flex items-center gap-3 border rounded-xl px-4 py-2 bg-gray-50 hover:bg-white hover:shadow-md transition">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <Select value={maxPrice} onValueChange={(val) => setMaxPrice(val)}>
              <SelectTrigger className="bg-transparent border-none outline-none shadow-none focus:ring-0 text-sm p-0 h-auto text-slate-700">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="10000">Up to $10,000</SelectItem>
                <SelectItem value="25000">Up to $25,000</SelectItem>
                <SelectItem value="50000">Up to $50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <Button
            onClick={handleSearch}
            className="h-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition"
          >
            <Search size={20} />
            Search Home
          </Button>
        </div>
      </div>
    </section>
  );
}