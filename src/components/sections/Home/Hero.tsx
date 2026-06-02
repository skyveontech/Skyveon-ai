import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import heroimg from "@/assets/hero-banner.webp";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.set(
      [
        ".hero-title-inner",
        ".hero-desc-line",
        ".hero-image",
        ".hero-btn",
        ".hero-panel",
        ".floating-card-1",
        ".floating-card-2",
      ],
      {
        force3D: true,
        willChange: "transform, opacity",
      },
    );

    // Hero Entrance Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
      onComplete: () => {
        gsap.set(
          [
            ".hero-title-inner",
            ".hero-desc-line",
            ".hero-desc-line-mini",
            ".hero-image",
            ".hero-btn",
            ".hero-panel",
            ".floating-card-1",
            ".floating-card-2",
          ],
          {
            clearProps: "willChange",
          },
        );
      },
    });

    tl.from(".hero-badge", {
      opacity: 0,
      y: 20,
      duration: 0.5,
    })
      .from(
        ".hero-title-inner",
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.2",
      )
      .from(
        ".hero-desc-line",
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.7,
        },
        "-=0.65",
      )
      .from(
        ".hero-btn",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4",
      )
      .from(
        ".hero-image",
        {
          opacity: 0,
          scale: 1.05,
          duration: 1.5,
          ease: "power2.out",
        },
        0,
      )
       .from(
        ".hero-desc-line-mini",
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.7,
        },
        "-=0.65",
      )
      .from(
        ".hero-panel",
        {
          opacity: 0,
          x: 80,
          duration: 1,
        },
        "-=1.2",
      );
  }, []);

  // Helper: wraps each word in a clip container for the reveal
  const titleLines = ["Engineering Intelligent", "Transformation"];

  // Description split into lines for staggered reveal
  const descLines = [
    "We design, build, and scale enterprise-grade AI systems, cloud platforms, and digital products",
    "engineered for performance, reliability,and modern business growth.",
  ];

  return (
    <section
      ref={heroRef}
      className="relative md:h-screen max-h-screen py-12 md:py-8 md:mt-0 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroimg}
          alt="Skyveon AI"
          className="hero-image h-full w-full md:fixed object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/15 to-orange-500/[0.09]" />

      {/* TOP BORDER */}
      <div className="absolute top-[90px] left-0 w-full h-px bg-white/10 z-20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center md:min-h-[80vh]">
          <div className="w-full max-w-4xl md:min-w-3xl">
            {/* BADGE */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-white/80 backdrop-blur-xl px-5 py-2.5 shadow-lg shadow-orange-500/10">
              <Sparkles size={15} className="text-orange-500" />

              <span className="text-sm font-semibold tracking-wide text-orange-500">
                AI-Powered Enterprise Solutions
              </span>
            </div>

            {/* HEADING — clip-reveal per line */}
            <div className="mt-8 space-y-1">
              {titleLines.map((line, i) => (
                <div
                  key={line}
                  // clip container: hides overflow so text slides up into view
                  className="  leading-[1.0]">
                  <h1
                    className={`hero-title-inner text-5xl md:text-7xl font-bold tracking-tight ${
                      i === 1 ? "" : "text-gray-900"
                    }`}>
                    {i === 1 ? (
                      <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </h1>
                </div>
              ))}
            </div>

            {/* DESCRIPTION — line-by-line clip reveal */}
            <div className="mt-8 max-w-3xl space-y-0">
              {descLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <p className="hero-desc-line text-[17px] leading-[1.75] text-gray-900">
                    {line}
                  </p>
                </div>
              ))}
            </div>
            {/* TRUST STRIP */}
            <div className="mt-8  flex-wrap hidden lg:flex items-center gap-6 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Enterprise-Grade Security
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                AI + Cloud + Data
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-500" />
                Workday & Salesforce
              </div>
            </div>
               {/* MICRO TEXT */}
            <p className="mt-5 hero-desc-line-mini hidden lg:block text-sm text-slate-900">
              Helping enterprises modernize through AI, Cloud, Data Engineering,
              Workday, Salesforce, and Digital Product Engineering.
            </p>
            {/* BUTTONS */}
            <div className="mt-10  flex flex-col sm:flex-row gap-4   ">
              <Link
                to="/services/digital-product-engineering"
                className="hero-btn group inline-flex  justify-center items-center  gap-2 border-[#FF6B00]   bg-[#FF6B00] px-6 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/20 hover:text-[#FF6B00] hover:bg-white border-2 hover:border-[#FF6B00]">
                Explore Services
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="hero-btn inline-flex  justify-center items-center   backdrop-blur-md px-7 py-4 text-base font-medium text-[#FF6B00] hover:bg-[#FF6B00] border-2 hover:text-white  ">
                Book Consultation
              </Link>
            </div>

         
          </div>
          <div className="hero-panel hidden lg:block relative max-w-[460px] ml-auto">
            <div className="overflow-hidden rounded-[32px] border border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orange-500 font-semibold">
                    Technology Ecosystem
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    End-to-End Innovation
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-500">Active</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="p-5 text-center">
                  <h4 className="text-2xl font-bold text-slate-900">50+</h4>

                  <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                    Projects
                  </p>
                </div>

                <div className="p-5 text-center">
                  <h4 className="text-2xl font-bold text-orange-500">5</h4>

                  <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                    Practices
                  </p>
                </div>

                <div className="p-5 text-center">
                  <h4 className="text-2xl font-bold text-slate-900">99.9%</h4>

                  <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                    Reliability
                  </p>
                </div>
              </div>

              {/* Capability Grid */}
              <div className="p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Core Capabilities
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "AI & ML",
                    "Cloud",
                    "Data",
                    "DevOps",
                    "Enterprise Apps",
                    "Digital Products",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom */}
              <div className="border-t border-slate-100 bg-gradient-to-r from-orange-50/80 to-white px-6 py-5">
                <p className="text-sm font-medium text-slate-700">
                  Delivering transformation through
                </p>

                <p className="mt-1 text-sm font-semibold text-orange-500">
                  AI • Cloud • Data • Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
