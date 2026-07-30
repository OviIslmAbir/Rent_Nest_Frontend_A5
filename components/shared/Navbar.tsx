"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserMenu from "./UserMenu";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: string;
}

export default function Navbar({ isLoggedIn = false, userRole = "TENANT" }: NavbarProps) {
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
          ease: "easeInOut",
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
              <Link
                href="/auth/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 rounded-2xl border border-slate-200/80 bg-white/50 px-6 text-base font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-600"
                )}
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants(),
                  "h-11 flex items-center gap-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 text-base font-bold text-white shadow-lg border-0 transition-all"
                )}
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </>
          ) : (
            <UserMenu role={userRole} />
          )}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "h-11 w-11 rounded-2xl border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <Menu className="h-6 w-6" />
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
                {navLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-xl px-3.5 py-3 text-lg font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="my-2 border-t border-slate-100" />

                {!isLoggedIn ? (
                  <div className="flex flex-col gap-3.5">
                    <Link
                      href="/auth/login"
                      className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-base font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Login
                    </Link>

                    <Link
                      href="/auth/register"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold text-white shadow-md"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                ) : (
                  <UserMenu role={userRole} />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}