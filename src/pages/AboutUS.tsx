import { useEffect, useRef } from "react";
import { ArrowRight, Zap, Lock, Heart, BookOpen, Quote } from "lucide-react";

import gsap from "@/lib/gsap";

/* ── Data ──────────────────────────────────────────────────────────── */
const principles = [
  {
    icon: Zap,
    title: "Outcomes over optics",
    description: "We measure success in shipped systems, not in glossy slides.",
  },
  {
    icon: Lock,
    title: "Security by default",
    description:
      "Privacy, compliance, and governance are built in—not bolted on.",
  },
  {
    icon: Heart,
    title: "Human-centric engineering",
    description:
      "Technology only matters when it empowers the people who use it.",
  },
  {
    icon: BookOpen,
    title: "Knowledge transfer",
    description:
      "We document, teach, and hand over so solutions live long after launch.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered", target: 50, suffix: "+" },
  { value: "99.9%", label: "Platform Reliability", target: 99.9, suffix: "%", decimals: 1 },
  { value: "5+", label: "Technology Practices", target: 5, suffix: "+" },
  { value: "24/7", label: "Support", target: 24, suffix: "/7" },
];

const whyItems = [
  {
    title: "Accountable Builders",
    desc: "One team that owns the journey end-to-end. No hand-offs, no excuses.",
  },
  {
    title: "Engineering Discipline",
    desc: "Structured delivery with real metrics—uptime, cycle time, defect rates.",
  },
  {
    title: "Depth Across Stacks",
    desc: "Cloud, Data, AI, Workday & Salesforce. Not just breadth, but proven mastery.",
  },
  {
    title: "Operable Outcomes",
    desc: "We don't stop at launch. We ensure systems keep running at scale.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand business goals, users, and technology challenges.",
  },
  {
    number: "02",
    title: "Design",
    description: "Create scalable architectures and exceptional experiences.",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop secure, reliable, and future-ready solutions.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Launch with confidence using automation and observability.",
  },
  {
    number: "05",
    title: "Optimize",
    description: "Continuously improve performance and business outcomes.",
  },
];

/* ── Images ─────────────────────────────────────────────────────────── */
const heroImg =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80&auto=format&fit=crop";
const teamImg =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop";
const bannerImg =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop";
const coCreateImg =
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&q=80&auto=format&fit=crop";
const cultureImg =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop";

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // HERO
      gsap.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".hero-line", {
        opacity: 0,
        y: 80,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".hero-p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
      });

      gsap.from(".hero-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.7,
      });

      // GLOBAL REVEALS
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });

      // STAGGER GRIDS
      gsap.utils.toArray<HTMLElement>(".stagger-parent").forEach((parent) => {
        gsap.from(parent.querySelectorAll<HTMLElement>(".stagger-child"), {
          opacity: 0,
          y: 60,
          stagger: 0.12,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 80%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".counter").forEach((counter) => {
        const target = Number(counter.dataset.target ?? 0);
        const suffix = counter.dataset.suffix ?? "";
        const decimals = Number(counter.dataset.decimals ?? 0);
        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = `${value.current.toFixed(decimals)}${suffix}`;
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
        });
      });

      // PARALLAX
      gsap.to(".hero-overlay-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".banner-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".banner-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="text-[#1a1a1a] bg-white overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section
        className="hero-section relative  flex items-center py-8 md:py-20 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            className="hero-overlay-img w-full h-[120%] object-cover absolute top-0 left-0"
            src={heroImg}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/84 to-white/[0.08]" />
        </div>

        <div className="relative z-10 max-w-[1200px]  px-10">
          {/* Badge */}
          <div className="hero-badge inline-block border border-orange-500/[0.19] bg-orange-500/[0.05] rounded-full px-5 py-1.5 text-[13px] font-bold text-orange-500 tracking-[0.08em] uppercase mb-8">
            About Us
          </div>

          {/* Headline */}
          <h1 className="hero-h1 m-0 leading-none tracking-[-0.03em]">
            <span className="hero-line block text-[clamp(44px,7vw,88px)] font-bold text-[#0f0f0f] font-sans">
              From Curiosity
            </span>
            <span className="hero-line block text-[clamp(44px,7vw,88px)] font-bold text-orange-500 font-sans">
              to Industry Force
            </span>
          </h1>

          <p className="hero-p mt-7 max-w-[580px] text-[18px] leading-[1.75] text-[#444] font-sans">
            We are not here to sell buzzwords. We design and deliver systems
            that actually work — from resilient cloud foundations to enterprise
            AI integrations that leaders and users can trust.
          </p>

          <div className="hero-btns mt-10 flex gap-3.5 flex-wrap">
            <button className="hero-btn inline-flex items-center gap-2 bg-orange-500 text-white border-none rounded-md px-7 py-3.5 text-[15px] font-bold cursor-pointer tracking-[0.01em] transition-colors hover:bg-[#cc4f00]">
              Explore Our Services <ArrowRight size={16} />
            </button>
            <button className="hero-btn bg-transparent text-[#0f0f0f] border-2 border-black/[0.18] rounded-md px-7 py-3.5 text-[15px] font-semibold cursor-pointer transition-colors hover:border-black/40">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* ══ PURPOSE BANNER ══ */}
      <div className="banner-section relative overflow-hidden">
        <img
          className="banner-img w-full h-[200px] object-cover block"
          src={bannerImg}
          alt=""
        />
        <div className="absolute inset-0 bg-black/76 flex items-center justify-center">
          <p className="fade-up text-[clamp(18px,3vw,30px)] font-bold text-white tracking-[0.02em] text-center m-0">
            Engineers who turned enthusiasm into expertise.
          </p>
        </div>
      </div>

      {/* ══ WHO WE ARE ══ */}
      <section className="py-8 md:py-12 px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left copy */}
          <div className="fade-up">
            <p className="text-[13px] font-bold tracking-[0.1em] text-orange-500 uppercase mb-3">
              | Who We Are
            </p>
            <h2 className="text-[clamp(32px,4vw,52px)] font-semibold leading-[1.1] tracking-[-0.03em] mb-7 mt-0">
              Builders at <span className="text-orange-500">Heart</span>
            </h2>
            <p className="text-[17px] leading-[1.8] text-[#555] mb-[18px]">
              Every company has a beginning. Ours started with a group of
              engineers who were more than just coders—they were dreamers. What
              began as curiosity, side projects, and late-night builds slowly
              transformed into an industry force.
            </p>
            <p className="text-[17px] leading-[1.8] text-[#555] mb-[18px]">
              Today, those same IT enthusiasts have become veterans, guiding
              enterprises through some of the most complex technology shifts of
              our era—from resilient cloud foundations to enterprise-grade data
              platforms, Workday & Salesforce integrations, and responsibly
              embedding AI into business workflows.
            </p>
            <p className="text-[17px] leading-[1.8] text-[#555] mb-9">
              Our DNA is built on relentless curiosity, disciplined engineering,
              and a refusal to compromise on reliability or security.
            </p>
            <button className="inline-flex items-center gap-2 bg-orange-500 text-white border-none rounded-md px-7 py-3.5 text-[15px] font-bold cursor-pointer tracking-[0.01em] transition-colors hover:bg-[#cc4f00]">
              Partner With Us <ArrowRight size={15} />
            </button>
          </div>

          {/* Right image */}
          <div className="fade-up relative">
            <img
              src={teamImg}
              alt="Our team"
              className="w-full rounded-[4px] object-cover aspect-[4/3] block"
            />
            <div className="absolute -bottom-5 -left-5 bg-orange-500 text-white rounded-[4px] px-6 py-[18px]">
              <p className="m-0 text-[28px] font-semibold leading-none">50+</p>
              <p className="mt-1 mb-0 text-[12px] font-semibold tracking-[0.06em] uppercase">
                Projects Delivered
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION QUOTE ══ */}
      <section className="bg-[#FFF4EE] py-8 md:py-12 px-10">
        <div className="mission-quote max-w-[860px] mx-auto text-center">
          <Quote size={48} color="#E85A00" className="opacity-25 mb-6 mx-auto" />
          <p className="text-[clamp(18px,2.5vw,26px)] leading-[1.6] text-[#1a1a1a] italic mb-6">
            We are builders at heart—engineers who turned enthusiasm into
            expertise. Our mission is simple: make technology deliver real
            outcomes, without the noise.
          </p>
          <p className="m-0 text-[12px] font-bold tracking-[0.12em] text-[#999] uppercase">
            — Our Mission
          </p>
        </div>
      </section>

      {/* ══ CO-CREATE BANNER ══ */}
      <section className="relative overflow-hidden">
        <img
          src={coCreateImg}
          alt=""
          className="w-full h-[320px] object-cover block"
        />
        <div className="absolute inset-0 bg-black/76 flex flex-col items-center justify-center gap-7">
          <h2 className="fade-up m-0 text-[clamp(24px,4vw,44px)] font-semibold text-white tracking-[0.04em] text-center">
            LET'S CO-CREATE SUCCESS
          </h2>
          <button className="fade-up bg-orange-500 text-white border-none rounded-md px-8 py-3.5 text-[15px] font-bold cursor-pointer tracking-[0.04em] transition-colors hover:bg-[#cc4f00]">
            Reach Us
          </button>
        </div>
      </section>

      {/* ══ GUIDING PRINCIPLES ══ */}
      <section className="bg-white py-[100px] px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-2">
            <p className="text-[13px] font-bold tracking-[0.1em] text-orange-500 uppercase mb-3 mt-0">
              Our Guiding Principles
            </p>
            <h2 className="m-0 text-[clamp(30px,4vw,48px)] font-semibold tracking-[-0.03em]">
              What We Believe
            </h2>
          </div>

          <div className="stagger-parent grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {principles.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="stagger-child border border-[#ece8e2] rounded-[4px] p-8 bg-white transition-[transform,box-shadow] duration-300 cursor-default hover:-translate-y-1.5 hover:shadow-[0_12px_40px_#E85A00/10]"
                >
                  <div className="w-12 h-12 rounded-[4px] bg-orange-500 flex items-center justify-center text-white mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="m-0 mb-2.5 text-[20px] font-extrabold">{v.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.7] text-[#666]">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="bg-[#0f0f0f] py-8 md:py-12 px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up text-center mb-16">
            <p className="text-[13px] font-bold tracking-[0.1em] text-orange-500  uppercase mb-3 mt-0">
              HOW WE WORK
            </p>
            <h2 className="m-0 text-[clamp(28px,4vw,46px)] font-semibold tracking-[-0.03em] text-white">
              A Proven Delivery Framework
            </h2>
          </div>

          <div className="stagger-parent grid grid-cols-5 gap-0.5">
            {process.map((step, i) => (
              <div
                key={step.number}
                className={`stagger-child p-8 px-6 ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#151515]"}`}
              >
                <p className="m-0 mb-4 text-[40px] font-semibold text-orange-500 opacity-35 leading-none">
                  {step.number}
                </p>
                <h3 className="m-0 mb-3 text-[20px] font-extrabold text-white">
                  {step.title}
                </h3>
                <p className="m-0 text-[14px] leading-[1.7] text-[#888]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="bg-orange-500 py-20 px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-5 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="stat-val counter m-0 mb-2 text-[clamp(40px,5vw,64px)] font-semibold text-white leading-none"
                data-target={s.target}
                data-suffix={s.suffix}
                data-decimals={s.decimals ?? 0}
              >
                {s.value}
              </p>
              <p className="m-0 text-[14px] text-white/[0.78] tracking-[0.05em] uppercase font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="py-[100px] px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="fade-up mb-14">
            <p className="text-[13px] font-bold tracking-[0.1em] text-orange-500 uppercase mb-3 mt-0">
              WHY CHOOSE US
            </p>
            <h2 className="m-0 text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em]">
              Why Teams Choose Us
            </h2>
          </div>

          <div className="stagger-parent grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="stagger-child border border-[#ece8e2] rounded-[4px] p-7 bg-white transition-[border-color,background] duration-200 hover:border-orange-500 hover:bg-[#FFF4EE]"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <h3 className="m-0 text-[17px] font-extrabold text-[#1a1a1a]">
                    {item.title}
                  </h3>
                </div>
                <p className="m-0 text-[15px] leading-[1.7] text-[#666] pl-[18px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CULTURE ══ */}
      <section className="px-10 pb-[100px] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-[60px] items-center">
          <div className="fade-up">
            <p className="text-[13px] font-bold tracking-[0.1em] text-orange-500 uppercase mb-3 mt-0">
              Our Culture
            </p>
            <h2 className="mt-0 mb-6 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Driven By <span className="text-orange-500">People.</span>
              <br />
              <span className="italic">Defined</span> By Purpose.
            </h2>
            <p className="mb-8 mt-0 text-[17px] leading-[1.8] text-[#555]">
              Our culture is rooted in collaboration, continuous learning, and a
              shared commitment to creating meaningful impact for every client
              we serve.
            </p>
            <button className="inline-flex items-center gap-2 bg-orange-500 text-white border-none rounded-md px-7 py-3.5 text-[15px] font-bold cursor-pointer tracking-[0.01em] transition-colors hover:bg-[#cc4f00]">
              Join Our Team <ArrowRight size={15} />
            </button>
          </div>
          <div className="fade-up">
            <img
              src={cultureImg}
              alt="Culture"
              className="w-full rounded-[4px] object-cover aspect-[4/3] block"
            />
          </div>
        </div>
      </section>

      {/* ══ CTA FOOTER STRIP ══ */}
      <section className="bg-[#0f0f0f] py-20 px-10 text-center">
        <p className="fade-up mb-4 mt-0 text-[13px] font-bold tracking-[0.12em] text-orange-500 uppercase">
          Ready to Transform?
        </p>
        <h2 className="fade-up mb-8 mt-0 text-[clamp(28px,4vw,44px)] font-semibold text-white tracking-[-0.02em]">
          Let's Build Something Exceptional
        </h2>
        <button className="fade-up inline-flex items-center gap-2 bg-orange-500 text-white border-none rounded-md px-9 py-4 text-[16px] font-bold cursor-pointer transition-colors hover:bg-[#cc4f00]">
          Let's Talk <ArrowRight size={17} />
        </button>
      </section>
    </div>
  );
}
