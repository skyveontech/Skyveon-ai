// RouteScrollTriggerRefresh.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RouteScrollTriggerRefresh() {
  const location = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return null;
}