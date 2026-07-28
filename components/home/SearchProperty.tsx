"use client";

import { MapPin, Search, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchProperty() {
  return (
    <section className="-mt-14 relative z-20 px-6">

      <div className="
        max-w-6xl mx-auto
        bg-white/90 backdrop-blur-xl
        shadow-2xl
        rounded-3xl
        p-6 md:p-8
        border
      ">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Find Your Perfect Home
          </h2>
          <p className="text-gray-500 mt-1">
            Search from thousands of verified rental properties
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div
            className="
            flex items-center gap-3
            border rounded-xl
            px-4 py-3
            bg-gray-50
            hover:bg-white
            hover:shadow-md
            transition
            "
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin 
                size={20}
                className="text-blue-600"
              />
            </div>
            <input
              placeholder="Location"
              className="
              bg-transparent
              outline-none
              w-full
              text-sm
              "
            />
          </div>

          <div
            className="
            flex items-center gap-3
            border rounded-xl
            px-4 py-3
            bg-gray-50
            hover:bg-white
            hover:shadow-md
            transition
            "
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <Home
                size={20}
                className="text-purple-600"
              />
            </div>
            <select
              className="
              bg-transparent
              outline-none
              w-full
              text-sm
              "
            >
              <option>
                Property Type
              </option>
              <option>
                Apartment
              </option>
              <option>
                House
              </option>
              <option>
                Room
              </option>
            </select>
          </div>

          <div
            className="
            flex items-center gap-3
            border rounded-xl
            px-4 py-3
            bg-gray-50
            hover:bg-white
            hover:shadow-md
            transition
            "
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign
                size={20}
                className="text-green-600"
              />
            </div>
            <select
              className="
              bg-transparent
              outline-none
              w-full
              text-sm
              "
            >
              <option>
                Price Range
              </option>
              <option>
                $500 - $1000
              </option>
              <option>
                $1000 - $2000
              </option>
              <option>
                $2000+
              </option>
            </select>
          </div>
          <Button
            className="
            h-full
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            hover:from-blue-700
            hover:to-indigo-700
            text-white
            flex
            items-center
            justify-center
            gap-2
            shadow-lg
            hover:scale-[1.02]
            transition
            "
          >
            <Search size={20}/>
            Search Home
          </Button>
        </div>
      </div>
    </section>
  );
}