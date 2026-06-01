"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

export default function ServiceCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);

    gsap.set(q(".cta-content"), {
      opacity: 0,
      y: 48,
    });

    gsap.to(q(".cta-content"), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    gsap.to(q(".light-beam-1"), {
      x: 200,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
      },
    });

    gsap.to(q(".light-beam-2"), {
      x: -150,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12">
      {/* BACKGROUND */}
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/images/CTA-banner.webp"
          alt=""
          loading="lazy"
          className="cta-bg h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* BRAND OVERLAY */}
      </div>

      {/* LIGHT STREAKS */}
      <div className="light-beam-1 absolute left-[-20%] top-1/2 h-[140px] w-[1200px] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-white/0 blur-3xl" />

      <div className="light-beam-2 absolute right-[-20%] top-[55%] h-[120px] w-[1000px] -translate-y-1/2 rotate-[6deg] bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-red-500/0 blur-3xl" />

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="cta-content">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur">
            Future-Ready AI Solutions
          </span>

          <h2 className="mt-8 text-3xl md:text-xl lg:text-5xl font-semibold tracking-tight text-white">
            READY TO
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              BUILD WHAT'S NEXT
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-sm md:text-lg leading-8 text-slate-300">
            Transform your business with scalable cloud platforms, intelligent
            automation, modern applications, and enterprise AI solutions
            engineered for long-term growth.
          </p>

          <Link
            to="/contact"
            className="hero-btn mt-2 group inline-flex items-center gap-2  bg-[#FF6B00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/20 hover:text-[#FF6B00] hover:bg-white border-2 border-[#FF6B00]">
            Schedule Consultation
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
