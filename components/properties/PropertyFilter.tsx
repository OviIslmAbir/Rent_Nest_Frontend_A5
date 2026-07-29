"use client";

import { useState } from "react";
import { Search, MapPin, Home, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyFilter() {
  const [priceRange, setPriceRange] = useState<number>(2000);


  return (
    <aside className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(8,_112,_184,_0.06)] h-fit sticky top-24 z-10 transition-all duration-300">

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <SlidersHorizontal size={18} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Filter Properties
          </h2>
        </div>

        <button 
          className="text-xs font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div className="space-y-6">

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Location
          </label>
          <div className="relative flex items-center border border-slate-200/80 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
            <MapPin size={18} className="text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="e.g. Uttara, Dhaka"
              className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
            />
          </div>
        </div>


        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Property Type
          </label>
          <div className="relative flex items-center border border-slate-200/80 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
            <Home size={18} className="text-slate-400 mr-2.5 shrink-0" />
            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium cursor-pointer">
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House / Villa</option>
              <option value="room">Single Room</option>
              <option value="duplex">Duplex</option>
            </select>
          </div>
        </div>



        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Max Price
            </label>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              ${priceRange} / mo
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>$200</span>
            <span>$5,000+</span>
          </div>
        </div>


        <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99] mt-2">
          <Search size={18} />
          <span>Apply Filters</span>
        </Button>
      </div>
    </aside>
  );
}