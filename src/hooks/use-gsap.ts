import { useLayoutEffect } from "react";
import gsap from "@/lib/gsap";

export default function useGsap(
  callback: () => gsap.Context | void,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });

    return () => ctx.revert();
  }, deps);
}