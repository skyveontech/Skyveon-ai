import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";
import { Link } from "react-router-dom";

export default function FutureBanner() {
  const bannerRef = useRef<HTMLElement>(null);

  useGsap(() => {
    // =====================================================
    // INITIAL STATES
    // =====================================================

    gsap.set(".cover-left", {
      xPercent: 0,
      force3D: true,
    });

    gsap.set(".cover-right", {
      xPercent: 0,
      force3D: true,
    });

    gsap.set(
      [".future-bg"],
      {
        force3D: true,
      },
    );

    // =====================================================
    // MAIN REVEAL TIMELINE
    // =====================================================

const revealTl = gsap.timeline({
  scrollTrigger: {
    trigger: bannerRef.current,
    start: "top 75%",
    toggleActions: "play reverse play reverse",
  },

  defaults: {
    ease: "power4.out",
  },
});

// INITIAL STATES
gsap.set(".cover-left", {
  xPercent: 0,
});

gsap.set(".cover-right", {
  xPercent: 0,
});

revealTl

  // COVER OPEN
  .to(".cover-left", {
    xPercent: -100,
    duration: 1.2,
    ease: "power4.inOut",
  })

  .to(
    ".cover-right",
    {
      xPercent: 100,
      duration: 1.2,
      ease: "power4.inOut",
    },
    "<"
  )

  // OVERLAY
  .from(
    ".future-overlay",
    {
      autoAlpha: 0,
      duration: 1,
    },
    "-=0.9"
  )

  // TITLE
  .from(
    ".future-title",
    {
      autoAlpha: 0,
      y: 80,
      duration: 1,
    },
    "-=0.7"
  )

  // DESCRIPTION
  .from(
    ".future-description",
    {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.7"
  )



    // =====================================================
    // PARALLAX BACKGROUND
    // =====================================================

    gsap.to(".future-bg", {
      xPercent: -6,
      ease: "none",

      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

  

  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden py-16 lg:py-18 bg-[#F8FAFC]">
      {/* REVEAL COVERS */}
      <div className="cover-left absolute inset-y-0 left-0 w-1/2 bg-white z-30" />

      <div className="cover-right absolute inset-y-0 right-0 w-1/2 bg-white z-30" />

      {/* BACKGROUND */}
      <div className="future-bg absolute inset-0">
        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
          linear-gradient(to right, #0f172a 1px, transparent 1px),
          linear-gradient(to bottom, #0f172a 1px, transparent 1px)
        `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center">
        {/* LABEL */}
        <div className="future-overlay inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-600">
          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          Future-Ready AI Infrastructure
        </div>

        {/* TITLE */}
        <div className="mt-10 overflow-hidden">
          <h2 className="future-title text-5xl md:text-6xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-slate-900">
            Building Intelligent
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Enterprise Systems
            </span>
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="future-description mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-8 text-slate-600">
          Skyveon AI helps organizations modernize infrastructure, scale
          cloud-native platforms, and integrate AI-driven systems engineered for
          performance, security, and future growth.
        </p>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="#services"
            className="hero-btn group inline-flex items-center gap-2  bg-[#FF6B00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/20 hover:text-[#FF6B00] hover:bg-white border-2 hover:border-[#FF6B00]">
            Explore Services
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
