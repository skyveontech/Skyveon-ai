import { useRef } from "react";
import {
  LayoutGrid,
  AppWindow,
  Server,
  Cloud,
} from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

const icons = [
  LayoutGrid,
  AppWindow,
  Server,
  Cloud,
];

export default function ServiceCapabilitiesTech({
  service,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    gsap.set(".tech-card", {
      opacity: 0,
      y: 50,
    });

    gsap.to(".tech-card", {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",

      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            Capabilities & Technology
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-slate-900">
            How We{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Build
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We engineer across languages, platforms, and cloud
            ecosystems, choosing the right technologies for your
            business goals—not limiting ourselves to a fixed stack.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {service.technologyGroups.map((group, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={group.title}
                className="tech-card rounded-[32px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                    <Icon
                      size={22}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {group.title}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {group.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-slate-500">
          We choose the right tools for the problem—not the other way
          around.
        </p>
      </div>
    </section>
  );
}