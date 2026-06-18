"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// ─── types ────────────────────────────────────────────────────────────────────
interface Service {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
}

interface Props {
  service: Service;
}

// ─── component ────────────────────────────────────────────────────────────────
export default function ServiceHero({ service }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── initial hidden states ─────────────────────────────────────────────
      gsap.set(".hero-line", { yPercent: 115, skewY: 3 });
      gsap.set(".hero-badge", { opacity: 0, y: -16, scale: 0.92 });
      gsap.set(".hero-copy", { opacity: 0, y: 28 });
      gsap.set(".hero-btn", { opacity: 0, y: 18, scale: 0.95 });
      gsap.set(".hero-accent-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-overlay-shimmer", { x: "-110%" });

      // ── entrance timeline ─────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl
        // badge pill drops in
        .to(".hero-badge", { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" })

        // accent bar draws
        .to(".hero-accent-line", { scaleX: 1, duration: 0.55, ease: "expo.out" }, "-=0.3")

        // title lines mask-reveal
        .to(".hero-line", {
          yPercent: 0,
          skewY: 0,
          duration: 1.05,
          stagger: 0.13,
        }, "-=0.3")

        // description
        .to(".hero-copy", { opacity: 1, y: 0, duration: 0.75 }, "-=0.55")

        // buttons
        .to(".hero-btn", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
        }, "-=0.5")

        // image shimmer sweep
        .to(".hero-overlay-shimmer", {
          x: "110%",
          duration: 1.1,
          ease: "power2.inOut",
        }, 0.2);

      // ── subtle image scale on scroll ──────────────────────────────────────
      gsap.to(".hero-image-wrap", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
      // Removed JS hover listeners for better performance and to prevent 
      // animation conflicts. Handled natively via Tailwind CSS now.
      
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[600px] overflow-hidden bg-slate-950"
        aria-label={`${service.title} hero`}
      >
        {/* ── BACKGROUND IMAGE ───────────────────────────────────────────────── */}
        <div className="hero-image-wrap absolute inset-0 origin-center will-change-transform">
          <img
            src={service.heroImage}
            alt={service.title}
            className="hero-image absolute inset-0 h-full w-full object-cover"
            loading="eager"
            draggable={false}
          />

          {/* shimmer sweep */}
          <div className="hero-overlay-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-12deg] pointer-events-none z-10" />

          {/* deep black base */}
          <div className="absolute inset-0 bg-black/35" />

          {/* directional gradient — left content zone */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />

          {/* orange atmospheric glow — top-right */}
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-orange-600/20 blur-[120px] pointer-events-none" />

          {/* bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-[600px] items-center pt-16 md:pt-30 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-4xl">

              {/* Breadcrumb badge with premium glass hover */}
              <div className="hero-badge mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 cursor-default">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Skyveon Solutions
                  <ChevronRight size={14} className="text-white/50" />
                  <span className="text-orange-400 font-semibold">{service.title}</span>
                </span>
              </div>

              {/* Orange accent line */}
              <div
                className="hero-accent-line mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(255,107,0,0.5)]"
                aria-hidden="true"
              />

              {/* Title — masked line reveal (Added overflow-hidden) */}
              <div className="space-y-1">
                <div className=" leading-none py-1">
                  <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl font-semibold leading-[0.9] tracking-tight text-white">
                    {service.title}
                  </h1>
                </div>

                <div className="- leading-none py-1">
                  <h2 className="hero-line text-4xl sm:text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
                    <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent pb-2">
                      {service.subtitle}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="hero-copy mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-medium">
                {service.description}
              </p>

              {/* CTA buttons with hardware-accelerated CSS hovers */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="hero-btn group inline-flex items-center gap-2 bg-[#FF6B00] border-2 border-[#FF6B00] px-8 py-4 text-sm font-semibold text-white rounded-xl shadow-xl shadow-orange-600/20 transition-all duration-300 hover:bg-white hover:text-[#FF6B00] hover:shadow-orange-600/40 hover:-translate-y-1 active:scale-95"
                >
                  Get Started
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                
                {/* Optional secondary button for future use */}
                {/* <Link
                  to="/services"
                  className="hero-btn inline-flex items-center gap-2 border-2 border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 active:scale-95"
                >
                  Explore Services
                </Link> 
                */}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}