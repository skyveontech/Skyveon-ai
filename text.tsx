"use client";

import { useRef } from "react";
import { TrendingUp, ShieldCheck, Zap, BarChart3 } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";
import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

const outcomes = [
  {
    icon: TrendingUp,
    title: "Accelerate Growth",
    description:
      "Launch faster and scale confidently with modern engineering practices built for the enterprise.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Reliability",
    description:
      "Built with security, resilience, and observability from day one — no retrofitting required.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Reduce complexity through automation and proven delivery frameworks that cut cycle times.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description:
      "Turn raw metrics into actionable intelligence with real-time dashboards and analytics.",
  },
] as const;

export default function ServiceOverview({ service }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);
    const animatedItems = q(
      ".overview-eyebrow, .overview-title, .overview-copy, .overview-cta, .overview-visual, .overview-card"
    );

    gsap.set(animatedItems, { willChange: "transform, opacity" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set(animatedItems, { clearProps: "willChange" });
      },
    });

    tl.from(q(".overview-eyebrow"), { opacity: 0, x: -20, duration: 0.5 })
      .from(q(".overview-title"), { opacity: 0, y: 36, duration: 0.75, stagger: 0.08 }, "-=0.25")
      .from(q(".overview-copy"), { opacity: 0, y: 24, duration: 0.6 }, "-=0.35")
      .from(q(".overview-cta"), { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
      .from(q(".overview-visual"), { opacity: 0, scale: 0.9, duration: 0.85, ease: "back.out(1.4)" }, "-=0.6")
      .from(
        q(".overview-card"),
        { opacity: 0, y: 48, duration: 0.65, stagger: 0.1 },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* ── TOP HERO BAND ───────────────────────────────────────── */}
      <div className="relative bg-slate-900 py-24 lg:py-32">
        {/* subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          
        />

        {/* orange glow top-left */}
        <div className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full bg-orange-500/10 blur-[120px]" />
        {/* orange glow bottom-right */}
        <div className="absolute -bottom-16 right-0 h-[360px] w-[360px] rounded-full bg-orange-400/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

            {/* LEFT — copy */}
            <div className="flex-1 max-w-xl">
              {/* eyebrow */}
              <span className="overview-eyebrow inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
                <span className="h-px w-6 bg-orange-400" />
                What We Deliver
              </span>

              <h2 className="overview-title mt-5 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
                Building Solutions
                <span className="overview-title block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  That Deliver Results
                </span>
              </h2>

              <p className="overview-copy mt-7 text-base leading-8 text-slate-400">
                {service.overview}
              </p>

              <div className="overview-cta mt-10">
                <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(249,115,22,0.35)] transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_60px_rgba(249,115,22,0.5)]">
                  Explore Our Services
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

             {/* RIGHT IMAGE */}
          <div className="overview-image relative">
            {/* Glow Effect */}
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />

            {/* Image Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
              <img
                src={service.overviewImage || service.heroImage}
                alt={service.title}
                className="h-[500px] w-full object-cover"
                loading="lazy"
                draggable={false}
              />

              {/* Optional Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-orange-500/10" />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* ── CARDS BAND ─────────────────────────────────────────── */}
      <div className="relative bg-slate-800 py-16">
        {/* thin orange top border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-0 divide-y divide-slate-700/50 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;

              return (
                <div
                  key={index}
                  className="overview-card group relative px-8 py-10 transition-all duration-300 hover:bg-slate-700/40 first:rounded-tl-none"
                >
                  {/* hover accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px scale-x-0 bg-gradient-to-r from-orange-500 to-red-400 transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/30 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:ring-orange-500/50">
                    <Icon size={22} className="text-orange-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                    {outcome.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {outcome.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* bottom border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>
    </section>
  );
}