import {  Mail, MapPin, Phone } from "lucide-react";

import { Link } from "react-router-dom";


import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ], 
services: [
  {
    label: "Digital Product Engineering",
    href: "/services/digital-product-engineering",
  },
  {
    label: "Cloud & DevOps",
    href: "/services/cloud-devops",
  },
  {
    label: "Data Engineering & Analytics",
    href: "/services/data-engineering-analytics",
  },
  {
    label: "Enterprise Platforms",
    href: "/services/enterprise-platforms",
  },
  {
    label: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
  },
],
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    content: (
      <>
        <a
          href="mailto:info@skyveon.ai"
          className="footer-link mt-1 block text-[15px] text-slate-700"
        >
          info@skyveon.ai
        </a>
        <a
          href="mailto:hr@skyveon.ai"
          className="footer-link mt-1 block text-[15px] text-slate-700"
        >
          hr@skyveon.ai
        </a>
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    content: (
      <a
        href="tel:+16146733427"
        className="footer-link mt-1 block text-[15px] text-slate-700"
      >
        +1 (614) 673-3427
      </a>
    ),
  },
  {
    icon: MapPin,
    label: "Address",
    content: (
      <p className="mt-1 text-[15px] leading-6 text-slate-700">
        15 Clairedan Drive,
        <br />
        15A, Powell,
        <br />
        OH 43065
      </p>
    ),
  },
];

export default function Footer() {



  return (
    <footer
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC]"
      style={{ perspective: "800px" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 bg-orange-100/50 blur-3xl"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div className="footer-brand flex flex-col items-start justify-between">
            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none"
              aria-label="Skyveon AI home"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Skyveon AI"
                  className="h-11 w-auto transition-transform duration-500 group-hover:scale-105 md:h-24"
                />
                <div className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-orange-500/30 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Link>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-600">
              Building intelligent enterprise solutions through AI, cloud, data
              engineering, and digital transformation technologies.
            </p>
{/* 
            <Link
              to="#services"
              className="hero-btn group mt-8 inline-flex items-center gap-2 border-2 border-[#FF6B00] bg-[#FF6B00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/20 transition-colors duration-200 hover:bg-white hover:text-[#FF6B00]"
            >
              Explore Services
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link> */}
          </div>

          <div>
            <h3 className="footer-col-head text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Company
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-nav-link inline-block text-[15px] text-slate-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-head text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Services
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-nav-link inline-block text-[15px] text-slate-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-head text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact
            </h3>
            <div className="mt-6 space-y-5">
              {contactItems.map(({ icon: Icon, label, content }) => (
                <div
                  key={label}
                  className="footer-contact-row flex items-start gap-3"
                >
                  <div
                    className="contact-icon-box flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <Icon size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        />

        <div className="footer-bottom flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Skyveon AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="footer-link inline-block text-sm text-slate-500"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="footer-link inline-block text-sm text-slate-500"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
