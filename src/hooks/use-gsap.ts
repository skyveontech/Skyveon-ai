import {  useLayoutEffect, useEffect } from "react";
import gsap from "@/lib/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function useGsap(
  callback: () => void,
  deps: unknown[] = [],
  scope?: React.RefObject<HTMLElement>
) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, scope);

    return () => {
      ctx.revert();
    };
  }, deps);
}