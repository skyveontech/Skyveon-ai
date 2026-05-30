"use client";

import { useRef } from "react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";
import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

export default function ServiceOverview({
  service,
}: Props) {
  const sectionRef =
    useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;

    if (!section) return;

    const q =
      gsap.utils.selector(section);

    const animatedItems = q(
      ".overview-eyebrow, .overview-title, .overview-copy, .overview-image, .overview-card"
    );

    gsap.set(animatedItems, {
      willChange:
        "transform, opacity",
    });

    gsap.set(
      q(
        ".overview-eyebrow, .overview-title, .overview-copy, .overview-card"
      ),
      {
        opacity: 0,
        y: 40,
      }
    );

    gsap.set(
      q(".overview-image"),
      {
        opacity: 0,
        x: 80,
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
      onComplete: () => {
        gsap.set(animatedItems, {
          clearProps:
            "willChange",
        });
      },
    });

    tl.to(
      q(".overview-eyebrow"),
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }
    )
      .to(
        q(".overview-title"),
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.25"
      )
      .to(
        q(".overview-copy"),
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.45"
      )
      .to(
        q(".overview-image"),
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.55"
      )
      .to(
        q(".overview-card"),
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}

      <div className="relative py-8 md:py-12 lg:py-12">
        {/* Background Glow */}
        <div className="absolute -left-24 -top-24 h-[320px] w-[320px] md:h-[420px] md:w-[420px] rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="absolute -bottom-16 right-0 h-[280px] w-[280px] md:h-[340px] md:w-[340px] rounded-full bg-orange-400/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* ========================================= */}
            {/* CONTENT */}
            {/* ========================================= */}

            <div>
              <span className="overview-eyebrow inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                <span className="h-px w-8 bg-orange-500" />
                What We Deliver
              </span>

              <h2 className="overview-title mt-6 text-3xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Building Solutions
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  That Deliver Results
                </span>
              </h2>

              <p className="overview-copy mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {service.overview}
              </p>
            </div>

            {/* ========================================= */}
            {/* IMAGE */}
            {/* ========================================= */}

            <div className="overview-image relative">
              {/* Glow */}
              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                <img
                  src={
                    service.overviewImage ||
                    service.heroImage
                  }
                  alt={service.title}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-orange-500/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* STATS SECTION */}
      {/* ========================================= */}

      <div className="relative bg-white py-4 md:py-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {service.stats.map(
              (stat, index) => (
                <div
                  key={index}
                  className="overview-card group flex flex-col items-center justify-center px-8 py-10 text-center"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-5xl font-black text-transparent md:text-6xl">
                    {stat.value}
                  </div>

                  <div className="mt-4 h-px w-12 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-20" />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>
    </section>
  );
}