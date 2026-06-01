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
  TrendingUp,
  Heart,
  ShoppingCart,
  Cog,
  Globe,
  Film,
  type LucideIcon,
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
  isScrolled: boolean;
};

type MobileAccordionProps = {
  title: string;
  items: MenuItem[];
  onItemClick: () => void;
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
    accent: "#3b82f6",
  },
  {
    title: "Data Engineering & Analytics",
    description: "Modern data platforms",
    href: "/services/data-engineering-analytics",
    icon: BarChart2,
    accent: "#8b5cf6",
  },
  {
    title: "Enterprise Platforms",
    description: "Workday & Salesforce solutions",
    href: "/services/enterprise-platforms",
    icon: Layers,
    accent: "#10b981",
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
    href: "/industries/financial-services",
    icon: TrendingUp,
  },
  {
    title: "Healthcare & Life Sciences",
    href: "/industries/healthcare",
    icon: Heart,
  },
  {
    title: "Retail & eCommerce",
    href: "/industries/retail",
    icon: ShoppingCart,
  },
  { title: "Manufacturing", href: "/industries/manufacturing", icon: Cog },
  { title: "Public Sector", href: "/industries/public-sector", icon: Globe },
  {
    title: "Media & Technology",
    href: "/industries/media-technology",
    icon: Film,
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
      style={{ width: 280 }}>
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
            Industries served
          </p>
        </div>
        <div className="p-3 grid grid-cols-2 gap-1">
          {industriesMenu.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.title}
                to={ind.href}
                className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-orange-50 active:bg-orange-100">
                <Icon
                  size={14}
                  className="flex-shrink-0 text-slate-400 group-hover:text-orange-500 transition-colors duration-200"
                  strokeWidth={1.8}
                />
                <span
                  className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-200 leading-tight"
                  style={SF}>
                  {ind.title}
                </span>
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
  isScrolled,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

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
        className={`navbar-animate flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150
          ${
            open
              ? "text-slate-900 bg-black/[0.05]"
              : isScrolled
                ? "text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]"
                : "text-slate-700 hover:text-slate-900 hover:bg-white/20"
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
}: MobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="mobile-link">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-medium text-slate-800 hover:bg-black/[0.04] transition-colors duration-150"
        style={SF}>
        {title}
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pl-4 pr-2 pb-2 grid gap-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.href}
                onClick={onItemClick}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] text-slate-600 hover:text-slate-900 hover:bg-orange-50 transition-all duration-150"
                style={SF}>
                <Icon size={14} className="text-slate-400" strokeWidth={1.8} />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



 useEffect(() => {
  let lastState = false;

  const handleScroll = () => {
    const nextState = window.scrollY > 20;

    if (nextState !== lastState) {
      lastState = nextState;
      setIsScrolled(nextState);
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

useGsap(() => {

  gsap.set(
  [
    ".navbar-animate",
    ".mobile-link",
    ".mobile-menu-panel",
  ],
  {
    force3D: true,
  }
);
  gsap.set(".navbar-animate", {
    willChange: "transform, opacity",
  });

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

  gsap.from(".mobile-menu-panel", {
    y: -20,
    opacity: 0,
    duration: 0.35,
    ease: "power3.out",
  });

  gsap.from(".mobile-link", {
    opacity: 0,
    y: 10,
    stagger: 0.03,
    duration: 0.25,
    ease: "power2.out",
  });
}, [mobileMenuOpen]);



  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl backdrop-saturate-[2] border-b border-black/[0.07] shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_4px_24px_-4px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}>
   

        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            <Link
              to="/"
              className="navbar-animate flex items-center gap-2.5 group select-none flex-shrink-0">
              <div className="relative">
                <img
                  src={logo}
                  alt="Skyveon AI"
                  className="md:h-[52px] h-10 w-auto transition-all duration-500 group-hover:scale-[1.04]"
                  width={160}
                  height={52}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1 bg-orange-500/25 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              <NavDropdown
                label="Services"
                menu={ServicesMegaMenu}
                isScrolled={isScrolled}
              />
              <NavDropdown
                label="Industries"
                menu={IndustriesMegaMenu}
                isScrolled={isScrolled}
              />
              {simpleLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`navbar-animate px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150
                    ${
                      isScrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]"
                        : "text-slate-700 hover:text-slate-900 hover:bg-white/20"
                    }`}
                  style={SF}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                to="/contact"
                className="navbar-animate hidden lg:inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-[0.97] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(249,115,22,0.4)] group"
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
                className="navbar-animate lg:hidden relative flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/[0.09] active:bg-black/[0.13] text-slate-800 transition-all duration-200">
                <span
                  className="absolute transition-all duration-300"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen
                      ? "rotate(45deg) scale(0.5)"
                      : "rotate(0deg) scale(1)",
                  }}>
                  <Menu size={18} strokeWidth={2} />
                </span>
                <span
                  className="absolute transition-all duration-300"
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen
                      ? "rotate(0deg) scale(1)"
                      : "rotate(-45deg) scale(0.5)",
                  }}>
                  <X size={18} strokeWidth={2} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-black/25 backdrop-blur-[3px] lg:hidden transition-opacity duration-350 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 left-0 right-0 z-30 lg:hidden transition-all duration-450 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none"
        }`}>
        <div className="mx-3 mt-[64px] mobile-menu-panel rounded-2xl bg-white/97 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.07)] overflow-hidden">
          <nav className="px-2 py-2.5">
            <MobileAccordion
              title="Services"
              items={servicesMenu}
              onItemClick={closeMobileMenu}
            />

            <MobileAccordion
              title="Industries"
              items={industriesMenu}
              onItemClick={closeMobileMenu}
            />
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

          <div className="mx-4 h-px bg-black/[0.06]" />

          <div className="px-4 py-4">
            <Link
              to="#contact"
              onClick={closeMobileMenu}
              className="mobile-link flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-[14.5px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-[0.98] shadow-[0_2px_12px_rgba(0,0,0,0.15)] group"
              style={{ ...SF, letterSpacing: "-0.01em" }}>
              Book a Consultation
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mobile-link px-6 pb-5 flex items-center justify-center gap-5">
            <a
              href="mailto:info@skyveon.ai"
              className="text-[12px] text-slate-400 hover:text-orange-500 transition-colors duration-200"
              style={SF}>
              info@skyveon.ai
            </a>
            <span className="w-px h-3 bg-slate-200" />
            <a
              href="tel:+16146733427"
              className="text-[12px] text-slate-400 hover:text-orange-500 transition-colors duration-200"
              style={SF}>
              +1 (614) 673-3427
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
