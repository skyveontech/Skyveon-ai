// src/layouts/MainLayout.tsx

import { Outlet } from "react-router-dom";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function MainLayout() {
  return (
    <>
    <ScrollToTop />
      <Navbar />
      

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}