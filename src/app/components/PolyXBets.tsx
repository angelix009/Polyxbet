"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";
import { ShieldCheck, Percent, Twitter, Activity, ArrowRight, TrendingUp, Users, DollarSign, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

// UI Components
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "premium" | "glass";
}

function Card({ children, className = "", variant = "default" }: CardProps) {
  const variants = {
    default: "bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 border-neutral-700/50 shadow-2xl hover:shadow-blue-500/10",
    premium: "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 shadow-2xl shadow-blue-500/20",
    glass: "bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl hover:bg-white/10"
  };
  return <div className={`rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] ${variants[variant]} ${className}`}>{children}</div>;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "glass" | "premium";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

function Button({ children, variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 shadow-xl",
    premium: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-purple-500/30"
  };
  const sizes = { sm: "px-4 py-2 text-sm rounded-xl", md: "px-6 py-3 text-base rounded-xl", lg: "px-8 py-4 text-lg rounded-2xl", xl: "px-12 py-5 text-xl rounded-2xl" };
  return (
    <button className={`font-semibold transition-all duration-300 flex flex-row items-center justify-center relative overflow-hidden group ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      <span className="relative z-10 flex flex-row items-center">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
}

// Assets
const logos = {
  X: "https://polyxnews.com/_assets/media/d1a33af179ca18d1582204e4211a4732.png",
  Poly: "https://polyxnews.com/_assets/media/10537a121f00f260488b7350434ff984.png",
  Combined: "https://i.postimg.cc/mt2CSs3N/a9ce3ae9-5d24-4460-8508-67e0f709e0b7.png"
};

const ToastContext = createContext<(msg: string) => void>(() => {});

// Main Component
export default function PolyXBetsSite() {
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 3200); return () => clearTimeout(t); }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-x-hidden scroll-smooth">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <AnimatePresence mode="wait">{loaded ? <MainSite /> : <Intro />}</AnimatePresence>
        
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.8 }} 
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-2xl shadow-2xl shadow-blue-500/30 text-white font-medium z-50"
          >
            <div className="flex items-center gap-2"><Sparkles size={16} />{toast}</div>
          </motion.div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

// Intro Animation
function Intro() {
  const [showCombo, setShowCombo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowCombo(true), 1200); return () => clearTimeout(t); }, []);
  
  const logoVariants = {
    init: (d: number) => ({ x: d * -200, opacity: 0, scale: 0.5, filter: "blur(10px)" }),
    mid: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
    out: { opacity: 0, scale: 0.8, filter: "blur(5px)", transition: { duration: 0.5 } }
  };
  
  return (
    <motion.div className="flex flex-col items-center justify-center h-screen gap-8 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex gap-32 items-center relative z-10">
        <AnimatePresence>
          {!showCombo && <motion.img key="x" src={logos.X} alt="X" custom={-1} variants={logoVariants} initial="init" animate="mid" exit="out" className="w-32 h-32 object-contain drop-shadow-2xl" />}
        </AnimatePresence>
        <AnimatePresence>
          {!showCombo && <motion.img key="poly" src={logos.Poly} alt="Polymarket" custom={1} variants={logoVariants} initial="init" animate="mid" exit="out" className="w-32 h-32 object-contain drop-shadow-2xl" />}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {showCombo && (
          <motion.img 
            src={logos.Combined} 
            alt="PolyXBets" 
            initial={{ scale: 0.2, opacity: 0, rotateY: 180 }} 
            animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
            transition={{ type: "spring", stiffness: 200, damping: 15 }} 
            className="w-48 h-48 object-contain drop-shadow-2xl" 
          />
        )}
      </AnimatePresence>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: showCombo ? 1 : 0, y: showCombo ? 0 : 30 }} className="text-center">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">PolyXBets</h1>
        <p className="text-xl text-gray-300 mt-4 font-medium">The Future of Prediction Markets</p>
      </motion.div>
    </motion.div>
  );
}

// Main Site
function MainSite() {
  return (
    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <NavBar />
      <Hero />
      <LiveMarkets />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </motion.main>
  );
}

// Navigation
function NavBar() {
  const toast = useContext(ToastContext);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 z-50 w-full py-4 px-6 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}
      initial={{ y: -100 }} animate={{ y: 0 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.a href="#hero" className="flex items-center gap-3 group" whileHover={{ scale: 1.05 }}>
          <Image src={logos.Combined} alt="logo" width={32} height={32} className="drop-shadow-lg" />
          <span className="font-black text-xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">PolyXBets</span>
        </motion.a>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[{ href: "#markets", label: "Markets" }, { href: "#features", label: "Features" }, { href: "#pricing", label: "Pricing" }].map((l, i) => (
            <motion.a key={l.href} href={l.href} className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group py-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.5 }}>
              {l.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <Button variant="glass" size="sm" onClick={() => toast("Coming soon!")}>Sign In</Button>
        </nav>
      </div>
    </motion.header>
  );
}

// Hero Section
function Hero() {
  const toast = useContext(ToastContext);
  
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/20 to-black/80" />
      
      <motion.div className="relative z-10 max-w-6xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
        <motion.span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-400/30 rounded-full text-blue-300 font-medium shadow-xl mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <Sparkles size={16} />Revolutionary Prediction Markets
        </motion.span>
        
        <motion.h1 className="text-6xl md:text-8xl font-black max-w-5xl leading-tight mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">Trade the Future</span>
          <br />
          <span className="text-white drop-shadow-2xl">Inside X</span>
        </motion.h1>
        
        <motion.p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          Experience the next generation of prediction markets with seamless X integration, real-time trading, and unprecedented transparency.
        </motion.p>
        
        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}>
          <Button variant="primary" size="xl" onClick={() => toast("Early access launching soon!")} className="group">
            <Zap size={20} className="mr-2 group-hover:animate-pulse" />
            Get Early Access
          </Button>
          <Button variant="glass" size="xl" onClick={() => toast("Documentation coming soon!")}>
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Chart Component
const genSeries = (b: number) => Array.from({ length: 15 }, (_, i) => ({ t: i, p: Math.max(5, Math.min(95, b += Math.round((Math.random() - 0.5) * 6))) }));
const chartData = [genSeries(32), genSeries(68), genSeries(25)];

interface MiniChartProps {
  data: { t: number; p: number }[];
  color?: string;
}

function MiniChart({ data, color = "#3b82f6" }: MiniChartProps) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={data}>
        <Tooltip formatter={(v: number) => [`${v}%`, 'Probability']} cursor={{ stroke: color }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: `1px solid ${color}`, borderRadius: '12px' }} />
        <Area type="monotone" dataKey="p" stroke={color} strokeWidth={3} fill={color} fillOpacity={0.2} />
        <XAxis dataKey="t" hide /><YAxis domain={[0, 100]} hide />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Live Markets
function LiveMarkets() {
  const toast = useContext(ToastContext);
  const markets = [
    { title: "Will OpenAI release GPT-5 before July 2025?", prob: 0.73, data: chartData[0], color: "#ef4444", volume: "$3.2M", change: "+18%" },
    { title: "Bitcoin reaches $150,000 by end of 2025?", prob: 0.41, data: chartData[1], color: "#22c55e", volume: "$5.7M", change: "+24%" },
    { title: "Apple announces AR glasses in 2025?", prob: 0.68, data: chartData[2], color: "#3b82f6", volume: "$2.1M", change: "+11%" }
  ];
  
  return (
    <section id="markets" className="py-32 px-6 relative">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
        <div className="text-center mb-16">
          <motion.h3 className="text-5xl md:text-6xl font-black text-white mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">Live Markets</span>
          </motion.h3>
          <motion.p className="text-xl text-gray-400 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Real-time prediction markets with live pricing and instant settlements
          </motion.p>
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {markets.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <Card variant="glass" className="h-full p-8 group hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-white leading-tight flex-1 mr-4">{m.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${m.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{m.change}</span>
                </div>
                <div className="text-sm text-gray-400 mb-4">Volume: <span className="text-white font-semibold">{m.volume}</span></div>
                
                <div className="space-y-6">
                  <MiniChart data={m.data} color={m.color} />
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl backdrop-blur-xl">
                    <span className="text-gray-300 font-medium">Probability</span>
                    <span className="text-2xl font-black text-white">{(m.prob * 100).toFixed(0)}%</span>
                  </div>
                  <Button className="w-full" variant="premium" onClick={() => toast(`Trading ${m.title.split('?')[0]} - Coming soon!`)}>
                    <TrendingUp size={18} className="mr-2" />
                    Trade Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Features
function Features() {
  const features = [
    { icon: ShieldCheck, title: "Blockchain Security", desc: "Military-grade encryption with Ethereum L2 settlement for absolute transparency.", color: "from-green-500 to-emerald-400" },
    { icon: Percent, title: "Ultra-Low Fees", desc: "Industry-leading 1.5% trading fee with zero settlement costs.", color: "from-blue-500 to-cyan-400" },
    { icon: Twitter, title: "X Integration", desc: "Seamlessly trade directly from your timeline. No context switching.", color: "from-purple-500 to-pink-400" },
    { icon: Activity, title: "Real-Time Data", desc: "Lightning-fast price updates every 100ms with professional infrastructure.", color: "from-orange-500 to-red-400" }
  ];
  
  return (
    <section id="features" className="py-32 px-6 relative">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h3 className="text-5xl md:text-6xl font-black text-white mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">Why PolyXBets?</span>
          </motion.h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }}>
              <Card variant="glass" className="p-8 h-full group hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${f.color} shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{f.title}</h4>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Pricing
function Pricing() {
  const toast = useContext(ToastContext);
  const tiers = [
    { name: "Starter", price: "$0", period: "forever", feats: ["Watch live markets", "Follow top traders", "Share insights"], icon: Users, popular: false },
    { name: "Pro Trader", price: "$29", period: "/month", feats: ["Everything in Starter", "Unlimited trades", "Advanced alerts", "API access"], icon: TrendingUp, popular: true },
    { name: "Institution", price: "Custom", period: "pricing", feats: ["Everything in Pro", "High-volume limits", "Dedicated support"], icon: DollarSign, popular: false }
  ];
  
  return (
    <section id="pricing" className="py-32 px-6 relative">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h3 className="text-5xl md:text-6xl font-black text-white mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">Choose Your Plan</span>
          </motion.h3>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="relative">
              {t.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"><span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl">Most Popular</span></div>}
              
              <Card variant={t.popular ? "premium" : "glass"} className={`p-8 h-full ${t.popular ? 'ring-2 ring-blue-500/50' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-2xl">
                    <t.icon size={28} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{t.name}</h4>
                </div>
                
                <div className="mb-8">
                  <span className="text-4xl font-black text-white">{t.price}</span>
                  <span className="text-gray-400 font-medium ml-2">{t.period}</span>
                </div>
                
                <div className="space-y-6">
                  <ul className="space-y-4">
                    {t.feats.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={t.popular ? "premium" : "glass"} size="lg" onClick={() => toast(`${t.name} plan selected - Coming soon!`)}>
                    {t.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// CTA
function CTA() {
  const toast = useContext(ToastContext);
  
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900" />
      
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h3 className="text-5xl md:text-7xl font-black text-white mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Ready to Shape <br /><span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">The Future?</span>
        </motion.h3>
        
        <motion.p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Join thousands of forward-thinking traders using PolyXBets to predict and profit from tomorrow&apos;s events.
        </motion.p>
        
        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Button variant="premium" size="xl" onClick={() => toast("Welcome to the waitlist!")} className="group">
            <Sparkles size={20} className="mr-2 group-hover:animate-spin" />
            Join the Revolution
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800/50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image src={logos.Combined} alt="logo" width={40} height={40} />
          <span className="font-black text-2xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">PolyXBets</span>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} PolyXBets. All rights reserved. Built with ❤️ for traders.</p>
      </div>
    </footer>
  );
}