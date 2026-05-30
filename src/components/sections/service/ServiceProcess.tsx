"use client";

import { useRef } from "react";
import { Search, PencilRuler, Code2, Rocket, TrendingUp } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

const icons = [Search, PencilRuler, Code2, Rocket, TrendingUp];

export default function ServiceProcess({ service }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);
    const animatedItems = q(
      ".process-card, .process-node, .process-line-fill",
    );

    gsap.set(animatedItems, {
      willChange: "transform, opacity",
    });

    gsap.set(q(".process-card"), {
      opacity: 0,
      y: 48,
    });

    gsap.set(q(".process-node"), {
      scale: 0,
    });

    gsap.set(q(".process-line-fill"), {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
      onComplete: () => {
        gsap.set(animatedItems, { clearProps: "willChange" });
      },
    });

    tl.to(q(".process-line-fill"), {
      scaleX: 1,
      duration: 1.1,
      ease: "power3.inOut",
    })
      .to(
        q(".process-node"),
        {
          scale: 1,
          stagger: 0.12,
          duration: 0.45,
          ease: "back.out(1.8)",
        },
        "-=0.75",
      )
      .to(
        q(".process-card"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.55",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-8 lg:py-12"
     >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            Our Process
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            From Idea To
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Enterprise Scale
            </span>
          </h2>
        </div>

        {/* TIMELINE — Desktop */}
        <div className="relative mt-24 hidden lg:block">
          {/* LINE */}
          <div className="absolute top-7 left-0 right-0 h-[2px] bg-slate-200">
            <div className="process-line-fill h-full bg-gradient-to-r from-orange-500 to-red-500" />
          </div>

          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${service.process.length}, minmax(0, 1fr))`,
            }}
          >
            {service.process.map((step, index) => {
              const Icon = icons[index] || TrendingUp;

              return (
                <div key={step.title} className="relative">
                  {/* NODE */}
                  <div className="process-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                    <Icon size={22} />
                  </div>

                  {/* CARD */}
                  <div
                    className="process-card mt-10 rounded-[28px] border border-slate-200 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.80)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}>
                    <span className="text-sm font-semibold text-orange-500">
                      0{index + 1}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE */}
        <div className="mt-16 space-y-6 lg:hidden">
          {service.process.map((step, index) => {
            const Icon = icons[index] || TrendingUp;

            return (
              <div
                key={step.title}
                className="process-card flex gap-4 rounded-3xl border border-slate-200 p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.80)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <Icon size={22} />
                </div>

                <div>
                  <span className="text-sm font-semibold text-orange-500">
                    0{index + 1}
                  </span>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
