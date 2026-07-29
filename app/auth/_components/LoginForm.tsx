"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authActions";


export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    loginAction.bind(null, "/"),
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login Successful");

      setTimeout(() => {
        switch (state.role) {
          case "TENANT":
            router.push("/dashboard/tenant");
            break;

          case "LANDLORD":
            router.push("/dashboard/landlord");
            break;

          case "ADMIN":
            router.push("/dashboard/admin");
            break;

          default:
            router.push("/");
        }
      }, 1000);
    } else {
      toast.error(state.message || "Login Failed");
    }
  }, [state, router]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      {/* Email */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Email Address
        </label>

        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
          <Mail size={18} className="text-slate-400 mr-3" />

          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Password */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
          <Lock size={18} className="text-slate-400 mr-3" />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-400 hover:text-slate-700 transition"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Remember */}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          href="/auth/forgot-password"
          className="text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}

      <Button
        type="submit"
        disabled={pending}
        className="group w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold flex items-center justify-center gap-2"
      >
        {pending ? (
          "Signing In..."
        ) : (
          <>
            Sign In
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </Button>

      {/* Register */}

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one
        </Link>
      </p>
    </motion.form>
  );
}