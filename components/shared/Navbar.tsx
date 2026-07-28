"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  UserCircle, 
  Sparkles, 
  LogOut, 
  LayoutDashboard, 
  User, 
  ChevronDown,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const isLoggedIn = false;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/75 backdrop-blur-md transition-all duration-300">
      <motion.div 
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
      />

      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-600 bg-clip-text text-2xl font-extrabold tracking-wider text-transparent">
            RENT<span className="text-blue-600">NEST</span>
          </span>
        </Link>


        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:text-blue-600"
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="hoverBackground"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    className="absolute inset-0 z-[-1] rounded-xl bg-blue-50/80 border border-blue-100/60"
                  />
                )}
              </AnimatePresence>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="ghost"
                    className="h-11 rounded-2xl border border-slate-200/80 bg-white/50 px-6 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-600 hover:shadow"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>


              <Link href="/auth/register">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group rounded-2xl p-[1.5px] transition-all duration-300"
                >

                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg" />
                  
                  <Button className="relative h-11 overflow-hidden flex items-center gap-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 text-base font-bold text-white shadow-lg border-0 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]">

                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

                    <span className="relative z-10 tracking-wide">Get Started</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>
              </Link>
            </>
          ) : (

            <DropdownMenu>
              <DropdownMenuTrigger >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="group h-11 rounded-2xl border border-slate-200/90 bg-white/90 px-6 text-base font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-md"
                  >
                    <UserCircle className="mr-2 h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                    Account
                    <ChevronDown className="ml-2 h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border border-slate-100 bg-white/95 p-2 text-slate-800 shadow-2xl backdrop-blur-xl"
              >
                <DropdownMenuItem >
                  <Link
                    href="/dashboard"
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all hover:bg-blue-50/80 hover:text-blue-600"
                  >
                    <LayoutDashboard className="h-4.5 w-4.5 text-blue-600" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem >
                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all hover:bg-blue-50/80 hover:text-indigo-600"
                  >
                    <User className="h-4.5 w-4.5 text-indigo-600" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <div className="my-1 border-t border-slate-100" />

                <DropdownMenuItem
                  onClick={() => console.log("Logout")}
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50 hover:text-rose-700"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>


        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-2xl border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50 hover:text-blue-600"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="border-r border-slate-200 bg-white/95 text-slate-800 backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-slate-900">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl">
                    RENTNEST
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-3.5">
                {navLinks.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3.5 py-3 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-2 border-t border-slate-100" />

                {!isLoggedIn ? (
                  <div className="flex flex-col gap-3.5">
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        className="h-12 w-full justify-center rounded-2xl border-slate-200 bg-white text-base font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/auth/register">
                      <Button className="h-12 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold text-white shadow-md">
                        <span>Get Started</span>
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                    >
                      <LayoutDashboard className="h-5 w-5 text-blue-600" />
                      Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                    >
                      <User className="h-5 w-5 text-indigo-600" />
                      Profile
                    </Link>

                    <button
                      onClick={() => console.log("Logout")}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-base font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}