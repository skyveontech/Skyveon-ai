"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "Digital Product Engineering",
    description:
      "Web/mobile experiences with robust APIs. Design systems, performance budgets, DX you can feel.",
    image: "/images/services/digital.avif",
    tags: ["Next.js", "React Native", "Edge/SSR", "Web Vitals"],
    link: "/services/digital-product-engineering",
    tag: "01",
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "Cloud & DevOps (SRE)",
    description:
      "IaC, CI/CD, policy-as-code, observability, reliability at scale. Golden paths you can reuse.",
    image: "/images/services/cloud.avif",
    tags: ["Terraform", "EKS/GKE", "ArgoCD", "OpenTelemetry"],
    link: "/services/cloud-devops",
    tag: "02",
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "Pipelines, lakehouse models, semantic layers, and exec dashboards. Measurable freshness.",
    image: "/images/services/data.avif",
    tags: ["dbt", "Spark", "Delta/Lake", "Superset"],
    link: "/services/data-engineering-analytics",
    tag: "03",
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "Enterprise Platforms",
    description:
      "Workday HCM/Finance & Salesforce clouds, integrated end-to-end with guardrails.",
    image: "/images/services/enterprise.avif",
    tags: ["Workday", "Salesforce", "Mulesoft", "Security"],
    link: "/services/enterprise-platforms",
    tag: "04",
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Private LLM assistants with guardrails, forecasting & anomaly detection that ship.",
    image: "/images/services/ai.avif",
    tags: ["RAG", "LLM Eval", "Vector DB", "Guardrails"],
    link: "/services/ai-machine-learning",
    tag: "05",
    accent: "from-orange-500 to-amber-400",
  },
];

export default function ServicesSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ─── Entrance Animations ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Badge reveal
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      );

      // Title word-by-word stagger
      const titleWords = titleRef.current?.querySelectorAll(".word");
      if (titleWords?.length) {
        tl.fromTo(
          titleWords,
          { opacity: 0, y: 30, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.25",
        );
      }

      // Decorative line
      tl.fromTo(
        ".heading-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
        "-=0.3",
      );

      // Slider panel
      tl.fromTo(
        sliderRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );

      // Nav controls
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.35",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Slide Change Animations ──────────────────────────────────────────────
  const animateSlideChange = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const xFrom = direction === "next" ? 30 : -30;

    gsap.fromTo(
      ".active-card-content",
      { opacity: 0, x: xFrom, filter: "blur(4px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power3.out",
        delay: 0.15,
        onComplete: () => setIsAnimating(false),
      },
    );
  };

  // ─── Progress bar animation ───────────────────────────────────────────────
  useEffect(() => {
    if (!progressFillRef.current) return;
    gsap.to(progressFillRef.current, {
      scaleX: (activeIndex + 1) / slides.length,
      duration: 0.5,
      ease: "power2.out",
      transformOrigin: "left center",
    });
  }, [activeIndex]);

  // ─── Nav button hover ─────────────────────────────────────────────────────
  const handleNavHover = (el: HTMLElement, entering: boolean) => {
    gsap.to(el, {
      scale: entering ? 1.08 : 1,
      duration: 0.25,
      ease: entering ? "back.out(2)" : "power2.out",
    });
  };

  const handleNavClick = (el: HTMLElement) => {
    gsap
      .timeline()
      .to(el, { scale: 0.92, duration: 0.1, ease: "power2.in" })
      .to(el, { scale: 1.06, duration: 0.2, ease: "back.out(3)" })
      .to(el, { scale: 1, duration: 0.15, ease: "power2.out" });
  };

  // ─── Slide words for stagger ──────────────────────────────────────────────
  const wrapWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block">
        {word}&nbsp;
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-8 lg:py-12 bg-white z-50">
      {/* ── Heading ────────────────────────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="relative max-w-4xl mx-auto text-center px-6">
        <span
          ref={badgeRef}
          className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 tracking-wide transition-all duration-300 hover:bg-orange-100 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/5 cursor-default">
          Powered By Innovation
        </span>

        <h2
          ref={titleRef}
          className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 perspective-[800px]"
          style={{ perspective: "800px" }}>
          {wrapWords("Enterprise Solutions")}
          <br />
          <span className="text-3xl lg:text-4xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
            {wrapWords("Built To Scale")}
          </span>
        </h2>

        {/* Decorative line */}
        <div className="heading-line mt-8 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
      </div>

      {/* ── Slider ─────────────────────────────────────────────────────────── */}
      <div ref={sliderRef} className="relative mt-2 lg:mt-10">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          centeredSlides
          loop
          speed={800}
          grabCursor
          slidesPerView="auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          autoplay={{
            delay: 3800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.6,
            scale: 0.84,
            slideShadows: false,
          }}
          className="!overflow-visible">
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="!w-[320px] lg:!w-[600px]">
              {({ isActive }) => (
                <div
                  className={`group relative overflow-hidden rounded-[32px] bg-white border transition-all duration-500 transform-gpu ${
                    isActive
                      ? "border-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)] hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(255,107,0,0.12)] hover:border-orange-200"
                      : "border-slate-100 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                  }`}>
                  
                  {/* Image */}
                  <div className="relative h-[400px] lg:h-[410px] overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div
                    className={`absolute bottom-0 left-0 w-full p-7 lg:p-9 text-white ${
                      isActive ? "active-card-content" : ""
                    }`}>
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
                      {slide.title}
                    </h3>

                    <p className="mt-3 text-base lg:text-lg leading-relaxed text-white/80 max-w-sm">
                      {slide.description}
                    </p>

                    <Link
                      to={slide.link}
                      className={`group/btn mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r ${slide.accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/30 active:scale-[0.97]`}>
                      Explore Solution
                      <ArrowRight 
                        size={16} 
                        strokeWidth={2.5} 
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Navigation & Progress ───────────────────────────────────────────── */}
      <div
        ref={navRef}
        className="relative mt-10 flex flex-col items-center gap-6">
        {/* Dot indicators */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                swiperRef.current?.slideToLoop(i);
                setActiveIndex(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-7 h-2.5 bg-orange-500 shadow-md shadow-orange-500/20"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous slide"
            onMouseEnter={(e) => handleNavHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleNavHover(e.currentTarget, false)}
            onClick={(e) => {
              handleNavClick(e.currentTarget);
              animateSlideChange("prev");
              swiperRef.current?.slidePrev();
            }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 hover:-translate-y-1 hover:shadow-md">
            <ArrowLeft size={18} strokeWidth={2} />
          </button>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="relative w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              ref={progressFillRef}
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ transform: `scaleX(${1 / slides.length})` }}
            />
          </div>

          <button
            aria-label="Next slide"
            onMouseEnter={(e) => handleNavHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleNavHover(e.currentTarget, false)}
            onClick={(e) => {
              handleNavClick(e.currentTarget);
              animateSlideChange("next");
              swiperRef.current?.slideNext();
            }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 hover:-translate-y-1 hover:shadow-md">
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Slide counter */}
        <p className="text-sm font-medium text-slate-400 tabular-nums">
          <span className="text-slate-800 font-semibold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          &nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}