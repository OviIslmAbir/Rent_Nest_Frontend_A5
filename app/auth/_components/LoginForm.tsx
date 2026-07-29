"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 w-full max-w-md mx-auto"
    >

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Email Address
        </label>
        <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 focus-within:bg-white dark:focus-within:bg-slate-950 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Mail size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type="email"
            placeholder="name@example.com"
            required
            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
        </label>
        <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 focus-within:bg-white dark:focus-within:bg-slate-950 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Lock size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm pr-2"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 rounded-md cursor-pointer"
          />
          Remember me
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Forgot password?
        </Link>
      </div>


      <Button
        type="submit"
        className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        <span>Sign In</span>
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Button>


      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
        <span className="bg-white dark:bg-slate-950 px-3 text-xs uppercase tracking-wider text-slate-400 font-medium absolute">
          Or continue with
        </span>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold transition-colors"
        >
          Create one
        </Link>
      </p>
    </motion.form>
  );
}