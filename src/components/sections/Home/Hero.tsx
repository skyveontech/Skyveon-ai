import { ArrowRight, Sparkles, Shield, Cpu, Database } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import heroimg from "@/assets/hero-bg.webp";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Force GPU acceleration during the animation phase
    gsap.set(
      [
        ".hero-badge",
        ".hero-title-inner",
        ".hero-desc-line",
        ".trust-item",
        ".hero-btn",
        ".hero-panel",
        ".capability-pill",
      ],
      { willChange: "transform, opacity" },
    );

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Clear willChange to free up browser memory after animation
        gsap.set(
          [
            ".hero-badge",
            ".hero-title-inner",
            ".hero-desc-line",
            ".trust-item",
            ".hero-btn",
            ".hero-panel",
            ".capability-pill",
          ],
          { clearProps: "willChange" },
        );
      },
    });

    // Swapped .from() to .fromTo() to fix React 18 Strict Mode visibility bugs
    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
    )
      .fromTo(
        ".hero-title-inner",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.08, duration: 1 },
        "-=0.3",
      )
      .fromTo(
        ".hero-desc-line",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 },
        "-=0.6",
      )
      .fromTo(
        ".trust-item",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 },
        "-=0.5",
      )
      .fromTo(
        ".hero-btn",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
        "-=0.4",
      )
      .fromTo(
        ".hero-panel",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.8",
      )
      .fromTo(
        ".capability-pill",
        { opacity: 0, scale: 0.95, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.5",
      );

    // Highly optimized parallax scroll (only transforms the Y axis)
    gsap.to(".hero-bg-img", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const titleLines = ["Engineering Intelligent", "Transformation"];
  const descLines = [
    "We design, build, and scale enterprise-grade AI systems, cloud platforms, and digital products",
    "engineered for performance, reliability, and modern business growth.",
  ];

  return (
    <section
      ref={heroRef}
      className="relative  md:h-screen  max-h-[1050px] py-16 md:py-0 flex items-center overflow-hidden bg-slate-50">
      {/* PERFORMANCE FIX: Removed blur filters and animated pulse gradients */}
      <div className="absolute inset-0 overflow-hidden bg-slate-900">
        <img
          src={heroimg}
          alt="Skyveon AI Background"
          className="hero-bg-img absolute inset-0 h-[120%] w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/80 to-white/25" />

        <div className="absolute inset-0 bg-slate-950/10" />
      </div>

      <div className="absolute top-[90px] left-0 w-full h-px  z-20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-12 lg:gap-2 items-center">
          {/* LEFT COLUMN */}
          <div className="w-full max-w-4xl">
            <div className="hero-badge mt-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-white px-4 py-2 shadow-sm">
              <Sparkles size={14} className="text-orange-500" />
              <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
                AI-Powered Enterprise Solutions
              </span>
            </div>

            <div className="mt-6 space-y-2">
              {titleLines.map((line, i) => (
                <div key={line} className="overflow-hidden py-1">
                  <h1
                    className={`hero-title-inner text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] ${
                      i === 1 ? "" : "text-slate-900"
                    }`}>
                    {i === 1 ? (
                      <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </h1>
                </div>
              ))}
            </div>

            <div className="mt-6 max-w-2xl space-y-1">
              {descLines.map((line, i) => (
                <div key={i} className="overflow-hidden py-0.5">
                  <p className="hero-desc-line text-base md:text-lg text-slate-600 leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 hidden lg:flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
              <div className="trust-item flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50">
                <Shield size={14} className="text-emerald-500" />
                <span>Enterprise-Grade Security</span>
              </div>
              <div className="trust-item flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50">
                <Cpu size={14} className="text-orange-500" />
                <span>AI + Cloud + Data</span>
              </div>
              <div className="trust-item flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50">
                <Database size={14} className="text-sky-500" />
                <span>Workday & Salesforce</span>
              </div>
            </div>

            {/* PERFORMANCE FIX: Replaced complex pseudo-element logic with standard Tailwind hover states for 100% reliable visibility */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/services/digital-product-engineering"
                className="hero-btn group flex justify-center items-center gap-2 bg-[#FF6B00] hover:bg-[#e66000] px-7 py-3.5 text-sm font-bold text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-orange-500/30 hover:-translate-y-0.5">
                Explore Services
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="hero-btn flex justify-center items-center bg-white border-2 border-slate-200 hover:border-[#FF6B00] px-7 py-3.5 text-sm font-semibold text-slate-800 hover:text-[#FF6B00] rounded-xl transition-all duration-300">
                Book Consultation
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hero-panel hidden lg:block relative max-w-[440px] ml-auto">
            {/* PERFORMANCE FIX: Reduced backdrop blur intensity and removed saturate-150 */}
            <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/70 backdrop-blur-md shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-orange-600 font-bold">
                    Technology Ecosystem
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                    End-to-End Innovation
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white bg-slate-50/40">
                <div className="p-4 text-center">
                  <h4 className="text-xl font-black text-slate-900">50+</h4>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Projects
                  </p>
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-xl font-black text-[#FF6B00]">5</h4>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Practices
                  </p>
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-xl font-black text-slate-900">99.9%</h4>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Reliability
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Core Capabilities
                </p>
                <div className="grid grid-cols-2 gap-2.5">
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
                      className="capability-pill flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-[#FF6B00] hover:text-[#FF6B00] cursor-default">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white bg-gradient-to-r from-orange-50/50 to-transparent px-6 py-4">
                <p className="text-xs font-medium text-slate-500">
                  Delivering transformation through
                </p>
                <p className="mt-1 text-xs font-bold text-[#FF6B00] tracking-wide uppercase">
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
