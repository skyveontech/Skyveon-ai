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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const industries = [
  {
    title: "Financial",
    full: "Financial Services",
    description: "Zero-trust systems with compliance-first engineering.",
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
    description: "Secure PHI pipelines and intelligent healthcare systems.",
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
    description: "Realtime personalization and scalable commerce experiences.",
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
    description: "Connected factories with predictive intelligence.",
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
    description: "Mission-critical systems with enterprise governance.",
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
    description: "AI-native platforms built for modern scale.",
    image: "/images/technology.jpg",
    icon: MonitorSmartphone,
    accent: "from-indigo-500 to-blue-500",
    accentHex: "#6366f1",
    accentHex2: "#3b82f6",
    stat: "10M+ events/sec processed",
  },
] as const;

const AUTO_INTERVAL = 4800;

const SHIMMER_STYLES = industries.map((_, i) => ({
  background:
    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
  animation: `shimmer ${3.2 + i * 0.4}s ease-in-out infinite`,
  animationDelay: `${i * 0.55}s`,
}));

export default function IndustriesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const mobilePanelsRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(5);

  // ── GSAP scroll-triggered entrance ──────────────────────────────────────
  useEffect(() => {
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        const split = new SplitText(eyebrowRef.current, { type: "chars" });
        splits.push(split);
        gsap.from(split.chars, {
          opacity: 0,
          y: 12,
          rotateX: -40,
          stagger: 0.028,
          duration: 0.55,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }

      if (h2Ref.current) {
        const split = new SplitText(h2Ref.current, { type: "words" });
        splits.push(split);
        gsap.from(split.words, {
          opacity: 0,
          y: 36,
          skewY: 4,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: h2Ref.current, start: "top 88%", once: true },
        });
      }

      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: subRef.current, start: "top 90%", once: true },
        });
      }

      if (panelsRef.current) {
        gsap.from(panelsRef.current.querySelectorAll<HTMLElement>("[data-panel]"), {
          opacity: 0,
          y: 60,
          scale: 0.92,
          stagger: 0.07,
          duration: 0.85,
          ease: "expo.out",
          scrollTrigger: { trigger: panelsRef.current, start: "top 82%", once: true },
        });
      }

      if (mobilePanelsRef.current) {
        gsap.from(
          mobilePanelsRef.current.querySelectorAll<HTMLElement>("[data-mobile-card]"),
          {
            opacity: 0,
            x: -40,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: mobilePanelsRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (dotsRef.current) {
        gsap.from(dotsRef.current.querySelectorAll("button"), {
          opacity: 0,
          scale: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: dotsRef.current, start: "top 95%", once: true },
        });
      }
    }, sectionRef);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);




  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-8 lg:py-14"
    >
      {/* ── ambient blob ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blobFloat 8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px] px-6 lg:px-10">
        {/* ── heading ── */}
        <div className="text-center">
          <p ref={eyebrowRef} className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            What we build
          </p>
          <h2 ref={h2Ref} className="text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
              Industry Leaders
            </span>
          </h2>
          <p ref={subRef} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Enterprise transformation designed for highly regulated, scalable,
            and innovation-driven industries.
          </p>
        </div>

        {/* ── DESKTOP panels ── */}
        <div
          ref={panelsRef}
          className="mt-14 hidden lg:flex items-stretch gap-3 overflow-hidden"
          style={{ height: 420 }}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = active === index;

            return (
              <div
                key={industry.title}
                data-panel
                onClick={() => setActive(index)}
                className="relative shrink-0 cursor-pointer overflow-hidden rounded-[32px]"
                style={{
                  flex: isActive ? "4.6 0 0" : "0.7 0 0",
                  transition: "flex 0.75s cubic-bezier(0.77, 0, 0.18, 1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                  willChange: "flex",
                }}
              >
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transform: isActive ? "scale(1.07)" : "scale(1.0)",
                    filter: isActive
                      ? "brightness(0.68) saturate(1.15)"
                      : "brightness(0.52) saturate(0.9)",
                    transition: "transform 1.1s cubic-bezier(0.77,0,0.18,1), filter 0.8s ease",
                    willChange: "transform, filter",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{ opacity: isActive ? 0.22 : 0.1, transition: "opacity 0.6s ease" }}
                />

                <div className="pointer-events-none absolute inset-0" style={SHIMMER_STYLES[index]} aria-hidden />

                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease 0.3s",
                  }}
                  aria-hidden
                />

                {/* collapsed label */}
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: isActive ? "opacity 0.2s ease" : "opacity 0.4s ease 0.35s",
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

                {/* expanded content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-9"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: isActive
                      ? "opacity 0.5s ease 0.22s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.22s"
                      : "opacity 0.25s ease, transform 0.25s ease",
                    pointerEvents: isActive ? "auto" : "none",
                    willChange: "opacity, transform",
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
                      transition: "opacity 0.45s ease 0.38s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${industry.accentHex}, ${industry.accentHex2})`,
                        boxShadow: `0 0 6px ${industry.accentHex}`,
                      }}
                    />
                    <span className="text-xs font-medium text-white/80">{industry.stat}</span>
                  </div>

                  <div
                    className={`flex h-[62px] w-[62px] items-center justify-center rounded-[20px] bg-gradient-to-br ${industry.accent} text-white shadow-2xl`}
                    style={{
                      transform: isActive ? "translateY(0) scale(1)" : "translateY(12px) scale(0.88)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease 0.28s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.28s",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  <h3
                    className="mt-5 max-w-[280px] text-xl font-semibold leading-[1.08] tracking-tight text-white"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.42s ease 0.32s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s",
                    }}
                  >
                    {industry.full}
                  </h3>

                  <p
                    className="mt-4 max-w-[300px] text-[12px] leading-7 text-white/70"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(12px)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease 0.38s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.38s",
                    }}
                  >
                    {industry.description}
                  </p>

                  <button
                    className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900"
                    style={{
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease 0.44s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.44s",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                    }}
                  
                  >
                    Explore Industry
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE panels ── */}
        <div ref={mobilePanelsRef} className="mt-10 flex flex-col gap-3 lg:hidden">
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
                  height: isActive ? 420 : 96,
                  transition: "height 0.75s cubic-bezier(0.77,0,0.18,1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0f172a",
                  willChange: "height",
                }}
              >
                <img
                  src={industry.image}
                  alt={industry.full}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    filter: isActive
                      ? "brightness(0.68) saturate(1.15)"
                      : "brightness(0.45) saturate(0.9)",
                    transition: "transform 1s cubic-bezier(0.77,0,0.18,1), filter 0.7s ease",
                    willChange: "transform, filter",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.accent}`}
                  style={{ opacity: isActive ? 0.22 : 0.08, transition: "opacity 0.5s ease" }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${industry.accentHex}, ${industry.accentHex2}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                 
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{industry.full}</h3>
                      <p className="mt-1 text-sm text-white/65">{industry.stat}</p>
                    </div>
                  </div>
                  <div
                    className="text-4xl font-black text-white/10"
                    style={{ opacity: isActive ? 1 : 0.45, transition: "opacity 0.4s ease" }}
                  >
                    0{index + 1}
                  </div>
                </div>

                <div
                  className="relative z-10 px-5 pb-5"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: isActive
                      ? "opacity 0.55s ease 0.22s, transform 0.55s cubic-bezier(0.22,1,0.36,1) 0.22s"
                      : "opacity 0.2s ease, transform 0.2s ease",
                    pointerEvents: isActive ? "auto" : "none",
                    willChange: "opacity, transform",
                  }}
                >
                  <p className="max-w-md text-sm leading-7 text-white/75">{industry.description}</p>
                  <button className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1">
                    Explore Industry
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── progress dots ── */}
        <div ref={dotsRef} className="mt-8 flex items-center justify-center gap-2">
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

      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-24px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  300% center; }
        }
      `}</style>
    </section>
  );
}