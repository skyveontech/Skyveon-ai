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

    // Light beams animations
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
    // Added 'group' to trigger the background image zoom on section hover
    <section ref={sectionRef} className="group relative overflow-hidden py-20 lg:py-28 bg-slate-950">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/images/CTA-banner.webp"
          alt="Abstract Technology Background"
          loading="lazy"
          className="cta-bg h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />

        {/* DARK OVERLAY - layered gradients for readability */}
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* LIGHT STREAKS */}
      <div className="light-beam-1 absolute left-[-20%] top-1/2 h-[140px] w-[1200px] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-white/0 blur-3xl pointer-events-none" />

      <div className="light-beam-2 absolute right-[-20%] top-[55%] h-[120px] w-[1000px] -translate-y-1/2 rotate-[6deg] bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-red-500/0 blur-3xl pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="cta-content">
          
          {/* GLASSMORPHISM BADGE */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Future-Ready AI Solutions
          </span>

          {/* HEADING */}
          <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            READY TO
            <span className="block mt-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent pb-1">
              BUILD WHAT'S NEXT?
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300 font-medium">
            Transform your business with scalable cloud platforms, intelligent
            automation, modern applications, and enterprise AI solutions
            engineered for long-term growth.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/contact"
              className="hero-btn group inline-flex items-center gap-2 bg-[#FF6B00] border-2 border-[#FF6B00] px-8 py-4 text-base font-bold text-white rounded-xl shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-white hover:text-[#FF6B00] hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-95"
            >
              Schedule Consultation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}