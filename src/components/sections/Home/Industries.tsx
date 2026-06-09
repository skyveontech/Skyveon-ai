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
          "<",
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
                className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[32px] transition-shadow duration-500 hover:shadow-xl"
                style={{
                  flexGrow: active === index ? 4.6 : 0.7,
                  flexShrink: 0,
                  flexBasis: 0,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                }}
              >
                {/* Background image with cinematic hover zoom */}
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{
                    filter: "brightness(0.6) saturate(1.1)",
                  }}
                />

                <div
                  className="absolute inset-0 bg-black"
                  style={{
                    opacity: isActive ? 0.18 : 0.42,
                    transition: "opacity 0.6s ease",
                  }}
                />

                {/* Inactive panel hover flash */}
                <div
                  className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                  }`}
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
                    className="whitespace-nowrap py-10 text-[15px] font-semibold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white"
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
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{
                        background: `linear-gradient(135deg, ${industry.accentHex}, ${industry.accentHex2})`,
                        boxShadow: `0 0 6px ${industry.accentHex}`,
                      }}
                    />
                    <span className="text-xs font-medium text-white/80">
                      {industry.stat}
                    </span>
                  </div>

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
                    className="group/btn mt-7 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-95"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(10px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.44s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.44s",
                    }}
                  >
                    Explore Industry
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
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
                className="group relative cursor-pointer overflow-hidden rounded-[28px] select-none"
                style={{
                  maxHeight: isActive ? 340 : 88,
                  transition: "max-height 0.6s cubic-bezier(0.32, 0.72, 0, 1)", // Premium fluid easing curve
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Image scales slightly on mobile open for depth */}
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out origin-center ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                  style={{ filter: "brightness(0.55) saturate(1)" }}
                />

                <div
                  className="absolute inset-0 bg-black"
                  style={{
                    opacity: isActive ? 0.2 : 0.45,
                    transition: "opacity 0.6s ease",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{
                    opacity: isActive ? 0.25 : 0.05,
                    transition: "opacity 0.6s ease",
                  }}
                />

                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Header row — Always visible touch target */}
                <div className="relative z-10 flex h-[88px] items-center justify-between px-5 transition-colors duration-300 group-hover:bg-white/5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br ${industry.accent} text-white shadow-lg transition-transform duration-500 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-white">
                        {industry.full}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-white/60">
                        {industry.stat}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Mobile Chevron */}
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ease-out"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${industry.accentHex}, ${industry.accentHex2})`
                        : "rgba(255,255,255,0.1)",
                      transform: isActive ? "rotate(90deg) scale(1.05)" : "rotate(0deg) scale(1)",
                      boxShadow: isActive ? `0 4px 12px ${industry.accentHex}40` : 'none'
                    }}
                  >
                    <ArrowRight size={14} className={isActive ? "text-white" : "text-white/70"} />
                  </div>
                </div>

                {/* Expanded body - Staggered text & button slide up */}
                <div
                  className="relative z-10 px-6 pb-7 pt-1"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <p 
                    className="max-w-md text-[13px] leading-[1.6] text-white/80"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(12px)",
                      transition: isActive 
                        ? "opacity 0.4s ease 0.15s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.15s" 
                        : "opacity 0.2s ease, transform 0.2s ease"
                    }}
                  >
                    {industry.description}
                  </p>
                  
                  <Link
                    to={industry.link}
                    className="group/mobBtn mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-all duration-300 active:scale-95"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      transition: isActive 
                        ? "opacity 0.4s ease 0.25s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.25s" 
                        : "opacity 0.2s ease, transform 0.2s ease"
                    }}
                  >
                    Explore Industry
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover/mobBtn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Interactive Progress dots ── */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${industries[i].title}`}
              className="transition-all duration-300 hover:scale-110"
              style={{
                height: 8,
                width: active === i ? 28 : 8,
                borderRadius: 99,
                background:
                  active === i
                    ? `linear-gradient(90deg, ${industries[active].accentHex}, ${industries[active].accentHex2})`
                    : "rgba(148,163,184,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                boxShadow: active === i ? `0 0 10px ${industries[active].accentHex}60` : "none"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}