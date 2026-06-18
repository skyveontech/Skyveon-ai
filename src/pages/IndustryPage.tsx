import { Link, useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { industries } from "@/data/industries";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industries.find((item) => item.slug === slug);

  /* ── refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTagRef = useRef<HTMLSpanElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroParaRef = useRef<HTMLParagraphElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);
  const outcomesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!industry) return;

    const ctx = gsap.context(() => {
      /* ── HERO ── */
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // parallax image
      gsap.to(heroImgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // staggered entry
      heroTl
        .fromTo(
          heroTagRef.current,
          { opacity: 0, y: 24, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        )
        .fromTo(
          heroH1Ref.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
          "-=0.3",
        )
        .fromTo(
          heroParaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        );

      /* ── OVERVIEW ── */
      const overviewTl = gsap.timeline({
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      overviewTl
        .fromTo(
          ".overview-label",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
        )
        .fromTo(
          ".overview-heading",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2",
        )
        .fromTo(
          ".overview-body",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          ".overview-image",
          { opacity: 0, x: 60, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9 },
          "-=0.7",
        );

      /* ── CHALLENGES ── */
      // Separate heading and paragraph animations to avoid conflicting transforms
      gsap.fromTo(
        ".challenges-heading",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: challengesRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".challenges-subtext",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: challengesRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".challenge-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: challengesRef.current,
            start: "top 75%",
          },
        },
      );

      /* ── SOLUTIONS ── */
      gsap.fromTo(
        ".solution-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: "top 75%",
          },
        },
      );

      /* ── OUTCOMES ── */
      gsap.fromTo(
        ".outcome-card",
        { opacity: 0, y: 40, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: outcomesRef.current,
            start: "top 78%",
          },
        },
      );

      /* ── STATS counter ── */
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        once: true, // Fix: only fire once so counter doesn't re-run on scroll back
        onEnter: () => {
          gsap.fromTo(
            ".stat-item",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power3.out",
            },
          );

          // Fix: removed the broken double-animation; only run the proxy approach
          document
            .querySelectorAll<HTMLElement>(".stat-value")
            .forEach((el) => {
              const raw = el.dataset.value ?? "";
              const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
              const suffix = raw.replace(/[0-9.]/g, "");
              if (!isNaN(num)) {
                const proxy = { val: 0 };
                gsap.to(proxy, {
                  val: num,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate() {
                    el.textContent =
                      (Number.isInteger(num)
                        ? Math.round(proxy.val)
                        : proxy.val.toFixed(1)) + suffix;
                  },
                });
              }
            });
        },
      });

      /* ── CTA ── */
      gsap.fromTo(
        ".cta-inner > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 78%",
          },
        },
      );

      /* ── Hover tilt for cards ── */
      const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
      tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
          gsap.to(card, {
            rotateX: y,
            rotateY: x,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 600,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    });

    return () => ctx.revert();
  }, [industry]);

  if (!industry) {
    return (
      <div className="pt-40 text-center font-semibold text-slate-500">
        Industry Not Found
      </div>
    );
  }

  return (
    // Fix: removed <link> tag from JSX body — add Google Fonts to your index.html <head> instead:
    // <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
    <div className="overflow-x-hidden">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative md:min-h-[80vh] overflow-hidden flex items-center">
        {/* Parallax image */}
        <img
          ref={heroImgRef}
          src={industry.heroImage}
          alt={industry.title}
          className="absolute inset-0 h-[110%] w-full object-cover -top-[5%]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-28 pt-42">
          {/* Accent pill */}
          <span
            ref={heroTagRef}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg"
            style={{ opacity: 0 }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
            Industry Solutions
          </span>

          <h1
            ref={heroH1Ref}
            className="mt-8 max-w-4xl text-6xl md:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            style={{ opacity: 0 }}>
            {industry.title}
          </h1>

          <p
            ref={heroParaRef}
            className="mt-7 max-w-2xl text-lg text-white/75 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}>
            {industry.description}
          </p>

          <div
            className="hero-cta mt-10 flex items-center gap-5"
            style={{ opacity: 0 }}>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full border-2 border-orange-500 bg-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-orange-600 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95">
              Schedule Consultation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            {/* <button className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm">
                ↓
              </span>
              Explore More
            </button> */}
          </div>
        </div>

        {/* Bottom fade */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" /> */}
      </section>

      {/* ═══════════════════ OVERVIEW ═══════════════════ */}
      <section
        ref={overviewRef}
        className="relative overflow-hidden py-24 lg:py-32 bg-white">
        {/* Subtle background pattern (optional, adds depth) */}
        <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* ── LEFT COLUMN: CONTENT ── */}
            <div>
              {/* Eyebrow with interactive expanding line */}
              <span
                className="overview-label group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-6 cursor-default transition-colors duration-300 hover:text-orange-600"
                style={{ opacity: 0 }}>
                <span className="h-px w-6 bg-orange-500 transition-all duration-300 group-hover:w-10 group-hover:bg-orange-600" />
                Industry Overview
              </span>

              {/* Heading */}
              <h2
                className="overview-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight"
                style={{ opacity: 0 }}>
                Understanding
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 bg-clip-text text-transparent pb-2">
                  The Industry
                </span>
              </h2>

              {/* Body Text */}
              <div
                className="overview-body mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-slate-600 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}>
                <p>{industry.overview}</p>
              </div>

              {/* Future container for buttons/links */}
              <div
                className="overview-body mt-10 flex items-center gap-3"
                style={{ opacity: 0 }}></div>
            </div>

            {/* ── RIGHT COLUMN: IMAGE ── */}
            <div
              className="overview-image relative group cursor-default"
              style={{ opacity: 0 }}>
              {/* Decorative background blob - Intensifies on hover */}
              <div
                className={`absolute -inset-4 rounded-[48px] bg-gradient-to-br ${industry.accent} opacity-15 blur-2xl transition-all duration-700 group-hover:opacity-30 group-hover:blur-[32px] group-hover:scale-105 pointer-events-none`}
              />

              {/* Image Wrapper - Lifts and adds deep shadow on hover */}
              <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] group-hover:border-orange-100/50">
                <img
                  src={industry.overviewImage}
                  alt={industry.title}
                  loading="lazy"
                  className="w-full object-cover aspect-[4/3] transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* Subtle glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              </div>

              {/* Floating badge - Interactive tactile hover */}
              <div className="absolute -bottom-6 -left-6 z-20 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,107,0,0.12)] hover:border-orange-100">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${industry.accent} flex items-center justify-center text-white shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-xl">★</span>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Trusted by
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    500+ Companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════ CHALLENGES ═══════════════════ */}
      <section
        ref={challengesRef}
        className="py-8 md:py-12 bg-slate-950 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          {/* Fix: split heading and paragraph into separate className targets */}
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p
                className="challenges-heading text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4"
                style={{ opacity: 0 }}>
                Pain Points
              </p>
              <h2
                className="challenges-heading text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
                style={{ opacity: 0 }}>
                Industry Challenges
              </h2>
            </div>
            {/* Fix: use challenges-subtext so it gets a y-based tween, not x */}
            <p
              className="challenges-subtext max-w-sm text-sm leading-relaxed text-slate-400"
              style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}>
              The obstacles modern businesses face — and why they can't afford
              to ignore them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industry.challenges.map((item, i) => (
              <div
                key={item}
                className="challenge-card tilt-card group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-default"
                style={{ opacity: 0 }}>
                {/* Number */}
                <span className="text-8xl font-black text-orange-500 opacity-20 absolute top-4 right-6 leading-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`mb-5 h-10 w-10 rounded-xl bg-gradient-to-br ${industry.accent} flex items-center justify-center text-white`}>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2L2 7v11h5v-5h6v5h5V7L10 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  className="text-sm leading-relaxed text-slate-300"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUTIONS ═══════════════════ */}
      <section ref={solutionsRef} className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            How We Help
          </p>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-14">
            How{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Skyveon
            </span>{" "}
            Helps
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {industry.solutions.map((solution, i) => (
              <div
                key={solution}
                className="solution-card tilt-card group flex gap-6  items-center rounded-3xl border border-slate-200 p-8 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                style={{ opacity: 0 }}>
                <div
                  className={`shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br ${industry.accent} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {i + 1}
                </div>
                <p
                  className="text-slate-600 leading-relaxed mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section
        ref={statsRef}
        className="py-24 bg-orange-500 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
          <span className="text-[20vw] font-black text-white whitespace-nowrap tracking-tighter">
            IMPACT
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-2 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
            {industry.stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item text-center"
                style={{ opacity: 0 }}>
                <h3
                  className="stat-value text-6xl lg:text-7xl font-black text-white leading-none"
                  data-value={stat.value}>
                  {stat.value}
                </h3>
                <p className="mt-3 text-sm font-medium text-white/70 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ OUTCOMES ═══════════════════ */}
      <section ref={outcomesRef} className=" py-8 md:py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            Results
          </p>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-14">
            Business Outcomes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="outcome-card tilt-card group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
                style={{ opacity: 0 }}>
                {/* Accent corner */}
                <div
                  className={`absolute top-0 right-0 h-24 w-24 rounded-bl-[48px] bg-gradient-to-bl ${industry.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />

                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {outcome.title}
                </h3>
                <div className="my-4 h-px bg-slate-100" />
                <p
                  className="text-sm leading-loose text-slate-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        className="relative overflow-hidden py-14 md:py-20 lg:py-28">
        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/bg-metrics-orange-white.webp"
            alt=""
            className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-100 blur-[10px]"
          />
          <div className="absolute inset-0 bg-slate-950/10" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          {/* BADGE */}
          <span className="mb-6 inline-block rounded-full bg-orange-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white md:mb-8 md:px-5 md:text-xs">
            Get Started
          </span>

          {/* HEADING — <br /> removed, wraps naturally at each size */}
          <h2 className="text-[clamp(2rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Ready To Transform{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Your Organization?
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:mt-8 md:text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Discover how Skyveon can help modernize, optimize, and scale your
            business — from day one.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full border-2 border-orange-500 bg-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-orange-600 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95">
              Schedule Consultation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* <Link
              to="/case-studies"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/50 hover:bg-white/5 hover:text-white sm:w-auto md:px-8">
              View Case Studies
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
