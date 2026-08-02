"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 text-slate-900 overflow-hidden selection:bg-blue-600 selection:text-white">

      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-200/50 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] z-10 my-8"
      >

        <div className="flex justify-center mb-6">
          <Link href="/">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full hover:border-blue-500/40 transition-all duration-300">
              <span className="text-xs font-semibold tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase">
                RentNest Auth
              </span>
            </div>
          </Link>
        </div>


        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Create Account
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Join RentNest today to find or list your properties.
          </p>
        </div>

        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default RegisterPage;