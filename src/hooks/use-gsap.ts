import { useLayoutEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useGsap(
  callback: () => gsap.Context | void,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, deps);
}