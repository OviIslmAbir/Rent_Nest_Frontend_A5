"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ArrowRight, ChevronRight, LayoutDashboard } from "lucide-react";

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

export default function Navbar({
  isLoggedIn = false,
  userRole = "TENANT",
}: NavbarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const dashboardPath = `/dashboard/${userRole.toLowerCase()}`;

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
          {navLinks.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative px-4 py-2.5 text-base font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "text-blue-600 font-bold bg-blue-50/90 border border-blue-100 shadow-xs"
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                <AnimatePresence>
                  {hoveredIndex === index && !isActive && (
                    <motion.span
                      layoutId="hoverBackground"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.3,
                      }}
                      className="absolute inset-0 z-[-1] rounded-xl bg-slate-100/80"
                    />
                  )}
                </AnimatePresence>
                {item.title}
              </Link>
            );
          })}
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "h-11 w-11 rounded-2xl border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50 hover:text-blue-600 shadow-xs"
              )}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col justify-between border-r border-slate-200/80 bg-white/95 text-slate-800 backdrop-blur-2xl p-6 sm:max-w-xs"
            >
              <div>
                <SheetHeader className="pb-6 border-b border-slate-100">
                  <SheetTitle className="text-left font-bold text-slate-900 flex items-center justify-between">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-xl font-extrabold tracking-wider text-transparent">
                      RENT<span className="text-blue-600">NEST</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100"> App
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {isLoggedIn && (
                    <Link
                      href={dashboardPath}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition-all duration-300 mb-2 border",
                        pathname.startsWith("/dashboard")
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25"
                          : "bg-blue-50/80 text-blue-600 border-blue-200/80 hover:bg-blue-100"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <LayoutDashboard size={20} />
                        Dashboard
                      </span>
                      <ChevronRight size={18} />
                    </Link>
                  )}

                  {navLinks.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group relative flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-all duration-300 overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-[1.01]"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {item.title}
                        </span>

                        {isActive ? (
                          <motion.div
                            layoutId="activeMobileDot"
                            className="h-2 w-2 rounded-full bg-white shadow-xs shadow-white/80"
                          />
                        ) : (
                          <ChevronRight
                            size={16}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-base font-semibold text-slate-800 shadow-xs hover:bg-slate-50 transition-all"
                    >
                      Login
                    </Link>

                    <Link
                      href="/auth/register"
                      onClick={() => setOpen(false)}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/40 p-3.5 border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <UserMenu role={userRole} />
                      </div>
                    </div>
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