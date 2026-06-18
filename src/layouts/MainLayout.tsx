// src/layouts/MainLayout.tsx

import { Outlet } from "react-router-dom";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import RouteScrollTriggerRefresh from "@/components/common/RouteScrollTriggerRefresh";

export default function MainLayout() {
  return (
    <>
    <ScrollToTop />
     
     <RouteScrollTriggerRefresh />
      <Navbar />
      

      <main className="overflow-x-hidden overflow-y-hidden">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}