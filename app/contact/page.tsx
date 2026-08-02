import React from "react";
import { Send, MessageSquare, HelpCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-4 pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
          Get in Touch
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          We’d Love to Hear From You
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions about rent payments, property listings, or account verification? Our team is here to assist you every step of the way.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6 mb-16">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-400">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>
          </div>
        </div>

        <form className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help?"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.99]"
          >
            Send Message
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {[
            {
              q: "How long does support take to respond?",
              a: "We usually respond within 2 to 24 hours on business days.",
            },
            {
              q: "How do I pay my rent securely?",
              a: "You can pay directly via Stripe in your Tenant Payments dashboard.",
            },
            {
              q: "Can I list my property as a landlord?",
              a: "Yes! Simply register a Landlord account and click 'Add Property'.",
            },
            {
              q: "What if I experience a payment failure?",
              a: "Check your card details or contact your bank. You can also reach out to us directly.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 space-y-1.5">
              <h4 className="text-sm font-bold text-slate-800">{faq.q}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}