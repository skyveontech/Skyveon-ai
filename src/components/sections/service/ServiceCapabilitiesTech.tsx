"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

export default function ServiceCapabilitiesTech({
  service,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);
    const animatedItems = q(".cap-item, .tech-pill");

    gsap.set(q(".cap-item"), {
      opacity: 0,
      y: 36,
    });

    gsap.set(q(".tech-pill"), {
      opacity: 0,
      scale: 0.88,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
      onComplete: () => {
        gsap.set(animatedItems, { clearProps: "transform, opacity" });
      },
    })
      .to(q(".cap-item"), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
      })
      .to(q(".tech-pill"), {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.6)",
      }, "-=0.35");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-8 lg:py-12"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            Capabilities & Technology
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            What We {" "}
            <span className=" bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
        </div>

        <div className="mt-4 md:mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* CAPABILITIES */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Core Capabilities
            </h3>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.capabilities.map(
                (capability) => (
                  <div
                    key={capability}
                    className="cap-item flex items-start gap-3 rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50/40"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 text-orange-500"
                    />

                    <span className="font-medium text-slate-700">
                      {capability}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* TECHNOLOGIES */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Technology Stack
            </h3>

            <div className="mt-8 flex flex-wrap gap-3">
              {service.technologies.map(
                (tech) => (
                  <span
                    key={tech}
                    className="tech-pill rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
