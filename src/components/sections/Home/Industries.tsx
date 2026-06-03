"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Banknote,
  Factory,
  HeartPulse,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const industries = [
  {
    title: "Financial",
    full: "Financial Services",
    description: "Zero-trust systems with compliance-first engineering.",
    image: "/images/industries/finance.avif",
    icon: Banknote,
    accent: "from-orange-500 to-red-500",
    accentHex: "#f97316",
    accentHex2: "#ef4444",
    stat: "99.99% uptime SLA",
    link: "/industries/financial-services",
  },
  {
    title: "Healthcare",
    full: "Healthcare & Life Sciences",
    description: "Secure PHI pipelines and intelligent healthcare systems.",
    image: "/images/industries/health.avif",
    icon: HeartPulse,
    accent: "from-pink-500 to-rose-500",
    accentHex: "#ec4899",
    accentHex2: "#f43f5e",
    stat: "HIPAA & HITRUST certified",
    link: "/industries/healthcare",
  },
  {
    title: "Retail",
    full: "Retail & eCommerce",
    description: "Realtime personalization and scalable commerce experiences.",
    image: "/images/industries/retail.avif",
    icon: ShoppingBag,
    accent: "from-fuchsia-500 to-violet-500",
    accentHex: "#a855f7",
    accentHex2: "#7c3aed",
    stat: "3× faster time-to-market",
    link: "/industries/retail",
  },
  {
    title: "Manufacturing",
    full: "Manufacturing",
    description: "Connected factories with predictive intelligence.",
    image: "/images/industries/manufacturing.avif",
    icon: Factory,
    accent: "from-cyan-500 to-sky-500",
    accentHex: "#06b6d4",
    accentHex2: "#0ea5e9",
    stat: "40% reduction in downtime",
    link: "/industries/manufacturing",
  },
  {
    title: "Public Sector",
    full: "Public Sector",
    description: "Mission-critical systems with enterprise governance.",
    image: "/images/industries/public.avif",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-500",
    accentHex: "#10b981",
    accentHex2: "#14b8a6",
    stat: "FedRAMP authorized",
    link: "/industries/public-sector",
  },
  {
    title: "Technology",
    full: "Media & Technology",
    description: "AI-native platforms built for modern scale.",
    image: "/images/industries/media.webp",
    icon: MonitorSmartphone,
    accent: "from-indigo-500 to-blue-500",
    accentHex: "#6366f1",
    accentHex2: "#3b82f6",
    stat: "10M+ events/sec processed",
    link: "/industries/media-technology",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function IndustriesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobilePanelsRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(5);

  // ── Single consolidated ScrollTrigger timeline ───────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ONE timeline, ONE ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(".industries-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(
          ".industries-title",
          { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" },
          "-=0.2",
        )
        .from(
          ".industries-sub",
          { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .from(
          "[data-panel]",
          {
            opacity: 0,
            y: 50,
            stagger: 0.07,
            duration: 0.7,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .from(
          "[data-mobile-card]",
          {
            opacity: 0,
            x: -40,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
          },
          "<", // same start as panels
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP-driven panel flex expansion ─────────────────────────────────────
  useEffect(() => {
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      gsap.to(panel, {
        flexGrow: active === i ? 4.6 : 0.7,
        duration: 0.8,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-8 lg:py-14"
    >
      {/* ── Static ambient blob — no continuous animation ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)",
            filter: "blur(80px)",
            // ✅ No blobFloat animation — saves GPU cycles
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-6 lg:px-10">
        {/* ── Heading ── */}
        <div className="text-center">
          <p className="industries-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            What we build
          </p>
          <h2 className="industries-title text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="industries-sub mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Enterprise transformation designed for highly regulated, scalable,
            and innovation-driven industries.
          </p>
        </div>

        {/* ── DESKTOP panels ── */}
        <div
          className="mt-14 hidden items-stretch gap-3 overflow-hidden lg:flex"
          style={{ height: 420 }}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = active === index;

            return (
              <div
                key={industry.title}
                data-panel
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                onClick={() => setActive(index)}
                className="relative shrink-0 cursor-pointer overflow-hidden rounded-[32px]"
                style={{
                  // flexGrow is driven by GSAP — only set initial value here
                  flexGrow: active === index ? 4.6 : 0.7,
                  flexShrink: 0,
                  flexBasis: 0,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                  // ✅ No willChange here — GSAP sets it during animation only
                }}
              >
                {/* Background image — no filter transition, use overlay instead */}
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    // ✅ No filter animation — expensive. Static brightness via overlay below.
                    filter: "brightness(0.6) saturate(1.1)",
                  }}
                />

                {/* ✅ Cheap opacity transition replaces filter animation */}
                <div
                  className="absolute inset-0 bg-black"
                  style={{
                    opacity: isActive ? 0.18 : 0.42,
                    transition: "opacity 0.6s ease",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{
                    opacity: isActive ? 0.22 : 0.1,
                    transition: "opacity 0.6s ease",
                  }}
                />

                {/* Top accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease 0.3s",
                  }}
                  aria-hidden
                />

                {/* ✅ No shimmer overlay — removed 6× infinite GPU animations */}

                {/* Collapsed vertical label */}
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: isActive
                      ? "opacity 0.2s ease"
                      : "opacity 0.4s ease 0.35s",
                    pointerEvents: "none",
                  }}
                >
                  <h3
                    className="whitespace-nowrap text-[15px] font-semibold tracking-wide text-white/90"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    {industry.title}
                  </h3>
                </div>

                {/* Expanded content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-9"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: isActive
                      ? "opacity 0.5s ease 0.22s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.22s"
                      : "opacity 0.25s ease, transform 0.25s ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Stat badge */}
                  <div
                    className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.45s ease 0.38s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${industry.accentHex}, ${industry.accentHex2})`,
                        boxShadow: `0 0 6px ${industry.accentHex}`,
                      }}
                    />
                    <span className="text-xs font-medium text-white/80">
                      {industry.stat}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex h-[62px] w-[62px] items-center justify-center rounded-[20px] bg-gradient-to-br ${industry.accent} text-white shadow-2xl`}
                    style={{
                      transform: isActive
                        ? "translateY(0) scale(1)"
                        : "translateY(12px) scale(0.88)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.28s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.28s",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  <h3
                    className="mt-5 max-w-[280px] text-xl font-semibold leading-[1.08] tracking-tight text-white"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(16px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.42s ease 0.32s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s",
                    }}
                  >
                    {industry.full}
                  </h3>

                  <p
                    className="mt-4 max-w-[300px] text-[12px] leading-7 text-white/70"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(12px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.38s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s",
                    }}
                  >
                    {industry.description}
                  </p>

                  <Link
                    to={industry.link}
                    className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(10px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.44s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.44s",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                    }}
                  >
                    Explore Industry
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE panels ── */}
        <div
          ref={mobilePanelsRef}
          className="mt-10 flex flex-col gap-3 lg:hidden"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = active === index;

            return (
              <div
                key={industry.title}
                data-mobile-card
                onClick={() => setActive(index)}
                className="relative overflow-hidden rounded-[30px]"
                style={{
                  // ✅ maxHeight instead of height — avoids layout recalculation
                  maxHeight: isActive ? 480 : 96,
                  transition: "max-height 0.75s cubic-bezier(0.77,0,0.18,1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                }}
              >
                {/* Background image — static filter, overlay handles brightness */}
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "brightness(0.55) saturate(1)" }}
                />

                {/* ✅ Cheap overlay replaces filter transition */}
                <div
                  className="absolute inset-0 bg-black"
                  style={{
                    opacity: isActive ? 0.18 : 0.38,
                    transition: "opacity 0.6s ease",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{
                    opacity: isActive ? 0.22 : 0.08,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Header row — always visible */}
                <div className="relative z-10 flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    {/* Icon shown in collapsed state too */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br ${industry.accent} text-white`}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {industry.full}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/60">
                        {industry.stat}
                      </p>
                    </div>
                  </div>

                  {/* Chevron indicator */}
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <ArrowRight size={13} className="text-white/70" />
                  </div>
                </div>

                {/* Expanded body */}
                <div
                  className="relative z-10 px-5 pb-6"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(16px)",
                    transition: isActive
                      ? "opacity 0.5s ease 0.22s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.22s"
                      : "opacity 0.15s ease, transform 0.15s ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <p className="max-w-md text-sm leading-7 text-white/75">
                    {industry.description}
                  </p>
                  <Link
                    to={industry.link}
                    className="group mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Explore Industry
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Progress dots — no entrance animation (removed) ── */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${industries[i].title}`}
              className="transition-all duration-500"
              style={{
                height: 6,
                width: active === i ? 28 : 6,
                borderRadius: 99,
                background:
                  active === i
                    ? `linear-gradient(90deg, ${industries[active].accentHex}, ${industries[active].accentHex2})`
                    : "rgba(148,163,184,0.4)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}