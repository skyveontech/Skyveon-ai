import { useEffect, useState, useRef, useCallback, memo } from "react";
import type { CSSProperties, ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Zap,
  Cloud,
  BarChart2,
  Layers,
  Brain,
  type LucideIcon,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Factory,
  Shield,
  Monitor,
} from "lucide-react";
import useGsap from "@/hooks/use-gsap";
import gsap from "@/lib/gsap";
import logo from "@/assets/logo.png";

type MenuItem = {
  title: string;
  href: string;
  description?: string;
  icon: LucideIcon;
  accent?: string;
};

type MegaMenuProps = {
  open: boolean;
};

type NavDropdownProps = {
  label: string;
  menu: ComponentType<MegaMenuProps>;
};

type MobileAccordionProps = {
  title: string;
  items: MenuItem[];
  onItemClick: () => void;
  isOpen: boolean;
  onToggle: () => void;
};

const servicesMenu = [
  {
    title: "Digital Product Engineering",
    description: "Modern web & mobile experiences",
    href: "/services/digital-product-engineering",
    icon: Zap,
    accent: "#f97316",
  },
  {
    title: "Cloud & DevOps (SRE)",
    description: "Reliable cloud infrastructure",
    href: "/services/cloud-devops",
    icon: Cloud,
    accent: "#f97316",
  },
  {
    title: "Data Engineering & Analytics",
    description: "Modern data platforms",
    href: "/services/data-engineering-analytics",
    icon: BarChart2,
    accent: "#f97316",
  },
  {
    title: "Enterprise Platforms",
    description: "Workday & Salesforce solutions",
    href: "/services/enterprise-platforms",
    icon: Layers,
    accent: "#f97316",
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent systems at scale",
    href: "/services/ai-machine-learning",
    icon: Brain,
    accent: "#f97316",
  },
] satisfies MenuItem[];

const industriesMenu = [
  {
    title: "Financial Services",
    description: "Secure banking, fintech & compliance platforms",
    href: "/industries/financial-services",
    icon: Landmark,
    accent: "#f97316",
  },
  {
    title: "Healthcare",
    description: "HIPAA-ready digital healthcare ecosystems",
    href: "/industries/healthcare",
    icon: HeartPulse,
    accent: "#f97316",
  },
  {
    title: "Retail & eCommerce",
    description: "Personalization, analytics & omnichannel commerce",
    href: "/industries/retail",
    icon: ShoppingBag,
    accent: "#f97316",
  },
  {
    title: "Manufacturing",
    description: "Industrial IoT, automation & predictive insights",
    href: "/industries/manufacturing",
    icon: Factory,
    accent: "#f97316",
  },
  {
    title: "Public Sector",
    description: "Mission-critical government modernization",
    href: "/industries/public-sector",
    icon: Shield,
    accent: "#f97316",
  },
  {
    title: "Media & Technology",
    description: "Scalable platforms & AI-powered experiences",
    href: "/industries/media-technology",
    icon: Monitor,
    accent: "#f97316",
  },
] satisfies MenuItem[];

const simpleLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SF: CSSProperties = {
  fontFamily: "-apple-system,'SF Pro Text',BlinkMacSystemFont,sans-serif",
};

const ctaStyle: CSSProperties = {
  ...SF,
  letterSpacing: "-0.01em",
  padding: "8px 18px",
};

const ServicesMegaMenu = memo(function ServicesMegaMenu({
  open,
}: MegaMenuProps) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 transition-all duration-300 origin-top
        ${
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-[0.97] pointer-events-none -translate-y-1"
        }`}
      style={{ width: 360 }}>
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-slate-200/80 z-10" />
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-[0_24px_64px_rgba(15,23,42,0.13),0_4px_16px_rgba(15,23,42,0.06)]">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100">
          <p
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400"
            style={SF}>
            What we do
          </p>
        </div>
        <div className="p-3 grid gap-1">
          {servicesMenu.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                to={s.href}
                className="group flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all duration-200 hover:bg-slate-50 active:bg-slate-100">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.accent}15` }}>
                  <Icon
                    size={16}
                    style={{ color: s.accent }}
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13.5px] font-semibold text-slate-900 leading-tight truncate"
                    style={SF}>
                    {s.title}
                  </p>
                  <p
                    className="text-[12px] text-slate-400 mt-0.5 truncate"
                    style={SF}>
                    {s.description}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-shrink-0 text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const IndustriesMegaMenu = memo(function IndustriesMegaMenu({
  open,
}: MegaMenuProps) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 origin-top transition-all duration-300
      ${
        open
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
      }`}
      style={{ width: 360 }}>
      <div className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-slate-200/80 bg-white z-10" />
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.13),0_4px_16px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-100 px-5 pt-4 pb-3">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400"
            style={SF}>
            Industries Served
          </p>
        </div>
        <div className="grid gap-1 p-3">
          {industriesMenu.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.title}
                to={industry.href}
                className="group flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all duration-200 hover:bg-slate-50 active:bg-slate-100">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${industry.accent}15` }}>
                  <Icon
                    size={16}
                    style={{ color: industry.accent }}
                    strokeWidth={1.8}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[13.5px] font-semibold leading-tight text-slate-900"
                    style={SF}>
                    {industry.title}
                  </p>
                  <p
                    className="mt-0.5 truncate text-[12px] text-slate-400"
                    style={SF}>
                    {industry.description}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-shrink-0 -translate-x-1 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const NavDropdown = memo(function NavDropdown({
  label,
  menu: MenuComponent,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button
        className={`navbar-animate flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-200 ${
          open
            ? "text-slate-900 bg-black/[0.05]"
            : "text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]"
        }`}
        style={SF}
        aria-expanded={open}>
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <MenuComponent open={open} />
    </div>
  );
});

const MobileAccordion = memo(function MobileAccordion({
  title,
  items,
  onItemClick,
  isOpen,
  onToggle,
}: MobileAccordionProps) {
  return (
    <div className="mobile-link">
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors duration-200 ${
          isOpen
            ? "bg-black/[0.04] text-orange-600"
            : "text-slate-800 hover:bg-black/[0.04]"
        }`}
        style={SF}>
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-500" : "text-slate-400"}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-1 pb-2"
            : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">
          <div className="pl-3 pr-2 grid gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={onItemClick}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-slate-600 hover:text-slate-900 hover:bg-orange-50 transition-all duration-200"
                  style={SF}>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.accent || "#f97316"}15` }}>
                    <Icon
                      size={14}
                      style={{ color: item.accent || "#f97316" }}
                      strokeWidth={1.8}
                    />
                  </div>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<
    "services" | "industries" | null
  >(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useGsap(() => {
    gsap.set([".navbar-animate", ".mobile-link", ".mobile-menu-panel"], {
      force3D: true,
    });
    gsap.set(".navbar-animate", { willChange: "transform, opacity" });

    gsap.from(".navbar-animate", {
      opacity: 0,
      y: -16,
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.out",
      clearProps: "willChange",
    });
  }, []);

  useGsap(() => {
    if (!mobileMenuOpen) return;

    gsap.fromTo(
      ".mobile-menu-panel",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
    );

    gsap.fromTo(
      ".mobile-link",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.1,
      },
    );
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    // Reset accordion state when menu is closed
    setTimeout(() => setOpenAccordion(null), 300);
  }, []);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);

  const handleAccordionToggle = useCallback(
    (section: "services" | "industries") => {
      setOpenAccordion((prev) => (prev === section ? null : section));
    },
    [],
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-white/95 backdrop-blur-2xl backdrop-saturate-[2] border-b border-black/[0.07] shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_4px_24px_-4px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="navbar-animate flex items-center gap-2.5 group select-none flex-shrink-0">
              <div className="relative">
                <img
                  src={logo}
                  alt="Skyveon AI"
                  className="md:h-[52px] h-10 w-auto transition-transform duration-500 group-hover:scale-[1.04]"
                  width={160}
                  height={52}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1 bg-orange-500/25 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <NavDropdown label="Services" menu={ServicesMegaMenu} />
              <NavDropdown label="Industries" menu={IndustriesMegaMenu} />
              {simpleLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="navbar-animate px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-200 text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]"
                  style={SF}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions & Mobile Toggle */}
            <div className="flex items-center gap-2.5">
              <Link
                to="/contact"
                className="navbar-animate hidden lg:inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 active:scale-[0.97] group bg-slate-900 text-white hover:bg-orange-500 shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(249,115,22,0.4)]"
                style={ctaStyle}>
                Let's Talk
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="navbar-animate lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 bg-black/[0.05] hover:bg-black/[0.09] active:bg-black/[0.13] text-slate-800">
                <span
                  className="absolute transition-all duration-300 ease-in-out"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen
                      ? "rotate(45deg) scale(0.5)"
                      : "rotate(0deg) scale(1)",
                  }}>
                  <Menu size={20} strokeWidth={2} />
                </span>
                <span
                  className="absolute transition-all duration-300 ease-in-out"
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen
                      ? "rotate(0deg) scale(1)"
                      : "rotate(-45deg) scale(0.5)",
                  }}>
                  <X size={20} strokeWidth={2} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-all duration-400 ease-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none delay-100"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[60px] md:top-[68px] left-0 right-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}>
        <div className="mx-4 mt-3 mb-6 mobile-menu-panel rounded-2xl bg-white/95 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.07)] overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain">
          <nav className="px-2 py-3">
            <MobileAccordion
              title="Services"
              items={servicesMenu}
              onItemClick={closeMobileMenu}
              isOpen={openAccordion === "services"}
              onToggle={() => handleAccordionToggle("services")}
            />
            <MobileAccordion
              title="Industries"
              items={industriesMenu}
              onItemClick={closeMobileMenu}
              isOpen={openAccordion === "industries"}
              onToggle={() => handleAccordionToggle("industries")}
            />

            <div className="my-2 mx-4 h-px bg-slate-100" />

            {simpleLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMobileMenu}
                className="mobile-link flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-medium text-slate-800 hover:bg-black/[0.04] active:bg-black/[0.07] transition-colors duration-150 group"
                style={SF}>
                <span>{link.label}</span>
                <ArrowRight
                  size={14}
                  className="text-slate-300 group-hover:text-orange-400 transition-colors duration-200"
                />
              </Link>
            ))}
          </nav>

          <div className="bg-slate-50 border-t border-slate-100 p-5 grid gap-4">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="mobile-link flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-[0.98] shadow-[0_2px_12px_rgba(0,0,0,0.15)] group"
              style={{ ...SF, letterSpacing: "-0.01em" }}>
              Book a Consultation
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <div className="mobile-link flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:info@skyveon.ai"
                className="text-[13px] font-medium text-slate-500 hover:text-orange-500 transition-colors duration-200"
                style={SF}>
                info@skyveon.ai
              </a>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <a
                href="tel:+16146733427"
                className="text-[13px] font-medium text-slate-500 hover:text-orange-500 transition-colors duration-200"
                style={SF}>
                +1 (614) 673-3427
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
