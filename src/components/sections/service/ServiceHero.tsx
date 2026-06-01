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

      // ── button hover effects ──────────────────────────────────────────────
      section.querySelectorAll<HTMLElement>(".hero-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.05, duration: 0.22, ease: "power2.out" })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.28, ease: "back.out(1.5)" })
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
        <>

    <section
      ref={sectionRef}
      className="relative  min-h-[600px] overflow-hidden"
      aria-label={`${service.title} hero`}
    >
      {/* ── BACKGROUND IMAGE ───────────────────────────────────────────────── */}
      <div className="hero-image-wrap absolute inset-0 origin-center">
        <img
          src={service.heroImage}
          alt={service.title}
          className="hero-image absolute inset-0 h-[115%] w-full object-cover -top-[7.5%]"
          loading="eager"
          draggable={false}
        />

        {/* shimmer sweep */}
        {/* <div className="hero-overlay-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-[-12deg] pointer-events-none z-10" /> */}

        {/* deep black base */}
        <div className="absolute inset-0 bg-black/35" />

        {/* directional gradient — left content zone */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" /> */}

        {/* orange atmospheric glow — top-right */}
        {/* <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-orange-600/20 blur-[120px] pointer-events-none" /> */}

        {/* bottom vignette */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" /> */}
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-[600px] items-center py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-4xl">

            {/* Breadcrumb badge */}
            <div className="hero-badge mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[8px] text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Skyveon Solutions
                <ChevronRight size={14} className="text-white/50" />
                <span className="text-orange-300">{service.title}</span>
              </span>
            </div>

            {/* Orange accent line */}
            <div
              className="hero-accent-line mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              aria-hidden="true"
            />

            {/* Title — masked line reveal */}
            <div className="space-y-1">
              <div className=" leading-none">
                <h1 className="hero-line text-3xl md:text-5xl  font-semibold leading-[0.9] tracking-tight text-white">
                  {service.title}
                </h1>
              </div>

              <div className=" leading-none">
                <h2 className="hero-line text-3xl md:text-5xl  font-semibold  font-black leading-[0.9] tracking-tight">
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    {service.subtitle}
                  </span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="hero-copy mt-8 max-w-2xl text-lg md:text-lg leading-8 text-white/75">
              {service.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="hero-btn inline-flex items-center gap-2 bg-[#FF6B00] px-8 py-4 text-white font-semibold shadow-xl shadow-orange-600/30 transition-colors duration-200 hover:from-orange-400 hover:to-red-400"
              >
                Get Started
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
{/* 
              <Link
                to="/services"
                className="hero-btn inline-flex items-center gap-2  border border-white/25 bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold transition-colors duration-200 hover:bg-white/20 hover:border-white/40"
              >
                Explore Services
              </Link> */}
            </div>

          </div>
        </div>
      </div>

    </section>
    </>
  );
}