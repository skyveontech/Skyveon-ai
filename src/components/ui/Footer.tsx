import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Careers",
      href: "#careers",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],

  services: [
    {
      label: "AI & Machine Learning",
      href: "#services",
    },
    {
      label: "Cloud & DevOps",
      href: "#services",
    },
    {
      label: "Data Engineering",
      href: "#services",
    },
    {
      label: "Enterprise Platforms",
      href: "#services",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F8FAFC] border-t border-slate-200">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-100/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] gap-14">
          {/* BRAND */}
          <div>
            {/* LOGO */}
            <a href="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo}
                alt="Skyveon AI"
                className="h-12 w-auto transition-transform duration-300 group-hover:rotate-2"
              />

              <div className="flex flex-col leading-none">
                <span className="font-heading text-2xl font-bold tracking-wide text-slate-900">
                  SKYVEON
                </span>

                <span className="text-[11px] tracking-[0.25em] uppercase text-slate-500 mt-1">
                  AI Solutions
                </span>
              </div>
            </a>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-600">
              Building intelligent enterprise solutions through AI, cloud, data
              engineering, and digital transformation technologies.
            </p>

            {/* CTA */}
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/20">
              Book Consultation
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Company
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-slate-600 transition-colors duration-300 hover:text-orange-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Services
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-slate-600 transition-colors duration-300 hover:text-orange-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contact
            </h3>

            <div className="mt-6 space-y-5">
              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200">
                  <Mail size={18} className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Email</p>

                  <a
                    href="mailto:info@skyveon.ai"
                    className="mt-1 block text-[15px] text-slate-700 transition-colors duration-300 hover:text-orange-500">
                    info@skyveon.ai
                  </a>

                  <a
                    href="mailto:hr@skyveon.ai"
                    className="mt-1 block text-[15px] text-slate-700 transition-colors duration-300 hover:text-orange-500">
                    hr@skyveon.ai
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200">
                  <Phone size={18} className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Phone</p>

                  <a
                    href="tel:+16146733427"
                    className="mt-1 block text-[15px] text-slate-700 transition-colors duration-300 hover:text-orange-500">
                    +1 (614) 673-3427
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200">
                  <MapPin size={18} className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Address</p>

                  <p className="mt-1 text-[15px] leading-6 text-slate-700">
                    15 Clairedan Drive,
                    <br />
                    15A, Powell,
                    <br />
                    OH 43065
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Skyveon AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-slate-500 transition-colors duration-300 hover:text-orange-500">
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-sm text-slate-500 transition-colors duration-300 hover:text-orange-500">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
