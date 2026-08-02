import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
             About RentNest
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
          Redefining How You <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Rent & Manage Properties
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          RentNest is a modern rental platform designed to bridge the gap between tenants and landlords with seamless payments, verified listings, and effortless management.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
        {[
          { label: "Active Listings", value: "1,500+" },
          { label: "Happy Tenants", value: "10,000+" },
          { label: "Verified Landlords", value: "500+" },
          { label: "Payment Success", value: "99.9%" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs text-center space-y-1"
          >
            <div className="text-3xl font-extrabold text-blue-600">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-16 my-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We believe finding a place to live or renting out your property shouldn&apos;t be stressful. RentNest was built to automate payments, simplify rental requests, and bring 100% transparency to rental management.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Direct & Secure Rent Payments via Stripe",
                "Real-time Request Tracking & Approvals",
                "Verified Property Listings & Honest Reviews",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl space-y-6">
            <Building2 className="w-12 h-12 text-blue-200" />
            <h3 className="text-2xl font-bold">Built for Landlords & Tenants</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Whether you are a tenant looking for your next cozy nest or a landlord seeking reliable tenants and smooth automated invoicing, RentNest gives you the exact tools you need.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose RentNest?
            </h2>
            <p className="text-slate-500 text-sm">
              Everything you need for a smooth rental experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Trust & Security",
                desc: "Every listing and user profile undergoes verification for safer transactions.",
              },
              {
                icon: Zap,
                title: "Instant Payments",
                desc: "Seamless Stripe integration guarantees instant rental payment confirmations.",
              },
              {
                icon: HeartHandshake,
                title: "Smooth Communication",
                desc: "Effortless application requests and direct landlord-tenant connections.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl my-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to find your nest?
        </h2>
        <p className="text-slate-300 max-w-lg mx-auto text-sm md:text-base">
          Explore hundreds of available properties or list your own property today!
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30"
          >
            Browse Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all border border-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}