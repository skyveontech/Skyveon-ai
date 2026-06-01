import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import heroimg from "@/assets/soul-banner-white.svg";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

useGsap(() => {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  gsap.set(
    [
      ".hero-title-inner",
      ".hero-desc-line",
      ".hero-image",
      ".hero-btn",
    ],
    {
      force3D: true,
      willChange: "transform, opacity",
    }
  );

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
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
      "-=0.2"
    )

    .from(
      ".hero-desc-line",
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.7,
      },
      "-=0.65"
    )

    .from(
      ".hero-btn",
      {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      },
      "-=0.4"
    )

    .from(
      ".hero-image",
      {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power2.out",
      },
      0
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
    <section ref={heroRef} className="relative md:h-screen max-h-screen  md:mt-0 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroimg}
          alt="Skyveon AI"
          className="hero-image h-full w-full object-cover"
        />
      </div>

      {/* TOP BORDER */}
      <div className="absolute top-[90px] left-0 w-full h-px bg-white/10 z-20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center">
        <div className="max-w-3xl">
          {/* BADGE */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-orange-300">
            <Sparkles size={16} />
            AI-Powered Enterprise Solutions
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

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              to="/services/digital-product-engineering"
              className="hero-btn group inline-flex items-center gap-2  bg-[#FF6B00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/20 hover:text-[#FF6B00] hover:bg-white border-2 hover:border-[#FF6B00]">
              Explore Services
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="hero-btn inline-flex items-center   backdrop-blur-md px-7 py-4 text-base font-medium text-[#FF6B00] hover:bg-[#FF6B00] border-2 hover:text-white  ">
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
