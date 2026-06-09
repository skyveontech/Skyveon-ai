"use client";

import { useRef } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";
import { Link } from "react-router-dom";

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    // Accessibility
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    gsap.set(
      [
        ".why-badge",
        ".why-title-line",
        ".why-description",
        ".why-cta",
        ".why-stats",
        ".why-visual",
        ".why-float-pill",
        ".why-float-stat",
      ],
      {
        willChange: "transform, opacity",
        force3D: true,
      },
    );

    gsap.set(".why-badge", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".why-title-line", {
      yPercent: 110,
      opacity: 0,
    });

    gsap.set([".why-description", ".why-cta", ".why-stats"], {
      opacity: 0,
      y: 24,
    });

    gsap.set(".why-visual", {
      opacity: 0,
      scale: 0.96,
      rotate: -2,
    });

    gsap.set(".why-float-pill", {
      opacity: 0,
      y: -12,
      scale: 0.95,
    });

    gsap.set(".why-float-stat", {
      opacity: 0,
      x: -16,
      scale: 0.95,
    });

    // ------------------------------------
    // MASTER TIMELINE
    // ------------------------------------
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },

      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },

      onComplete: () => {
        // --------------------------------
        // FLOATING EFFECTS
        // Only start AFTER reveal
        // --------------------------------

        gsap.to(".why-float-pill", {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".why-float-stat", {
          y: 10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    tl.to(".why-badge", {
      opacity: 1,
      y: 0,
      duration: 0.5,
    })
      .to(
        ".why-title-line",
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.15",
      )
      .to(
        ".why-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.55",
      )
      .to(
        ".why-cta",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.5",
      )
      .to(
        ".why-stats",
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
        },
        "-=0.45",
      )
      .to(
        ".why-visual",
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=1",
      )
      .to(
        ".why-float-pill",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
        },
        "-=0.55",
      )
      .to(
        ".why-float-stat",
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
        },
        "-=0.45",
      );

    // ------------------------------------
    // IMAGE PARALLAX
    // ------------------------------------

    gsap.to(".why-img-inner", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const stats = [
    { value: "+87%", label: "AI Efficiency" },
    { value: "3×", label: "Faster Delivery" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-8 lg:py-12"
    >
      {/* subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* ── LEFT CONTENT ── */}
          <div>
            {/* BADGE */}
            <div className="why-badge inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-300 cursor-default">
              <Sparkles size={15} className="animate-pulse" />
              Why Organizations Choose Skyveon
            </div>

            {/* TITLE */}
            <div className="mt-8 space-y-1">
              <div className="overflow-hidden">
                <h2 className="why-title-line text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[0.95] tracking-tight text-slate-900">
                  Built For
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="why-title-line text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[0.95] tracking-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                    Modern Enterprise
                  </span>
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="why-title-line text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[0.95] tracking-tight text-slate-900">
                  Transformation
                </h2>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="why-description mt-8 max-w-lg text-lg leading-8 text-slate-500">
              We combine AI innovation, cloud-native architecture, and
              enterprise engineering expertise to deliver scalable digital
              systems built for long-term business growth.
            </p>

            {/* CTA */}
            <Link
              to="/services/digital-product-engineering"
              className="why-cta group inline-flex items-center gap-3 bg-[#FF6B00] border-2 border-[#FF6B00] px-8 py-4 text-base font-bold text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-white hover:text-[#FF6B00] hover:shadow-orange-500/40 hover:-translate-y-1 mt-5"
            >
              Explore Capabilities
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* STATS ROW */}
            <div className="mt-12 flex items-center gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="why-stats group flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 cursor-default"
                >
                  <p className="text-2xl font-bold text-slate-900 tracking-tight transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-orange-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="relative">
            
            {/* FLOATING PILL — top centre */}
            <div className="why-float-pill absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 backdrop-blur-xl px-5 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.10)] transition-colors duration-300 hover:border-orange-300 hover:shadow-[0_8px_32px_rgba(255,107,0,0.15)] cursor-default">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 transition-colors duration-300 hover:bg-orange-100">
                <Sparkles size={14} className="text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  AI-Powered
                </p>
                <p className="text-xs text-slate-400 leading-tight">
                  Cloud Architecture
                </p>
              </div>
            </div>

            {/* MAIN IMAGE */}
            <div className="why-visual group relative overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.14)] transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(255,107,0,0.15)]">
              {/* overflow wrapper for parallax */}
              <div className="why-img-inner will-change-transform h-full w-full">
                <img
                  src="/images/why-us.webp"
                  alt="Skyveon AI Infrastructure"
                  className="h-[540px] w-full object-cover scale-110 transition-transform duration-1000 ease-out group-hover:scale-[1.14]"
                  loading="lazy"
                />
              </div>

              {/* bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

              {/* caption inside image */}
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-base font-semibold text-white">
                  Skyveon AI Infrastructure
                </p>
                <p className="mt-0.5 text-sm text-white/60">
                  Enterprise-Grade · Cloud-Native · Intelligent
                </p>
              </div>
            </div>

            {/* FLOATING STAT — bottom left */}
            <div className="why-float-stat absolute -bottom-6 -left-6 z-20 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-xl px-6 py-5 shadow-[0_10px_40px_rgba(15,23,42,0.10)] transition-all duration-300 hover:border-orange-200 hover:shadow-[0_15px_50px_rgba(255,107,0,0.15)] cursor-default">
              <p className="text-sm text-slate-500">AI Efficiency</p>
              <h4 className="mt-1 text-4xl font-bold text-slate-900 tracking-tight">
                +87%
              </h4>
              <p className="mt-1 text-sm font-medium text-orange-500">
                Workflow Optimization
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}