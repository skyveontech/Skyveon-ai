import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import NotFound from "@/pages/NotFound";
import { lazy } from "react";
import ServicePage from "./pages/ServicePage";
import IndustryPage from "./pages/IndustryPage";
import AboutPage from "./pages/AboutUS";
import CareersPage from "./pages/CareersPage";
import Contact from "./pages/Contact";

const Home = lazy(() => import("@/pages/Home"));

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} /> 
        <Route path="/contact" element={<Contact />} /> 

        {/* 

        <Route path="/services" element={<Services />} />
        */}

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
