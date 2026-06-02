// import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

const stats = [
  { number: 750, suffix: "+", label: "Global Employees" },
  { number: 80, suffix: "+", label: "Global Customers" },
  { number: 20, suffix: "+", label: "Global Markets" },
];

const partners = [
  { name: "Partner 1", logo: "/images/clients/30.avif" },
  { name: "Partner 2", logo: "/images/clients/31.avif" },
  { name: "Partner 3", logo: "/images/clients/32.avif" },
  { name: "Partner 4", logo: "/images/clients/33.avif" },
  { name: "Partner 5", logo: "/images/clients/34.avif" },
  { name: "Partner 6", logo: "/images/clients/35.avif" },
  { name: "Partner 8", logo: "/images/clients/37.avif" },
  { name: "Partner 10", logo: "/images/clients/39.avif" },
  { name: "Partner 11", logo: "/images/clients/40.avif" },
  { name: "Partner 12", logo: "/images/clients/41.avif" },
  { name: "Partner 13", logo: "/images/clients/42.avif" },
  { name: "Partner 14", logo: "/images/clients/43.avif" },
  { name: "Partner 14", logo: "/images/clients/43 (1).avif" },
  { name: "Partner 15", logo: "/images/clients/44.avif" },
  { name: "Partner 16", logo: "/images/clients/45.avif" },
  { name: "Partner 17", logo: "/images/clients/46.avif" },
  { name: "Partner 18", logo: "/images/clients/47.avif" },
];

const marqueeItems = [...partners, ...partners];

function AnimatedStat({
  number,
  suffix,
  label,
  trigger,
  index,
}: {
  number: number;
  suffix: string;
  label: string;
  trigger: boolean;
  index: number;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    const delay = index * 160;
    let frameId: number;

    const startAnim = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.round(eased * number));
        if (progress < 1) frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
      rafRef.current = frameId;
    };

    const timeout = setTimeout(startAnim, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, number, index]);

  return (
    <div className="trusted-stat group relative flex flex-col">
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/60">
        {/* Corner accent */}
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-orange-100 to-red-50 opacity-80" />

        {/* Number */}
        <p className="relative text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 tabular-nums leading-none">
          {display}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {suffix}
          </span>
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-gradient-to-r from-orange-200 via-orange-100 to-transparent" />

        {/* Label */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function TrustedStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countTrigger, setCountTrigger] = useState(false);

  useGsap(() => {
    gsap.from(".trusted-label", {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });

    gsap.from(".trusted-heading", {
      opacity: 0,
      y: 50,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });

    gsap.from(".trusted-desc", {
      opacity: 0,
      y: 24,
      duration: 0.9,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });

    gsap.from(".trusted-stat", {
      opacity: 0,
      y: 40,
      scale: 0.96,
      stagger: 0.14,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 82%",
        toggleActions: "play reverse play reverse",

        onEnter: () => setCountTrigger(true),
      },
    });

    gsap.from(".marquee-label", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".marquee-section", start: "top 90%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white  py-12 lg:py-8">
      {/* ── DOT PATTERN ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-20">
          {/* LEFT */}
          <div>
            <div className="trusted-label mb-6 inline-flex items-center gap-3">
              <span className="flex h-7 items-center gap-1.5 rounded-full bg-orange-100 px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                The Difference Is Strategic
              </span>
            </div>
            <h2 className="trusted-heading font-bold text-5xl lg:text-6xl xl:text-6xl  leading-[1.03] tracking-tight text-slate-900">
              {/* FIRST LINE */}
              <div className="flex flex-wrap items-center gap-x-4">
                <span>Built On</span>

                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Relationships.
                  </span>

                  {/* UNDERLINE */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none">
                    <path
                      d="M0 7 Q75 1 150 7 Q225 13 300 7"
                      stroke="url(#uline)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient
                        id="uline"
                        x1="0"
                        y1="0"
                        x2="300"
                        y2="0"
                        gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f97316" />

                        <stop offset="1" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>

              {/* SECOND LINE */}
              <div className="mt-2">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Driven
                </span>{" "}
                By Results.
              </div>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="h-full flex flex-col items-center justify-center">
            <p className="trusted-desc text-lg leading-[1.85] text-slate-500 max-w-lg">
              Skyveon AI delivers enterprise transformation through cloud, AI,
              DevOps, and data engineering solutions built for reliability,
              scalability, and measurable business impact.
            </p>

            {/* <div className="trusted-desc mt-8 inline-flex items-center gap-3 text-sm font-semibold text-orange-600 group cursor-pointer">
              <span>Explore our approach</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white">
                <ArrowRight size={16} />
              </span>
            </div> */}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            Measured Impact
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-orange-200 to-transparent" />
        </div>

        {/* ── STATS ── */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {stats.map((item, i) => (
            <AnimatedStat
              key={item.label}
              number={item.number}
              suffix={item.suffix}
              label={item.label}
              trigger={countTrigger}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-section relative w-full overflow-hidden">
        {/* Top border line */}
        <div className="mb-6 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="marquee-label flex items-center gap-3">
            <div className="h-px w-8 bg-orange-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Trusted Partners
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden border-y border-slate-100 bg-white py-6 shadow-[inset_0_1px_12px_rgba(0,0,0,0.03)]">
          {/* Fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <div
            className="flex w-max gap-5"
            style={{ animation: "marquee 32s linear infinite" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.animationPlayState =
                "paused")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.animationPlayState =
                "running")
            }>
            {marqueeItems.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="group flex shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-6 py-3.5 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-50 cursor-pointer">
                <div className="flex h-14 w-auto items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:border-orange-100 group-hover:shadow-orange-100/60">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
