"use client";

import { useState } from "react";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";


export default function PropertyCard({
  property,
}: {
  property: Property;
}) {
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl =
    property.images?.[0] && !property.images[0].includes("example.com")
      ? property.images[0]
      : "https://placehold.co/600x400?text=RentNest";

  return (
    <div className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(8,_112,_184,_0.05)] hover:shadow-[0_20px_40px_rgba(8,_112,_184,_0.12)] hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            Featured
          </span>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isLiked
                ? "bg-rose-500/90 border-rose-400 text-white shadow-md shadow-rose-500/30"
                : "bg-white/80 border-white/60 text-slate-700 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart size={16} className={isLiked ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-slate-500 text-sm font-medium">
          <MapPin size={15} className="text-blue-500 shrink-0" />
          <span className="line-clamp-1">
            {property.area}, {property.city}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100/80 text-slate-600 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-100 rounded-xl px-3 py-2">
            <BedDouble size={16} className="text-indigo-500" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-100 rounded-xl px-3 py-2">
            <Bath size={16} className="text-indigo-500" />
            <span>{property.bathrooms} Baths</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-2">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Rent Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                $ {property.rentPrice?.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium">/mo</span>
            </div>
          </div>

          <Button 
            className="rounded-xl bg-slate-900 hover:bg-blue-600 text-white shadow-md transition-all duration-300 group/btn"
          >
            <Link href={`/properties/${property.id}`} className="flex items-center gap-1">
              <span>Details</span>
              <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}