"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-slate-950 text-white flex items-center py-20">
      

      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[140px] pointer-events-none"
      />

      <motion.div 
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/25 blur-[140px] pointer-events-none"
      />


      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">


        <div className="flex flex-col items-start">

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>Find Your Next Dream Home</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Discover Perfect <br />
            Living Space To Call{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Home
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
            RentNest connects you with verified luxury apartments and rental homes. 
            Experience hassle-free renting with integrated smart tools.
          </p>


          <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">

            <Link href="/properties">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative group rounded-2xl p-[1.5px] transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg" />
                
                <Button className="relative h-13 overflow-hidden flex items-center gap-3 rounded-[14px] bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 text-base font-bold text-white shadow-xl border-0">
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <span className="relative z-10">Explore Properties</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </motion.div>
            </Link>


            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                variant="outline"
                className="h-13 rounded-2xl border border-slate-800 bg-slate-900/80 px-8 text-base font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                List Your Property
              </Button>
            </motion.div>

          </div>
          <div className="mt-12 flex items-center gap-8 border-t border-slate-800/80 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-slate-400">100% Verified Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-400" />
              <span className="text-sm font-medium text-slate-400">Zero Agency Hassle</span>
            </div>
          </div>

        </div>

        <div className="relative flex justify-center items-center">
          

          <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-r from-cyan-500 to-violet-600 opacity-30 blur-xl" />


          <div className="relative overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Modern Luxury House"
              className="rounded-[22px] object-cover w-full max-h-[500px] transition-transform duration-700 hover:scale-105"
            />


            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-slate-700/60 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">500+</p>
                <p className="text-xs text-slate-400 font-medium">Available Homes</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-950/80 p-3.5 px-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold text-slate-200">New Listings Everyday</span>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}