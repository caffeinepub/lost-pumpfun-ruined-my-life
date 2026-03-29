import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  Check,
  ChevronRight,
  Copy,
  DollarSign,
  Droplets,
  ExternalLink,
  Heart,
  Menu,
  Skull,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetAllStories, useSubmitStory } from "./hooks/useQueries";

const CA = "n3ShrNZRCoMrw5Gww7rPMxVbDq3to3YwsGkDz19pump";
const JUPITER_URL = `https://jup.ag/swap/SOL-${CA}`;
const X_COMMUNITY = "https://x.com/i/communities/2035772242831790146";
const X_CHAT =
  "https://x.com/i/chat/group_join/g2036648113536962774/2vF8YAj87C";
const DEXSCREENER_URL = `https://dexscreener.com/solana/${CA}`;
const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${CA}`;

type DexData = {
  priceUsd: string;
  marketCap: number;
  liquidity: { usd: number };
  volume: { h24: number };
  priceChange: { h24: number };
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      data-ocid="ca.button"
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded hover:bg-primary/10 transition-colors text-primary"
      title="Copy CA"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function Marquee() {
  const text = `💀 PUMPFUN RUINED MY LIFE 💀 $LOST 💀 CA: ${CA} 💀 `;
  const repeated = Array(8).fill(text).join("");
  return (
    <div className="bg-primary text-primary-foreground overflow-hidden py-2.5 relative z-50">
      <div className="marquee-track text-sm font-bold tracking-widest">
        <span className="pr-4">{repeated}</span>
        <span className="pr-4">{repeated}</span>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "How to Buy", href: "#how-to-buy" },
  { label: "Chart", href: "#chart" },
  { label: "Community", href: "#community" },
  { label: "Stories", href: "#stories" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <a
          href="#home"
          className="font-display font-black text-xl text-primary tracking-tighter neon-green"
        >
          $LOST
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={X_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.community_link"
            className="text-xs bg-secondary border border-border hover:border-primary/50 text-foreground px-3 py-1.5 rounded transition-all"
          >
            𝕏 Community
          </a>
          <a
            href={X_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.chat_link"
            className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded font-bold hover:opacity-90 transition-all"
          >
            Join Chat
          </a>
        </div>

        <button
          type="button"
          data-ocid="nav.toggle"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={handleNavClick}
                  className="py-2.5 px-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <a
                  href={X_COMMUNITY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs bg-secondary border border-border py-2 rounded"
                >
                  𝕏 Community
                </a>
                <a
                  href={X_CHAT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs bg-primary text-primary-foreground py-2 rounded font-bold"
                >
                  Join Chat
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 grit-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <img
            src="/assets/uploads/img_4097-019d3790-6c15-7506-9bb3-a6f3ca700714-1.jpeg"
            alt="$LOST Logo"
            className="relative w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl border-2 border-primary/30 shadow-neon"
          />
        </div>

        <h1
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-4 glitch-text neon-green"
          data-text="$LOST"
        >
          $LOST
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
          For every soul{" "}
          <span className="text-destructive font-bold">rekt</span> by Pump.fun.
          <br />
          <span className="text-primary font-semibold">
            Unite. Rise. Get $LOST.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <a
            href={JUPITER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
          >
            <Button className="bg-primary text-primary-foreground font-bold px-8 py-3 text-base h-auto shadow-neon hover:opacity-90 hover:shadow-neon transition-all">
              Buy on Jupiter <ChevronRight size={16} className="ml-1" />
            </Button>
          </a>
          <a
            href={X_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
          >
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 text-base h-auto font-bold transition-all"
            >
              Join Community <ExternalLink size={14} className="ml-1.5" />
            </Button>
          </a>
        </div>

        <div
          data-ocid="hero.card"
          className="flex items-center gap-2 bg-card border border-primary/20 rounded-lg px-4 py-3 max-w-full"
        >
          <span className="text-xs text-muted-foreground shrink-0 font-mono">
            CA:
          </span>
          <span className="text-xs font-mono text-primary truncate">{CA}</span>
          <CopyButton text={CA} />
        </div>
      </motion.div>
    </section>
  );
}

function Lore() {
  return (
    <section id="lore" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/uploads/img_4094-019d3790-8060-7418-b655-26dc4335cef4-9.jpeg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Skull className="text-primary" size={28} />
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
              The <span className="neon-green">Lore</span>
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
              <span className="text-primary font-bold">$LOST</span> captures the
              collective regret of Pump.fun degens rekt by rugs and scams. 💀
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
              Born from viral X rants like{" "}
              <span className="text-destructive font-bold italic">
                "Pumpfun ruined my life"
              </span>{" "}
              after traders ape into Solana's easy-launch memecoin hell, losing
              stacks.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              It unites{" "}
              <span className="text-primary font-semibold">"lost souls"</span>{" "}
              in a 0% tax, locked LP token — fair play for the traumatized. 😂
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {["0% Tax", "🔒 Locked LP", "Fair Launch"].map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 border border-primary/30 text-primary text-sm font-bold px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className="bg-destructive/10 border border-destructive/30 text-destructive text-sm font-bold px-4 py-1.5 rounded-full">
                No Rugs
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function Tokenomics() {
  const [data, setData] = useState<DexData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(DEXSCREENER_API);
      const json = await res.json();
      if (json.pairs && json.pairs.length > 0) {
        setData(json.pairs[0]);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const stats = [
    {
      label: "Price",
      value: data ? `$${Number.parseFloat(data.priceUsd).toFixed(8)}` : "—",
      icon: DollarSign,
      change: data?.priceChange?.h24,
    },
    {
      label: "Market Cap",
      value: data ? fmt(data.marketCap) : "—",
      icon: TrendingUp,
      change: null,
    },
    {
      label: "Liquidity",
      value: data ? fmt(data.liquidity.usd) : "—",
      icon: Droplets,
      change: null,
    },
    {
      label: "24h Volume",
      value: data ? fmt(data.volume.h24) : "—",
      icon: BarChart3,
      change: null,
    },
  ];

  const staticStats = [
    { label: "Tax", value: "0%" },
    { label: "LP Status", value: "🔒 Locked" },
    { label: "Launch", value: "Fair" },
    { label: "Total Supply", value: "1B" },
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            <span className="neon-green">Token</span>omics
          </h2>
          <p className="text-muted-foreground">
            Live data from DexScreener • Updates every 30s
          </p>
        </motion.div>

        {loading ? (
          <div
            data-ocid="tokenomics.loading_state"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {["a", "b", "c", "d"].map((k) => (
              <div
                key={k}
                className="bg-card border border-border rounded-xl p-6 animate-pulse h-28"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => {
              const Icon = s.icon;
              const isPositive = s.change != null && s.change > 0;
              const isNegative = s.change != null && s.change < 0;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  data-ocid="tokenomics.card"
                  className="bg-card border border-border hover:border-primary/40 rounded-xl p-5 transition-all neon-border group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={16} className="text-primary" />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                  <div className="font-display font-black text-xl md:text-2xl text-foreground">
                    {s.value}
                  </div>
                  {s.change != null && (
                    <div
                      className={`text-xs mt-1 font-bold ${isPositive ? "text-primary" : isNegative ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {isPositive ? "+" : ""}
                      {s.change.toFixed(2)}% 24h
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {staticStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                {s.label}
              </div>
              <div className="font-display font-black text-xl text-primary">
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section
      id="mission"
      className="py-24 px-4 bg-primary/5 border-y border-primary/20 grit-overlay relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-destructive/10 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Skull className="text-primary mx-auto mb-6" size={40} />
          <h2 className="font-display font-black text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-foreground">
            $LOST WAS CREATED FOR THE{" "}
            <span className="text-primary">PEOPLE WHO TRADED</span> ON PUMP.FUN,
            GOT CAUGHT IN{" "}
            <span className="text-destructive">SCAMS, LOST MONEY</span>, AND
            WERE LEFT FEELING{" "}
            <span className="text-primary">LOST, FRUSTRATED,</span> AND FULL OF
            REGRET.
          </h2>
          <div className="mt-10 pt-8 border-t border-primary/20">
            <p className="text-lg md:text-xl font-bold text-foreground/90 leading-relaxed">
              WE'RE HERE TO CHANGE THAT BY BUILDING SOMETHING{" "}
              <span className="text-primary">
                HONEST, TRANSPARENT, AND FAIR
              </span>{" "}
              — A PROJECT WHERE{" "}
              <span className="text-primary">EVERYONE GETS A REAL CHANCE.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const buySteps = [
  {
    step: 1,
    title: "Get a Solana Wallet",
    desc: "Download Phantom or Solflare wallet from their official sites. Create your wallet and back up your seed phrase.",
    icon: "👻",
  },
  {
    step: 2,
    title: "Buy SOL on an Exchange",
    desc: "Purchase SOL on Coinbase, Binance, or any major exchange. Transfer SOL to your Phantom/Solflare wallet.",
    icon: "💰",
  },
  {
    step: 3,
    title: "Go to Jupiter",
    desc: "Visit jup.ag and connect your wallet. Jupiter is the #1 Solana DEX aggregator for best prices.",
    icon: "🪐",
  },
  {
    step: 4,
    title: "Swap SOL for $LOST",
    desc: `Paste the CA: ${CA.slice(0, 20)}... and swap SOL for $LOST. Welcome to the lost souls club. 💀`,
    icon: "💀",
  },
];

function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            How to <span className="neon-green">Buy</span>
          </h2>
          <p className="text-muted-foreground">
            4 steps to join the lost souls
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {buySteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-ocid={`howto.item.${s.step}`}
              className="bg-card border border-border hover:border-primary/40 rounded-xl p-6 flex gap-4 transition-all"
            >
              <div className="text-3xl shrink-0">{s.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    STEP {s.step}
                  </span>
                  <h3 className="font-display font-bold text-base">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={JUPITER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="howto.primary_button"
          >
            <Button className="bg-primary text-primary-foreground font-bold px-10 py-3 text-base h-auto shadow-neon hover:opacity-90">
              Buy $LOST on Jupiter 🚀
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function JupiterSwap() {
  return (
    <section id="swap" className="py-16 px-4 bg-card border-y border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-2">
            Swap <span className="neon-green">Directly</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Powered by Jupiter — Best rates on Solana
          </p>
        </motion.div>
        <div className="rounded-xl overflow-hidden border border-primary/20 shadow-neon">
          <iframe
            src={`https://jup.ag/swap/SOL-${CA}?embedded=true`}
            height="600"
            width="100%"
            style={{ border: "none", display: "block" }}
            title="Jupiter Swap"
          />
        </div>
      </div>
    </section>
  );
}

function Chart() {
  return (
    <section id="chart" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-2">
            Live <span className="neon-green">Chart</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Real-time price action from DexScreener
          </p>
        </motion.div>
        <div className="rounded-xl overflow-hidden border border-primary/20 shadow-neon">
          <iframe
            src={`https://dexscreener.com/solana/${CA}?embed=1&theme=dark`}
            height="600"
            width="100%"
            style={{ border: "none", display: "block" }}
            title="DEX Screener Chart"
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href={DEXSCREENER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="chart.link"
            className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
          >
            View full chart on DexScreener <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

const communityTweets = [
  {
    id: "t1",
    img: "/assets/uploads/img_4093-019d3790-757b-71d4-b1f2-3da80a1106ee-3.jpeg",
    alt: "Moby whale holders tweet",
  },
  {
    id: "t2",
    img: "/assets/uploads/img_4090-019d3790-7b35-751e-af75-5ffadcadc988-4.jpeg",
    alt: "Quinbtc Eat this dip tweet",
  },
  {
    id: "t3",
    img: "/assets/uploads/img_4092-019d3790-7b36-700c-9a38-f3c3f8ac9610-5.jpeg",
    alt: "Quinbtc Raid tweet",
  },
  {
    id: "t4",
    img: "/assets/uploads/img_4091-019d3790-7c0a-7722-8d13-cc4b87e6839f-6.jpeg",
    alt: "Officer George rug dream tweet",
  },
  {
    id: "t5",
    img: "/assets/uploads/img_4096-019d3790-7c3d-718c-88cc-bfa19089bbbd-7.jpeg",
    alt: "Quinbtc Lost & Found raid tweet",
  },
  {
    id: "t6",
    img: "/assets/uploads/img_4095-019d3790-7e2f-77ab-a0bc-25cc5de27a2b-8.jpeg",
    alt: "Venom WE NEED YOU tweet",
  },
];

function Community() {
  return (
    <section
      id="community"
      className="py-20 px-4 bg-card border-y border-border"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            The Movement is <span className="neon-green">Real</span>
          </h2>
          <p className="text-xl font-bold text-destructive mb-2">
            26M Views Can't Be Wrong
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The community is out here spreading the word. These aren't bots —
            these are real people who got rekt and found their tribe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {communityTweets.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              data-ocid={`community.item.${i + 1}`}
              className="rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all group cursor-pointer shadow-sm hover:shadow-neon"
            >
              <img
                src={t.img}
                alt={t.alt}
                className="w-full h-auto object-contain bg-white group-hover:scale-[1.01] transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <a
            href={X_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="community.primary_button"
          >
            <Button className="bg-primary text-primary-foreground font-bold px-8 py-3 h-auto shadow-neon hover:opacity-90">
              Join X Community
            </Button>
          </a>
          <a
            href={X_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="community.secondary_button"
          >
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 h-auto font-bold"
            >
              Join Group Chat
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const [xHandle, setXHandle] = useState("");
  const [story, setStory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data: stories, isLoading } = useGetAllStories();
  const { mutate: submitStory, isPending } = useSubmitStory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!xHandle.trim() || !story.trim()) {
      toast.error("Please fill in both fields");
      return;
    }
    submitStory(
      { xHandle: xHandle.trim(), story: story.trim() },
      {
        onSuccess: () => {
          setSubmitted(true);
          setXHandle("");
          setStory("");
          toast.success("Story submitted! 💀");
          setTimeout(() => setSubmitted(false), 3000);
        },
        onError: () => toast.error("Failed to submit story"),
      },
    );
  };

  return (
    <section id="stories" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            Tell Your <span className="text-destructive">Story</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Got rekt by Pump.fun? You're not alone. Share your story and join
            the lost souls family.
          </p>
        </motion.div>

        <div
          data-ocid="stories.panel"
          className="bg-card border border-border rounded-xl p-6 mb-10"
        >
          <h3 className="font-display font-bold text-lg mb-6 text-primary">
            Share Your Experience
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="xhandle"
                className="block text-sm font-medium text-muted-foreground mb-1.5"
              >
                X Handle
              </label>
              <Input
                id="xhandle"
                data-ocid="stories.input"
                placeholder="@yourhandle"
                value={xHandle}
                onChange={(e) => setXHandle(e.target.value)}
                className="bg-background border-border focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="storybody"
                className="block text-sm font-medium text-muted-foreground mb-1.5"
              >
                Your Story
              </label>
              <Textarea
                id="storybody"
                data-ocid="stories.textarea"
                placeholder="Tell us how Pump.fun ruined your life... or how $LOST gave you hope..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={4}
                className="bg-background border-border focus:border-primary resize-none"
              />
            </div>
            <Button
              type="submit"
              data-ocid="stories.submit_button"
              disabled={isPending}
              className="w-full bg-destructive text-destructive-foreground font-bold py-3 h-auto hover:opacity-90 transition-all"
            >
              {isPending ? "Submitting..." : "Submit My Story 💀"}
            </Button>
            {submitted && (
              <div
                data-ocid="stories.success_state"
                className="text-center text-primary text-sm font-bold py-2"
              >
                ✅ Your story has been added to the wall of the lost.
              </div>
            )}
          </form>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
            <Skull size={20} className="text-primary" />
            Lost Souls Wall
          </h3>
          {isLoading ? (
            <div data-ocid="stories.loading_state" className="space-y-3">
              {["s1", "s2", "s3"].map((k) => (
                <div
                  key={k}
                  className="bg-card border border-border rounded-xl p-5 animate-pulse h-24"
                />
              ))}
            </div>
          ) : stories && stories.length > 0 ? (
            <div className="space-y-4">
              {stories.map((s, i) => (
                <motion.div
                  key={String(s.timestamp)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  data-ocid={`stories.item.${i + 1}`}
                  className="bg-card border border-border hover:border-primary/30 rounded-xl p-5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary font-bold text-sm">
                      {s.xHandle}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        Number(s.timestamp) / 1_000_000,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {s.story}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              data-ocid="stories.empty_state"
              className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-xl"
            >
              <Skull size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">
                No stories yet. Be the first lost soul.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const roadmapPhases = [
  {
    phase: 1,
    title: "Launch & Community Building",
    status: "active",
    items: [
      "Fair launch on Pump.fun",
      "LP locked permanently",
      "Community growth to 1k holders",
      "Website & socials live",
    ],
  },
  {
    phase: 2,
    title: "Exchange Listings & Marketing",
    status: "upcoming",
    items: [
      "CEX listings (MEXC, Gate.io)",
      "Viral marketing campaigns",
      "10k holders milestone",
      "Influencer partnerships",
    ],
  },
  {
    phase: 3,
    title: "Ecosystem & Utility",
    status: "upcoming",
    items: [
      "Lost Souls NFT collection",
      "Staking for lost souls",
      "Governance voting",
      "Merch store",
    ],
  },
  {
    phase: 4,
    title: "Moon 🌕",
    status: "upcoming",
    items: [
      "100k holders",
      "Top memecoin status",
      "Pumpfun never again",
      "The lost have been found",
    ],
  },
];

function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            Road<span className="neon-green">map</span>
          </h2>
          <p className="text-muted-foreground">The path from lost to found</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent hidden sm:block" />
          <div className="space-y-8">
            {roadmapPhases.map((p, i) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                data-ocid={`roadmap.item.${p.phase}`}
                className={`relative flex flex-col sm:flex-row gap-4 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 z-10 w-10 h-10 rounded-full items-center justify-center border-2 border-primary bg-background font-display font-black text-primary text-sm">
                  {p.phase}
                </div>
                <div
                  className={`sm:w-1/2 ${i % 2 === 0 ? "sm:pr-16" : "sm:pl-16"}`}
                >
                  <div
                    className={`bg-background border ${p.status === "active" ? "border-primary shadow-neon" : "border-border"} rounded-xl p-5`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Phase {p.phase}
                      </span>
                      {p.status === "active" && (
                        <span className="text-xs bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3">
                      {p.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {p.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5 shrink-0">
                            ▸
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="sm:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What is $LOST?",
    a: "$LOST is the memecoin for everyone rekt by Pump.fun rugs and scams. It's a community-owned token that unites the traumatized degens of Solana's memecoin graveyard.",
  },
  {
    q: "Is LP locked?",
    a: "Yes. LP is fully locked, permanently. 0% tax, no hidden fees. No dev wallet shenanigans. This is a fair, community-owned project.",
  },
  {
    q: "Where can I buy $LOST?",
    a: `On Jupiter using Solana. Go to jup.ag and paste the CA: ${CA}`,
  },
  {
    q: "Is this a rug?",
    a: "No. LP is locked. Community-owned. No dev wallet. We are the people who got rugged — we would never do that to our own.",
  },
  {
    q: "How many holders?",
    a: "Live holder data is shown in the Tokenomics section above. Growing every day as more lost souls find their way home.",
  },
  {
    q: "What's the total supply?",
    a: "1,000,000,000 (1 billion) tokens. Fair launch. No presale. No team allocation. 100% community.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            <span className="neon-green">FAQ</span>
          </h2>
          <p className="text-muted-foreground">
            Answers for the confused and the rekt
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              data-ocid={`faq.item.${i + 1}`}
              className="bg-card border border-border hover:border-primary/30 rounded-xl px-5 transition-all"
            >
              <AccordionTrigger className="font-display font-bold text-base hover:no-underline hover:text-primary py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="bg-card border-t border-border py-12 px-4 grit-overlay">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="font-display font-black text-3xl neon-green mb-2">
            $LOST
          </div>
          <p className="text-muted-foreground text-sm">
            For the rekt, by the rekt.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 bg-background border border-primary/20 rounded-lg px-4 py-3 w-fit mx-auto mb-8">
          <span className="text-xs text-muted-foreground shrink-0 font-mono">
            CA:
          </span>
          <span className="text-xs font-mono text-primary truncate max-w-[220px] sm:max-w-none">
            {CA}
          </span>
          <CopyButton text={CA} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { href: X_COMMUNITY, label: "𝕏 Community" },
            { href: X_CHAT, label: "𝕏 Chat" },
            { href: DEXSCREENER_URL, label: "DexScreener" },
            { href: JUPITER_URL, label: "Jupiter" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.link"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              {link.label} <ExternalLink size={11} />
            </a>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground border-t border-border pt-6 space-y-2">
          <p>
            ⚠️ Not financial advice. For entertainment purposes only. Always
            DYOR.
          </p>
          <p>
            © {year}. Built with{" "}
            <Heart size={12} className="inline text-destructive" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Marquee />
      <Navbar />
      <main>
        <Hero />
        <Lore />
        <Tokenomics />
        <Mission />
        <HowToBuy />
        <JupiterSwap />
        <Chart />
        <Community />
        <Stories />
        <Roadmap />
        <FAQ />
      </main>
      <Marquee />
      <Footer />
    </div>
  );
}
