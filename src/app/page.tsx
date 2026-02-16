"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

const PRODUCTS = [
  {
    id: "prod_1",
    name: "Quantum Nexus",
    price: "$2,499",
    category: "Workstations",
    specs: "32-Core CPU • 128GB RAM",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: "prod_2",
    name: "Nebula Pods Pro",
    price: "$299",
    category: "Audio",
    specs: "Spatial Audio • ANC 2.0",
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "prod_3",
    name: "Aether Watch Ultra",
    price: "$799",
    category: "Wearables",
    specs: "Titanium Case • Sapphire",
    color: "from-emerald-500/20 to-cyan-500/20",
    border: "group-hover:border-emerald-500/50"
  },
];

const FEATURES = [
  { icon: <Zap className="w-5 h-5 text-cyan-400" />, title: "Instant Delivery", desc: "Global fulfillment network." },
  { icon: <Shield className="w-5 h-5 text-purple-400" />, title: "Secure Checkout", desc: "Military-grade encryption." },
  { icon: <Globe className="w-5 h-5 text-blue-400" />, title: "Global Support", desc: "24/7 technical assistance." },
];

export default function Home() {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (prod: any) => {
    if (!isLoggedIn) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    addToCart({
      id: prod.id,
      name: prod.name,
      price: parseFloat(prod.price.replace('$', '').replace(',', ''))
    });
  };

  return (
    <div className="flex flex-col gap-24 pt-16 pb-32">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-4 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            New Spring Collection Now Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            Experience <br />
            <span className="text-gradient">Pure Innovation</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed text-balance">
            Discover the future of technology with our curated collection of high-performance devices, designed for those who demand excellence.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2 group">
              Explore Assets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full border border-white/10 transition-all hover:bg-slate-800 backdrop-blur-md">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Visual Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-cyan-500/5 blur-[140px] rounded-full -z-10" />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Editor's Choice</h2>
            <p className="text-slate-400">Our most popular hardware this month.</p>
          </div>
          <button className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((prod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group glass p-2 rounded-[2rem] transition-all duration-500 ${prod.border}`}
            >
              <div className={`aspect-square rounded-[1.8rem] mb-6 flex items-center justify-center overflow-hidden bg-gradient-to-br ${prod.color} border border-white/5 relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 font-black text-6xl rotate-12 select-none">
                  AURA
                </div>
                <div className="z-10 flex flex-col items-center gap-2">
                  <Star className="w-8 h-8 text-white/50 animate-pulse" />
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/40">{prod.category}</span>
                    <h3 className="text-xl font-bold leading-tight">{prod.name}</h3>
                    <span className="text-xs text-slate-500">{prod.specs}</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight">{prod.price}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(prod)}
                  className="w-full py-4 bg-slate-900 group-hover:bg-cyan-500 group-hover:text-slate-950 rounded-2xl font-bold transition-all border border-white/5 group-hover:border-transparent active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Auth Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Please login first to add items
              <a href="/auth" className="text-cyan-600 underline ml-2 hover:text-cyan-500 transition-colors">Sign In</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 w-full">
        <div className="relative glass p-12 md:p-20 rounded-[3rem] overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to join the <br /><span className="text-gradient">Eclipse Network?</span></h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10">Get early access to exclusive drops and high-performance equipment.</p>

          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button className="bg-white text-slate-950 font-bold px-8 rounded-2xl hover:scale-105 active:scale-95 transition-transform">
              Join
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
