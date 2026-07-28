"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.form 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 w-full max-w-md mx-auto"
    >
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Full Name
        </label>
        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <User size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="John Doe"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
      </div>


      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Email Address
        </label>
        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Mail size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type="email"
            placeholder="name@example.com"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
      </div>


      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Password
        </label>
        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Lock size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm pr-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Confirm Password
        </label>
        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Lock size={18} className="text-slate-400 mr-3 shrink-0" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm pr-2"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input 
          type="checkbox" 
          id="terms"
          required
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none">
          I agree to the{" "}
          <Link href="/terms" className="text-blue-600 font-medium hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 font-medium hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>


      <Button
        type="submit"
        className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        <span>Create Account</span>
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Button>

      <div className="relative flex items-center justify-center my-5">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-medium absolute">
          Or sign up with
        </span>
      </div>


      <p className="text-center text-sm text-slate-500 pt-2">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </p>
    </motion.form>
  );
}