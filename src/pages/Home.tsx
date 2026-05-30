// src/pages/Home.tsx

import Hero from "@/components/sections/Home/Hero";
import TrustedStrip from "@/components/sections/Home/TrustedStrip";
import FutureBanner from "@/components/sections/Home/FutureBanner";
import ServicesSlider from "@/components/sections/Home/Services";
import Industries from "@/components/sections/Home/Industries";
import WhyUs from "@/components/sections/Home/WhyUS";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedStrip />
      <FutureBanner />
      <ServicesSlider />
      <Industries />
      <WhyUs />
    </>
  );
}