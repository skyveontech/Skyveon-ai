"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Banknote,
  Factory,
  HeartPulse,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const industries = [
  {
    title: "Financial",
    full: "Financial Services",
    description:
      "Zero-trust systems with compliance-first engineering.",
    image: "/images/financial.jpg",
    icon: Banknote,
    accent: "from-orange-500 to-red-500",
    accentHex: "#f97316",
    accentHex2: "#ef4444",
    stat: "99.99% uptime SLA",
  },
  {
    title: "Healthcare",
    full: "Healthcare & Life Sciences",
    description:
      "Secure PHI pipelines and intelligent healthcare systems.",
    image: "/images/healthcare.jpg",
    icon: HeartPulse,
    accent: "from-pink-500 to-rose-500",
    accentHex: "#ec4899",
    accentHex2: "#f43f5e",
    stat: "HIPAA & HITRUST certified",
  },
  {
    title: "Retail",
    full: "Retail & eCommerce",
    description:
      "Realtime personalization and scalable commerce experiences.",
    image: "/images/retail.jpg",
    icon: ShoppingBag,
    accent: "from-fuchsia-500 to-violet-500",
    accentHex: "#a855f7",
    accentHex2: "#7c3aed",
    stat: "3× faster time-to-market",
  },
  {
    title: "Manufacturing",
    full: "Manufacturing",
    description:
      "Connected factories with predictive intelligence.",
    image: "/images/manufacturing.jpg",
    icon: Factory,
    accent: "from-cyan-500 to-sky-500",
    accentHex: "#06b6d4",
    accentHex2: "#0ea5e9",
    stat: "40% reduction in downtime",
  },
  {
    title: "Public Sector",
    full: "Public Sector",
    description:
      "Mission-critical systems with enterprise governance.",
    image: "/images/public.jpg",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-500",
    accentHex: "#10b981",
    accentHex2: "#14b8a6",
    stat: "FedRAMP authorized",
  },
  {
    title: "Technology",
    full: "Media & Technology",
    description:
      "AI-native platforms built for modern scale.",
    image: "/images/technology.jpg",
    icon: MonitorSmartphone,
    accent: "from-indigo-500 to-blue-500",
    accentHex: "#6366f1",
    accentHex2: "#3b82f6",
    stat: "10M+ events/sec processed",
  },
];

const AUTO_INTERVAL = 4800;

export default function IndustriesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(5);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ── mount fade-in ── */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── auto-cycle ── */
  const activate = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const startAuto = useCallback(() => {
    autoRef.current = setTimeout(() => {
      activate((active + 1) % industries.length);
    }, AUTO_INTERVAL);
  }, [active, activate]);

  useEffect(() => {
    if (!isHovering) {
      startAuto();
    }
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [active, isHovering, startAuto]);

  const handleHover = (idx: number) => {
    if (autoRef.current) clearTimeout(autoRef.current);
    setIsHovering(true);
    activate(idx);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-8 lg:py-14"
    >
      {/* ── ambient background blob ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blobFloat 8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-6 lg:px-10">
        {/* ── heading ── */}
        <div
          className="text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            What we build
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Enterprise transformation designed for highly regulated, scalable,
            and innovation-driven industries.
          </p>
        </div>

        {/* ── panels ── */}
        <div
          className="mt-14 flex items-stretch gap-3 overflow-hidden"
          style={{ height: 420 }}
          onMouseLeave={handleLeave}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = active === index;

            return (
              <div
                key={industry.title}
                onMouseEnter={() => handleHover(index)}
                className="relative shrink-0 cursor-pointer overflow-hidden rounded-[32px]"
                style={{
                  flex: isActive ? "4.6 0 0" : "0.7 0 0",
                  transition:
                    "flex 0.75s cubic-bezier(0.77, 0, 0.18, 1)",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(56px)",
                  transitionProperty: "flex, opacity, transform",
                  transitionDuration: `0.75s, 0.8s, 0.8s`,
                  transitionDelay: `0s, ${0.06 * index}s, ${0.06 * index}s`,
                  transitionTimingFunction:
                    "cubic-bezier(0.77,0,0.18,1), cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                }}
              >
                {/* image */}
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transform: isActive ? "scale(1.07)" : "scale(1.0)",
                    filter: isActive
                      ? "brightness(0.68) saturate(1.15)"
                      : "brightness(0.52) saturate(0.9)",
                    transition:
                      "transform 1.1s cubic-bezier(0.77,0,0.18,1), filter 0.8s ease",
                  }}
                />

                {/* base gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

                {/* colored tint */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{
                    opacity: isActive ? 0.22 : 0.1,
                    transition: "opacity 0.6s ease",
                  }}
                />

                {/* shimmer sweep */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
                    animation: `shimmer ${3.2 + index * 0.4}s ease-in-out infinite`,
                    animationDelay: `${index * 0.55}s`,
                  }}
                  aria-hidden
                />

                {/* top glow when active */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease 0.3s",
                  }}
                  aria-hidden
                />

                {/* ── collapsed label ── */}
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

                {/* ── expanded content ── */}
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
                  {/* stat badge */}
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

                  {/* icon */}
                  <div
                    className={`flex h-[62px] w-[62px] items-center justify-center rounded-[20px] bg-gradient-to-br ${industry.accent} text-white shadow-2xl`}
                    style={{
                      transform: isActive ? "translateY(0) scale(1)" : "translateY(12px) scale(0.88)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.28s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.28s",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  {/* title */}
                  <h3
                    className="mt-5 max-w-[280px] text-xl font-semibold leading-[1.08] tracking-tight text-white"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.42s ease 0.32s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s",
                    }}
                  >
                    {industry.full}
                  </h3>

                  {/* description */}
                  <p
                    className="mt-4 max-w-[300px] text-[12px] leading-7 text-white/70"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(12px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.38s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s",
                    }}
                  >
                    {industry.description}
                  </p>

                  {/* button */}
                  <button
                    className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.4s ease 0.44s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.44s, translate 0.25s ease, box-shadow 0.25s ease",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.translate = "0 -3px";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px rgba(0,0,0,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.translate = "0 0";
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(0,0,0,0.25)";
                    }}
                  >
                    Explore Industry
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── progress dots ── */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => activate(i)}
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

      {/* ── global keyframes injected once ── */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-24px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 300% center; }
        }
      `}</style>
    </section>
  );
}
