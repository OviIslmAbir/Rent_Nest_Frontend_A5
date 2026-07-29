"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { registerAction } from "../_actions/authActions";


export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    registerAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 w-full max-w-md mx-auto"
    >
      {/* Name */}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Full Name
        </label>

        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <User size={18} className="text-slate-400 mr-3 shrink-0" />

          <input
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
      </div>

      {/* Email */}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Email Address
        </label>

        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Mail size={18} className="text-slate-400 mr-3 shrink-0" />

          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm"
          />
        </div>
      </div>

      {/* Password */}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <Lock size={18} className="text-slate-400 mr-3 shrink-0" />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm pr-2"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Role */}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Register As
        </label>

        <div className="border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <select
            name="role"
            defaultValue="TENANT"
            className="w-full bg-transparent outline-none text-slate-900"
          >
            <option value="TENANT">Tenant</option>
            <option value="LANDLORD">Landlord</option>
          </select>
        </div>
      </div>

      {/* Terms */}

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="terms"
          required
          className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
        />

        <label
          htmlFor="terms"
          className="text-xs text-slate-600 cursor-pointer select-none"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-blue-600 font-medium hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-blue-600 font-medium hover:underline"
          >
            Privacy Policy
          </Link>
        </label>
      </div>

      {/* Submit */}

      <Button
        type="submit"
        disabled={pending}
        className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
      >
        {pending ? (
          "Creating Account..."
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </Button>

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