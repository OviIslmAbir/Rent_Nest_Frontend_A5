"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, MapPin, Home, SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

export default function PropertyFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const res = await fetch(
          "https://rentnest-nine.vercel.app/api/categories",
          { cache: "no-store" }
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

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (category && category !== "all") {
      params.set("category", category);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleReset = () => {
    setLocation("");
    setCategory("all");
    router.push(pathname);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyFilters();
    }
  };

  return (
    <aside className="bg-white/90 backdrop-blur-xl border border-slate-100/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 h-fit sticky top-24 z-10 transition-all duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10">
            <SlidersHorizontal size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Filter Properties
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Refine your search</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1.5 transition-all duration-200 cursor-pointer bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-xl"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Location
          </label>
          <div className="relative flex items-center border border-slate-200/80 rounded-2xl px-4 py-3 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 shadow-xs">
            <MapPin size={18} className="text-blue-500 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="e.g. Uttara, Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Property Type
          </label>
          <div className="relative flex items-center border border-slate-200/80 rounded-2xl px-4 py-3 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all duration-300 shadow-xs">
            <Home size={18} className="text-purple-500 mr-2.5 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium cursor-pointer"
            >
              <option value="all">All Categories</option>

              {loadingCategories ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            {loadingCategories && (
              <Loader2 className="h-4 w-4 animate-spin text-slate-400 ml-2 shrink-0" />
            )}
          </div>
        </div>

        <Button
          onClick={handleApplyFilters}
          className="group w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none mt-2 active:scale-[0.98]"
        >
          <Search size={18} className="transition-transform duration-300 group-hover:scale-110" />
          <span>Apply Filters</span>
        </Button>
      </div>
    </aside>
  );
}