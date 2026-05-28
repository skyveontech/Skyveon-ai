import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useGsap from "@/hooks/use-gsap";
import gsap from "@/lib/gsap";
import logo from "@/assets/logo.png"


const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useGsap(() => {
    gsap.fromTo(
      ".navbar-animate",
      { opacity: 0, y: -12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, []);

  useGsap(() => {
    if (!mobileMenuOpen) return;
    gsap.fromTo(
      ".mobile-link",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.05,
      }
    );
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isScrolled
            ? "py-2.5 bg-white/72 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.08)]"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-280 mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 md:h-16">

            {/* ── LOGO ── */}
            <Link
              to="/"
              className="navbar-animate flex items-center gap-2.5 group select-none"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Skyveon AI"
                  className="md:h-24 h-11 w-auto transition-all duration-500 group-hover:scale-105"
                />
                {/* Subtle glow under logo */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500/30 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* <div className="flex flex-col leading-none">
                <span
                  className="font-semibold tracking-[0.08em] text-[15px] text-slate-900"
                  style={{ fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif" }}
                >
                  SKYVEON
                </span>
                <span className="text-[9.5px] tracking-[0.22em] uppercase text-slate-400 mt-[3px]">
                  AI Solutions
                </span>
              </div> */}
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="navbar-animate relative px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-600 transition-all duration-200 hover:text-slate-900 hover:bg-black/[0.04] active:bg-black/[0.07] group"
                  style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif" }}
                >
                  {link.label}
                  {/* Micro dot indicator on hover */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                </Link>
              ))}
            </nav>

            {/* ── RIGHT: CTA + HAMBURGER ── */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                to="#contact"
                className="navbar-animate hidden lg:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[13.5px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-[0.97] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(255,91,46,0.35)]"
                style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif", letterSpacing: "-0.01em" }}
              >
                Let's Talk
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="navbar-animate lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/[0.09] active:bg-black/[0.13] text-slate-800 transition-all duration-200"
              >
                <span className={`transition-all duration-300 ${mobileMenuOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}>
                  <Menu size={18} strokeWidth={2} />
                </span>
                <span className={`transition-all duration-300 ${mobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                  <X size={18} strokeWidth={2} />
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-400 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer — slides in from top */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-[72px] rounded-2xl bg-white/95 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden">

          {/* Nav links */}
          <nav className="px-2 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[16px] font-medium text-slate-800 hover:bg-black/[0.04] active:bg-black/[0.07] transition-colors duration-150 group"
                style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif" }}
              >
                <span>{link.label}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-300 group-hover:text-orange-400 transition-colors duration-200">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="mx-4 h-px bg-black/[0.06]" />

          {/* CTA row */}
          <div className="px-4 py-4">
            <Link
              to="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-[0.98] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
              style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif", letterSpacing: "-0.01em" }}
            >
              Book a Consultation
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5H12M12 7.5L8 3.5M12 7.5L8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Contact info */}
          <div className="mobile-link px-6 pb-5 pt-1 flex items-center justify-center gap-5">
            <a href="mailto:info@skyveon.ai" className="text-[12.5px] text-slate-400 hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif" }}>
              info@skyveon.ai
            </a>
            <span className="w-px h-3 bg-slate-200" />
            <a href="tel:+16146733427" className="text-[12.5px] text-slate-400 hover:text-orange-500 transition-colors duration-200" style={{ fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif" }}>
              +1 (614) 673-3427
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
