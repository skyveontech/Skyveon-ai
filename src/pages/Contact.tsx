import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import useGsap from "@/hooks/use-gsap";
import gsap from "@/lib/gsap";
import Mailgun from "mailgun.js";



const apiKey = import.meta.env.VITE_MAILGUN_API;
// ── tiny helper ──────────────────────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── types ─────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type Status = "idle" | "submitting" | "success" | "error";

// ── sub-components ────────────────────────────────────────────────────────────

function InfoCard({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: string;
}) {
  return (
    <div
      className="group  relative flex items-start gap-5 rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{ animationDelay: delay }}>
      {/* accent line */}
      <span className="absolute left-0 top-8 h-10 w-1 rounded-r-full bg-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-1 block text-lg font-bold text-slate-800 transition-colors hover:text-orange-500">
            {value}
          </a>
        ) : (
          <p className="mt-1 text-lg font-bold text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
}

// ── input / textarea ──────────────────────────────────────────────────────────
const fieldBase =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100";

// ── main component ────────────────────────────────────────────────────────────
export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);
  // ── form state ───────────────────────────────────────────────────────────
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLDivElement>(null);

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.message.trim()) next.message = "Tell us a bit about your project";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: apiKey|| "",
    });

    // Build mailto payload
    // const to = "info@skyveon.ai";
    const subject = `Project Inquiry from ${form.name}${form.company ? ` — ${form.company}` : ""}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : "",
      form.service ? `Service: ${form.service}` : "",
      "",
      "Message:",
      form.message,
    ]
      .filter((line) => line !== undefined)
      .join("\n");
    const data = await mg.messages.create(
      "sandboxb6f850e17aa84a5b805bedd32e84107e.mailgun.org",
        {
          from: "Mailgun Sandbox <postmaster@sandboxb6f850e17aa84a5b805bedd32e84107e.mailgun.org>",
          to: ["<hr@skyveon.ai>"],
        subject: subject,
        text: body,
      },
    );

    // console.log(data);
setStatus("success")
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGsap(() => {
    // Performance hints
    gsap.set([".info-card", ".feature-item", ".contact-form"], {
      willChange: "transform, opacity",
    });

    // ====================================
    // HERO
    // ====================================

    const heroTl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    heroTl
      .from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      })

      .from(
        ".hero-title",
        {
          opacity: 0,
          y: 60,
          duration: 0.9,
        },
        "-=0.2",
      )

      .from(
        ".hero-para",
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.5",
      )

      .from(
        ".hero-actions",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.4",
      )

      .from(
        ".hero-trust span",
        {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.4,
        },
        "-=0.3",
      );

    // ====================================
    // INFO CARDS
    // ====================================

    gsap.from(".info-card", {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",

      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // ====================================
    // CONTACT SECTION
    // ====================================

    gsap.from(".contact-copy", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: formRef.current,
        start: "top 75%",
        once: true,
      },
    });

    gsap.from(".feature-item", {
      opacity: 0,
      y: 25,
      stagger: 0.08,
      duration: 0.5,
      ease: "power3.out",

      scrollTrigger: {
        trigger: formRef.current,
        start: "top 70%",
        once: true,
      },
    });

    gsap.from(".contact-form", {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: formRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // ====================================
    // SUCCESS STATE
    // ====================================

    if (status === "success") {
      gsap.from(".success-state", {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }
  }, [status]);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen  bg-white font-sans antialiased">
    {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-16 lg:pt-32 lg:pb-24"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80')` 
        }}
      >
        {/* Dark Background Overlay (Ensures white text contrast) */}
<div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent" />

        {/* decorative blobs (Adjusted opacity for dark background) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-2xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* badge */}
          <span className="hero-badge mt-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Contact Skyveon
          </span>

          {/* headline */}
          <h1 className="mt-8 hero-title text-4xl font-bold leading-[1] tracking-tight text-white md:text-6xl">
            Let's Build
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Something Great
            </span>
          </h1>

          <p className="mt-7 hero-para max-w-2xl text-xl leading-relaxed text-slate-300">
            Whether you're exploring AI, Cloud, Data Engineering, DevOps, or
            Enterprise Platforms — we're ready to turn your vision into reality.
          </p>

          {/* CTA row */}
          <div className="mt-10 hero-actions flex flex-wrap gap-4">
            <button
              onClick={scrollToForm}
              className="group flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-950/30 active:scale-95">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="mailto:info@skyveon.ai"
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-sm px-7 py-4 font-semibold text-slate-200 transition-all duration-200 hover:border-orange-500/50 hover:bg-slate-800/80 hover:text-orange-400">
              <Mail className="h-4 w-4" />
              Email us directly
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-14 hero-trust flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
            {[
              "Responds within 24 hrs",
              "Free initial consultation",
              "No long-term lock-in",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 backdrop-blur-xs px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-orange-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* ── INFO CARDS ───────────────────────────────────────────────────────── */}
      <section ref={infoRef} className=" py-8 md:py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-3">
            <InfoCard
              icon={<Mail size={22} />}
              label="Email"
              value="info@skyveon.ai"
              href="mailto:info@skyveon.ai"
              delay="0ms"
            />
            <InfoCard
              icon={<Phone size={22} />}
              label="Phone"
              value="+1 (614) 401-3427"
              href="tel:+16144013427"
              delay="80ms"
            />
            <InfoCard
              icon={<MapPin size={22} />}
              label="Office"
              value="Columbus, Ohio, USA"
              delay="160ms"
            />
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────────────── */}
      <section
        id="contact"
        ref={formRef}
        className="scroll-mt-20 py-14 md:py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
            {/* LEFT — COPY */}
            <div className="contact-copy lg:sticky lg:top-24">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-orange-500">
                Get in touch
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-slate-900">
                Tell us about
                <br />
                your project
              </h2>

              <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-500">
                Fill out the form and we'll follow up within one business day to
                discuss how we can help.
              </p>

              {/* FEATURE LIST */}
              <ul className="mt-8 md:mt-10 space-y-5">
                {[
                  {
                    title: "AI & Machine Learning",
                    desc: "Custom models, LLM integrations, intelligent automation",
                  },
                  {
                    title: "Cloud & DevOps",
                    desc: "AWS, Azure, GCP migrations, CI/CD pipelines, infra-as-code",
                  },
                  {
                    title: "Data Engineering",
                    desc: "Pipelines, warehousing, real-time analytics at scale",
                  },
                  {
                    title: "Enterprise Platforms",
                    desc: "ERP, CRM, custom portals & digital transformation",
                  },
                ].map(({ title, desc }) => (
                  <li key={title} className="feature-item flex gap-4">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    </span>

                    <div>
                      <p className="font-bold text-slate-800">{title}</p>

                      <p className="text-sm text-slate-500 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — FORM */}
            <div className="contact-form rounded-[24px] md:rounded-[2.5rem] border border-slate-100 bg-white p-5 md:p-8 lg:p-10 shadow-xl shadow-slate-100">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-6 py-10 md:py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
                    <CheckCircle2 className="h-10 w-10 text-orange-500" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Message sent!
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Your email client should have opened. We'll be in touch
                      within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        name: "",
                        email: "",
                        company: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600">
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h3 className="text-2xl font-black text-slate-900">
                    Send us a message
                  </h3>

                  {/* NAME + COMPANY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={update("name")}
                        className={cn(
                          fieldBase,
                          errors.name &&
                            "border-red-300 bg-red-50 focus:ring-red-100",
                        )}
                      />

                      {errors.name && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Company (optional)"
                        value={form.company}
                        onChange={update("company")}
                        className={fieldBase}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={update("email")}
                      className={cn(
                        fieldBase,
                        errors.email &&
                          "border-red-300 bg-red-50 focus:ring-red-100",
                      )}
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* SERVICE */}
                  <select
                    value={form.service}
                    onChange={update("service")}
                    className={cn(
                      fieldBase,
                      "cursor-pointer appearance-none text-slate-500",
                      form.service && "text-slate-800",
                    )}>
                    <option value="">Select a service (optional)</option>

                    <option value="AI & Machine Learning">
                      AI & Machine Learning
                    </option>

                    <option value="Cloud & DevOps">Cloud & DevOps</option>

                    <option value="Data Engineering">Data Engineering</option>

                    <option value="Enterprise Platforms">
                      Enterprise Platforms
                    </option>

                    <option value="Other">Other / Not sure yet</option>
                  </select>

                  {/* MESSAGE */}
                  <div>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your project requirements... *"
                      value={form.message}
                      onChange={update("message")}
                      className={cn(
                        fieldBase,
                        "resize-none min-h-[180px]",
                        errors.message &&
                          "border-red-300 bg-red-50 focus:ring-red-100",
                      )}
                    />

                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "submitting"}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 font-bold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 leading-relaxed">
                    Clicking Send will open your default email app with the
                    details pre-filled. We respond within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
