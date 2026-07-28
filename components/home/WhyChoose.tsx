"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, LockKeyhole, Sparkles } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    desc: "Every listing undergoes a strict multi-step verification process to ensure zero fraud.",
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Seamless Rental Process",
    desc: "Request, approve, sign agreements, and manage bookings effortlessly from one place.",
    color: "from-blue-500 to-indigo-500",
    shadow: "shadow-blue-500/10",
  },
  {
    icon: LockKeyhole,
    title: "Secure & Smart Payments",
    desc: "Encrypted transactions with instant receipt generation and flexible payout options.",
    color: "from-indigo-500 to-violet-500",
    shadow: "shadow-violet-500/10",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-20 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>The RentNest Advantage</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              RentNest?
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg font-normal"
          >
            We simplify your house hunting and rental management with cutting-edge, secure digital tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-200"
              >
                <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} p-0.5 shadow-md ${item.shadow}`}>
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white transition-colors group-hover:bg-transparent">
                    <Icon className="h-6 w-6 text-slate-800 transition-colors group-hover:text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}