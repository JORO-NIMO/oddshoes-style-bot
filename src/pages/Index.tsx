import { motion } from "framer-motion";
import { ArrowRight, Rocket, Diamond, Bot, Zap, Users, Globe } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";

const stats = [
  { value: "100+", label: "MVPs Shipped" },
  { value: "15+", label: "Products Live" },
  { value: "5-14", label: "Days to Launch" },
  { value: "50%", label: "To His Kingdom" },
];

const services = [
  {
    icon: Rocket,
    name: "Genesis Build",
    desc: "5-day MVP sprint. Single feature, production-ready, launched Friday.",
    price: "£2,500",
  },
  {
    icon: Diamond,
    name: "Kingdom Builder",
    desc: "Complete system with brand, multi-feature app & 6 months fractional CTO.",
    price: "Custom",
  },
  {
    icon: Bot,
    name: "AI & Automation",
    desc: "Custom AI agents, workflow automation, and intelligent deployments.",
    price: "Custom",
  },
];

const capabilities = [
  { icon: Zap, text: "MVP Development" },
  { icon: Globe, text: "Web & Mobile Apps" },
  { icon: Users, text: "Brand & Identity" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-chat text-chat-foreground">
      {/* Nav */}
      <nav className="border-b border-chat-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xs font-bold">
              OS
            </div>
            <span className="font-display text-lg text-chat-foreground">
              Odd<span className="italic">Shoes</span>
            </span>
          </div>
          <a
            href="https://www.oddshoes.dev/planner"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Launch Your MVP <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-chat-border bg-chat-bot py-2">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="mx-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              100+ MVPs shipped • 15+ products live • 5-14 days to launch • 50% to His Kingdom
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl leading-tight md:text-7xl"
        >
          A <em className="text-primary">higher</em> calling.
          <br />
          A better startup.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          We build MVPs, craft brands, and accelerate growth for founders who
          want to honour God with their business.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://www.oddshoes.dev/planner"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Launch Your MVP
          </a>
          <a
            href="https://www.oddshoes.dev/work"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-chat-border px-6 py-3 font-medium text-chat-foreground transition-colors hover:border-primary hover:text-primary"
          >
            See Our Work
          </a>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-chat-border bg-chat-bot">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center px-4 py-10">
              <span className="font-display text-3xl text-primary">{s.value}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-12 text-center font-display text-3xl md:text-4xl">
          Services we Offer
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <motion.div
              key={s.name}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-chat-border bg-chat-bot p-6 transition-colors hover:border-primary/40"
            >
              <s.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <p className="mt-4 text-sm font-semibold text-primary">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-chat-border bg-chat-bot py-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6">
          {capabilities.map((c) => (
            <div key={c.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <c.icon className="h-4 w-4 text-primary" />
              {c.text}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl">
          Ready to build something that <em className="text-primary">matters</em>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Start with our project planner or chat with our AI assistant in the bottom right.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.oddshoes.dev/planner"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start the Planner
          </a>
          <a
            href="https://calendly.com/builtbyoddshoes"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-chat-border px-6 py-3 font-medium text-chat-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-chat-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} OddShoes. Building for His Kingdom.
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
