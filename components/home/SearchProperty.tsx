"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
}

export default function SearchProperty() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const res = await fetch(
          "https://rentnest-nine.vercel.app/api/categories",
          {
            cache: "no-store",
          }
        );

        const result = await res.json();
        setCategories(Array.isArray(result) ? result : result.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleSearch = () => {
    const trimmedLocation = location.trim();

    if (!trimmedLocation && (!category || category === "all")) {
      toast.error("Please enter a location or select a category");
      return;
    }

    const params = new URLSearchParams();

    if (trimmedLocation) {
      params.set("location", trimmedLocation);
    }

    if (category && category !== "all") {
      params.set("category", category);
    }

    toast.success("Searching properties...");

    const queryString = params.toString();
    router.push(queryString ? `/properties?${queryString}` : "/properties");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="-mt-14 relative z-20 px-6">
      <div className="max-w-6xl mx-auto rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Find Your Perfect Home
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Search from thousands of verified rental properties
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600 shrink-0">
              <MapPin size={18} />
            </div>

            <Input
              placeholder="City or Area..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0 text-sm font-medium text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all focus-within:border-purple-400 focus-within:bg-white focus-within:shadow-sm">
            <div className="rounded-xl bg-purple-50 p-2 text-purple-600 shrink-0">
              <Home size={18} />
            </div>

            <Select value={category ?? undefined} onValueChange={setCategory}>
              <SelectTrigger className="border-none bg-transparent p-0 shadow-none focus:ring-0 text-sm font-medium w-full text-slate-800">
                <SelectValue placeholder="Property Category" />
              </SelectTrigger>

              <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                <SelectItem value="all">All Categories</SelectItem>

                {loadingCategories ? (
                  <div className="flex items-center justify-center gap-2 p-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSearch}
            className="group w-full h-[48px] rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>Search Home</span>
          </Button>
        </div>
      </div>
    </section>
  );
}