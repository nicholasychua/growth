"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Sparkles, Wand2, Zap, Check, ArrowRight, Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Sparkles,
    title: "Creativity",
    description:
      "Generate ideas and overcome writer's block with AI-powered inspiration.",
  },
  {
    icon: Wand2,
    title: "Editing",
    description:
      "Improve grammar, style, and clarity with real-time AI suggestions.",
  },
  {
    icon: Zap,
    title: "Productivity",
    description:
      "Streamline your workflow and write faster with intelligent automation.",
  },
];

const platformTabs = [
  {
    title: "Neural Content Generation",
    heading:
      "We\u2019re on a mission to revolutionize the writing process with cutting-edge AI technology.",
    body: "By blending creativity with machine intelligence, we empower users to write faster, refine their work with precision, and bring their ideas to life effortlessly.",
    cta: "Leverage cutting-edge AI to generate high-quality, context-aware text instantly.",
  },
  {
    title: "Adaptive Language Optimization",
    heading:
      "Our mission is to transform the writing experience with state-of-the-art AI technology.",
    body: "By seamlessly merging human creativity with advanced machine intelligence, we enable users to write more efficiently, enhance their work with precision, and bring their ideas to life with ease.",
    cta: "Real-time language refinement that adapts to your unique voice and style.",
  },
  {
    title: "Automated Workflow Enhancement",
    heading:
      "Growth transforms writing by blending AI with human creativity, enabling users to generate and refine content effortlessly.",
    body: "Our platform enhances grammar, style, and readability in real time. With automated structuring and workflow optimization, Growth makes writing faster, smoother, and more intuitive, helping users craft polished content with ease.",
    cta: "Automate repetitive tasks and focus on what matters\u2014your content.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    features: [
      "Basic AI writing tools",
      "Grammar and style suggestions",
      "Limited word count per month",
      "Access to core features",
    ],
  },
  {
    name: "Pro",
    monthly: 19.99,
    annual: 16.99,
    popular: true,
    features: [
      "Unlimited AI writing and editing",
      "Advanced grammar and style enhancements",
      "Custom tone and style adjustments",
      "Priority support and early feature access",
    ],
  },
  {
    name: "Enterprise",
    monthly: 39.99,
    annual: 33.99,
    features: [
      "Everything in Pro plus team collaboration tools",
      "Custom AI training and brand-specific style guides",
      "API access and workflow automation",
      "Dedicated account manager and enterprise support",
    ],
  },
];

const testimonials = [
  {
    quote:
      "I\u2019ve been using Growth for several months now, and I can confidently say it has transformed my writing process. The AI-powered prompts and suggestions are incredibly insightful and tailored to my specific interests, sparking new ideas and helping me overcome creative hurdles.",
    name: "Emma",
    role: "Content Creator",
    gradient: "from-rose-400 to-orange-300",
  },
  {
    quote:
      "As a novice writer, Growth has been an invaluable learning tool. I\u2019m grateful for the guidance it provides on my writing journey.",
    name: "Gemma",
    role: "Novelist",
    gradient: "from-violet-400 to-purple-300",
  },
  {
    quote:
      "As a marketing professional, I rely on clear and compelling writing to engage my audience. The editing tools have elevated my copywriting skills.",
    name: "John",
    role: "Marketing Director",
    gradient: "from-sky-400 to-cyan-300",
  },
];

const footerLinks = [
  { label: "home", href: "/" },
  { label: "features", href: "#features" },
  { label: "platform", href: "#platform" },
  { label: "company", href: "#" },
  { label: "our story", href: "#story" },
  { label: "contact us", href: "https://x.com/nicholasychua" },
];

/* ------------------------------------------------------------------ */
/*  Utility Components                                                 */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] text-white/50 backdrop-blur-sm">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-white/[0.06] transition-all duration-300 ${
        scrolled ? "bg-[#0a0812]/90 backdrop-blur-xl" : "bg-[#0a0812]"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:max-w-none lg:px-10 xl:px-14">
        <Link href="/" className="text-[17px] font-bold tracking-tight">
          Growth.
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {["Home", "Platform", "Company", "Blog"].map((l) => (
            <a
              key={l}
              href={l === "Home" ? "#" : `#${l.toLowerCase()}`}
              className="text-sm text-white hover:text-white/70 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md border border-white/15 px-5 py-2 text-[13px] font-mono font-normal text-white/80 hover:text-white hover:border-white/25 transition-all uppercase tracking-wide"
          >
            Open
          </Link>
          <a
            href="https://x.com/nicholasychua"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white px-5 py-2 text-[13px] font-mono font-normal text-[#060606] hover:bg-white/90 transition-colors uppercase tracking-wide"
          >
            contact us
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#060606]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-3">
              {["Home", "Platform", "Company", "Blog"].map((l) => (
                <a
                  key={l}
                  href={l === "Home" ? "#" : `#${l.toLowerCase()}`}
                  className="block text-sm text-white/50 hover:text-white transition-colors py-1"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Link
                  href="/login"
                  className="rounded-md border border-white/15 px-5 py-2 text-sm font-mono font-normal text-white/80 uppercase tracking-wide"
                >
                  Open
                </Link>
                <a
                  href="https://x.com/nicholasychua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-white px-5 py-2 text-sm font-mono font-normal text-[#060606] uppercase tracking-wide"
                >
                  contact us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1200 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const x = 100 + i * 38;
        return (
          <line
            key={`l-${i}`}
            x1={x}
            y1={700}
            x2={x + 180}
            y2={0}
            stroke="white"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        );
      })}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = 1100 - i * 38;
        return (
          <line
            key={`r-${i}`}
            x1={x}
            y1={700}
            x2={x - 180}
            y2={0}
            stroke="white"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
}

function HeroSection() {
  return (
    <Reveal className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 text-center">
      <HeroLines />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060606] to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060606] to-transparent z-[1]" />

      <div className="relative z-[2] mx-auto max-w-[1200px] px-6">
        <Badge>N1 Content Growth Platform</Badge>

        <h1 className="mt-8 text-[2.25rem] font-normal tracking-[-0.01em] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.2] pb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          AI-powered
          <br />
          writing assistant.
        </h1>

        <p className="mx-auto mt-6 max-w-[520px] text-[15px] text-white/40 leading-relaxed md:text-base">
          Elevate your writing with Growth: Your AI-powered writing partner for
          creativity, productivity, and precision.
        </p>

        <div className="mt-10">
          <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-7 py-3 text-[13px] font-mono font-normal text-white/60 uppercase tracking-wide cursor-default">
            Coming Soon
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

function FeaturesSection() {
  return (
    <Reveal className="py-24 md:py-32" id="features">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-16">
          <h2 className="text-[2rem] font-normal tracking-[-0.01em] md:text-[3.25rem] leading-[1.1]">
            Empower your writing with AI.
          </h2>
          <p className="mt-4 text-white/35 text-[13px] uppercase tracking-[0.15em] font-medium">
            with Growth you&apos;ll get
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 pt-10 pb-10 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <Icon
                className="h-16 w-16 text-white/[0.15] mb-16"
                strokeWidth={0.75}
              />
              <h3 className="text-3xl font-normal mb-2">{title}</h3>
              <p className="text-[13px] text-white/40 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform                                                           */
/* ------------------------------------------------------------------ */

function PlatformSection() {
  const [tab, setTab] = useState(0);
  const current = platformTabs[tab];

  return (
    <Reveal className="py-24 md:py-32" id="platform">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-6">
          <p className="text-[13px] text-white/35 uppercase tracking-[0.15em] font-medium mb-4">
            Platform
          </p>
          <h2 className="text-[2rem] font-normal tracking-[-0.01em] md:text-[3.25rem] leading-[1.1]">
            Our features.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[13px] text-white/45 leading-relaxed">
            Designed to help you on your data security mission, our modules can
            be combined to deliver the newest innovations in data security.
          </p>
          <div className="mt-7">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[13px] font-mono font-normal text-[#060606] hover:bg-white/95 transition-all uppercase tracking-wide"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-2 md:p-2.5">
          <div className="flex gap-1.5 mb-2">
            {platformTabs.map((t, i) => (
              <button
                key={t.title}
                onClick={() => setTab(i)}
                className={`flex-1 rounded-xl px-3 py-3 text-[12px] md:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                  tab === i
                    ? "bg-white/[0.07] text-white"
                    : "text-white/35 hover:text-white/55 hover:bg-white/[0.025]"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl bg-white/[0.025] p-8 md:p-12 min-h-[280px]"
            >
              <div className="max-w-[640px]">
                <p className="text-[11px] text-white/25 uppercase tracking-[0.15em] font-medium mb-6">
                  {current.title}
                </p>
                <h3 className="text-xl font-normal leading-relaxed md:text-2xl">
                  {current.heading}
                </h3>
                <p className="mt-4 text-[13px] text-white/45 leading-relaxed">
                  {current.body}
                </p>
                <p className="mt-6 text-[13px] text-white/60 font-medium">
                  {current.cta}
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-2 text-[13px] font-mono font-normal text-white/70 hover:border-white/25 hover:text-white transition-all uppercase tracking-wide"
                >
                  Open
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <Reveal className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-16">
          <h2 className="text-[2rem] font-normal tracking-[-0.01em] md:text-[3.25rem] leading-[1.1]">
            Membership pricing
          </h2>
          <p className="mt-3 text-white/45 text-[15px]">
            Find the right plan for you.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                !annual
                  ? "bg-white text-[#060606]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                annual
                  ? "bg-white text-[#060606]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              annually
              <span className="ml-1.5 text-[11px] text-purple-400 font-medium">
                [save 15%]
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const price = annual ? plan.annual : plan.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`rounded-2xl border p-7 transition-all duration-300 ${
                  plan.popular
                    ? "border-purple-500/25 bg-purple-500/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <p className="text-[13px] text-white/45 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-normal tracking-tight">
                    ${price === 0 ? "0" : price.toFixed(2)}
                  </span>
                  <span className="text-[13px] text-white/30">/month</span>
                </div>

                <p className="text-[11px] text-white/25 uppercase tracking-[0.12em] font-medium mb-4">
                  Everything included:
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] text-white/55"
                    >
                      <Check
                        className="h-4 w-4 text-purple-400 mt-[1px] shrink-0"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`block w-full rounded-full py-2.5 text-center text-[13px] font-mono font-normal uppercase tracking-wide transition-all duration-200 ${
                    plan.popular
                      ? "bg-white text-[#060606] hover:bg-white/90"
                      : "border border-white/15 text-white/70 hover:border-white/25 hover:text-white"
                  }`}
                >
                  Sign Up
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const row = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <Reveal className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 mb-14">
        <h2 className="text-center text-[2rem] font-normal tracking-[-0.01em] md:text-[3.25rem] leading-[1.1]">
          Client&apos;s success stories.
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <div
              key={i}
              className="w-[360px] shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.1]"
            >
              <p className="text-[13px] text-white/55 leading-relaxed mb-6 line-clamp-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[13px] font-semibold`}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-medium">{t.name}</p>
                  <p className="text-[11px] text-white/35">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#060606] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#060606] to-transparent" />
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <Reveal className="py-24 md:py-32 text-center relative overflow-hidden">
      <div className="relative mx-auto max-w-[1200px] px-6">
        <Badge>N1 Content Growth Platform</Badge>

        <h2 className="mt-8 text-[2rem] font-normal tracking-[-0.01em] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          (re)start your writing journey.
        </h2>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-mono font-normal uppercase tracking-wide text-[#060606] shadow-lg shadow-white/5 hover:shadow-white/10 hover:bg-white/95 transition-all"
          >
            Sign Up
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Founder Story                                                      */
/* ------------------------------------------------------------------ */

function FounderStorySection() {
  return (
    <Reveal className="py-24 md:py-32" id="story">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] items-start">
          {/* Left — intro */}
          <motion.div
            className="flex flex-col items-center md:items-start md:sticky md:top-32"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg font-semibold text-white mb-5">
              N
            </div>
            <h2 className="text-[1.5rem] md:text-[1.75rem] font-normal tracking-[-0.01em] leading-[1.2] text-center md:text-left">
              hey! it&apos;s{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium">
                nicholas
              </span>
            </h2>
            <p className="text-[13px] text-white/30 mt-1.5 text-center md:text-left">
              founder of Growth
            </p>

            <Link
              href="/dashboard"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-mono font-normal uppercase tracking-wide text-[#060606] shadow-lg shadow-white/5 hover:shadow-white/10 hover:bg-white/95 transition-all"
            >
              Try it for free
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Right — story */}
          <motion.div
            className="grid gap-x-6 gap-y-5 sm:grid-cols-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[15px] leading-relaxed text-white/45">
              last year i was spending{" "}
              <span className="font-semibold text-white/80">
                over 1 hour every single day
              </span>{" "}
              writing the same content across all platforms. going from one doc
              to another, reformatting, rewriting... it sucked.
            </p>
            <p className="text-[15px] leading-relaxed text-white/45">
              the existing tools were{" "}
              <span className="font-semibold text-white/80">
                way too expensive
              </span>{" "}
              and{" "}
              <span className="font-semibold text-white/80">
                way too complex
              </span>{" "}
              for what i needed. i wanted something{" "}
              <span className="font-semibold text-white/80">
                lightweight, simple, and affordable
              </span>
              .
            </p>
            <p className="text-[15px] leading-relaxed text-white/45">
              so i built it myself — and that&apos;s how Growth was born. turns
              out{" "}
              <span className="font-semibold text-white/80">
                thousands of others
              </span>{" "}
              felt the exact same way, so i turned it into a product.
            </p>
            <p className="text-[15px] leading-relaxed text-white/45">
              since then i&apos;ve used Growth daily and it&apos;s helped me
              reach{" "}
              <span className="font-semibold text-white/80">
                100M+ impressions
              </span>{" "}
              — all while spending{" "}
              <span className="font-semibold text-white/80">
                less time than ever
              </span>{" "}
              on the writing process.
            </p>
            <p className="text-[15px] leading-relaxed text-white/45 sm:col-span-2">
              there are now 1000+ writers saving hours every week with Growth.
              if you want to join them, you can try it for{" "}
              <span className="font-semibold text-white">free</span> — just
              click the button.
            </p>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function FooterSection() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-base font-normal mb-1">
              AI-powered writing assistant.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] text-white/35 hover:text-white/60 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export function LandingPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#060606] text-white min-h-screen selection:bg-purple-500/30">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PlatformSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
          <FounderStorySection />
        </main>
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
