"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Rocket,
  HeartHandshake,
  MapPin,
  Gift,
  Laptop,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Job {
  title: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  track: string;
  level: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const benefits: Benefit[] = [
  {
    icon: Laptop,
    title: "Flexible Work",
    description:
      "Remote-friendly culture with flexibility and work-life balance.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Access to certifications, mentorship, and learning opportunities.",
  },
  {
    icon: Gift,
    title: "Competitive Compensation",
    description: "Market-leading compensation and performance rewards.",
  },
  {
    icon: HeartHandshake,
    title: "Health & Wellness",
    description: "Supporting physical and mental well-being.",
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Opportunities to grow into leadership and specialist roles.",
  },
  {
    icon: ShieldCheck,
    title: "Modern Technology",
    description: "Work with AI, Cloud, DevOps, Data, and Enterprise Platforms.",
  },
];

const tracks = [
  "All tracks",
  "Cloud DevOps",
  "SAP FICO",
  "SAP ABAP",
  ".NET",
  "Java",
  "Python",
  "Workday",
  "Data Analyst",
  "Data Engineer",
  "Data Science & AI",
];

const levels = ["All levels", "Entry", "Mid"];

const jobs: Job[] = [
  {
    title: "Software Engineer — Full Stack .NET (Mid Level)",
    tags: [".NET", "Mid level", "On-site", "Full-time"],
    summary:
      "Own .NET services and modern front-ends; drive CI/CD and quality across the stack.",
    responsibilities: [
      "Design/implement ASP.NET Core services and REST APIs.",
      "Build responsive UIs (React/Angular); optimize SQL/EF.",
      "Unit/integration tests; CI/CD and code reviews; mentor juniors.",
    ],
    qualifications: [
      "2+ years full-stack .NET; C#/ASP.NET Core/MVC/REST proficiency.",
      "Front-end framework experience; SQL schema design; Agile/Git.",
    ],
    track: ".NET",
    level: "Mid",
  },
  {
    title: "Software Engineer — Full Stack .NET (Entry Level)",
    tags: [".NET", "Entry level", "On-site", "Full-time"],
    summary:
      "Learn and build business-critical web apps with ASP.NET Core, C#, and modern JS.",
    responsibilities: [
      "Develop features in ASP.NET Core/C# and Entity Framework.",
      "Contribute to front-end (HTML/CSS/JS + React/Angular).",
      "Assist with testing, debugging, API integrations, and docs.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Academic/internship experience with .NET; OOP fundamentals; basic SQL.",
    ],
    track: ".NET",
    level: "Entry",
  },
  {
    title: "Software Engineer — Cloud DevOps (Mid Level)",
    tags: ["Cloud DevOps", "Mid level", "Cloud", "Kubernetes", "On-site", "Full-time"],
    summary:
      "Build/optimize IaC and CI/CD across clouds; container orchestration; reliability at scale.",
    responsibilities: [
      "Manage CI/CD (Jenkins/GitLab/GitHub Actions).",
      "Terraform/Ansible/CloudFormation for infrastructure-as-code.",
      "Deploy/manage Kubernetes; implement monitoring/logging/alerting.",
      "Troubleshoot production issues; enforce security/compliance.",
    ],
    qualifications: [
      "2+ years DevOps/SRE/Cloud Eng; AWS/Azure/GCP.",
      "Docker, Kubernetes, Helm; scripting (Python/Bash/Go).",
    ],
    track: "Cloud DevOps",
    level: "Mid",
  },
  {
    title: "Software Engineer — Cloud DevOps (Entry Level)",
    tags: ["Cloud DevOps", "Entry level", "Cloud", "On-site", "Full-time"],
    summary:
      "Learn cloud automation and CI/CD; help ship scalable, reliable infrastructure.",
    responsibilities: [
      "Assist with IaC (Terraform/CloudFormation).",
      "Support CI/CD (Jenkins/GitHub Actions).",
      "Monitor production systems; learn Docker/Kubernetes.",
      "Document scripts and configurations.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Familiarity with AWS/Azure/GCP; scripting (Python/Bash/PowerShell).",
      "Understanding of CI/CD, Linux, and basic networking.",
    ],
    track: "Cloud DevOps",
    level: "Entry",
  },
  {
    title: "Software Engineer — SAP FICO (Mid Level)",
    tags: ["SAP FICO", "Mid level", "SAP Finance", "On-site", "Full-time"],
    summary:
      "Configure and support SAP FICO across GL/AP/AR/AA/CO; integrations and cutovers.",
    responsibilities: [
      "Configure/maintain FICO (GL, AP, AR, AA, CO, Bank).",
      "Support period-end/year-end; handle transports/data migrations.",
      "Work on integrations with MM/SD/HR; testing/UAT/cutover.",
    ],
    qualifications: [
      "2+ years hands-on SAP FICO config; S/4HANA preferred.",
      "FICO integration points; LSMW/IDocs/BAPIs a plus.",
    ],
    track: "SAP FICO",
    level: "Mid",
  },
  {
    title: "Software Engineer — SAP FICO (Entry Level)",
    tags: ["SAP FICO", "Entry level", "SAP Finance", "On-site", "Full-time"],
    summary:
      "Start your SAP FICO journey supporting configuration, testing, and documentation.",
    responsibilities: [
      "Assist with FICO config (GL/AP/AR/Assets).",
      "Support process mapping, master data, and testing.",
      "Document test cases/results; help with production support.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent; finance/IS background helpful.",
      "ERP basics + accounting principles; strong analytical skills.",
    ],
    track: "SAP FICO",
    level: "Entry",
  },
  {
    title: "Software Engineer — SAP ABAP (Mid Level)",
    tags: ["SAP ABAP", "Mid level", "On-site", "Full-time"],
    summary:
      "Design, build, and tune ABAP solutions across modules; forms, interfaces, and exits.",
    responsibilities: [
      "Custom programs/reports/interfaces; BADIs, User Exits, BAPIs.",
      "SmartForms/SAPScript/Adobe Forms; IDocs.",
      "Unit tests, performance tuning, documentation; cross-module collaboration.",
    ],
    qualifications: [
      "2+ years SAP ABAP; OO ABAP/CDS Views familiarity.",
      "Module exposure (FICO/MM/SD/HR); strong debugging.",
    ],
    track: "SAP ABAP",
    level: "Mid",
  },
  {
    title: "Software Engineer — SAP ABAP (Entry Level)",
    tags: ["SAP ABAP", "Entry level", "On-site", "Full-time"],
    summary:
      "Learn ABAP development: reports, forms, and enhancements in real projects.",
    responsibilities: [
      "Assist with custom reports/forms/enhancements.",
      "Support testing/debugging; document technical specs.",
      "Learn function modules, BAPIs, BADIs, User Exits.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Academic/training experience in ABAP; DB fundamentals; analytical mindset.",
    ],
    track: "SAP ABAP",
    level: "Entry",
  },
  {
    title: "Software Engineer — Full Stack Java (Mid Level)",
    tags: ["Java", "Mid level", "On-site", "Full-time"],
    summary:
      "Design and deliver enterprise web apps using Spring Boot and modern JS frameworks.",
    responsibilities: [
      "Backend services with Java/Spring Boot; REST APIs.",
      "Frontend with React/Angular/Vue; integrate third-party services.",
      "Unit/integration tests; CI/CD; mentor junior devs.",
    ],
    qualifications: [
      "2+ years Java full-stack; React/Angular/Vue.",
      "CI/CD, Git, SQL/relational DB design; Agile collaboration.",
    ],
    track: "Java",
    level: "Mid",
  },
  {
    title: "Software Engineer — Full Stack Java (Entry Level)",
    tags: ["Java", "Entry level", "On-site", "Full-time"],
    summary: "Build end-to-end web applications with Java, Spring Boot, and modern UIs.",
    responsibilities: [
      "Assist with Java/Spring Boot features and REST endpoints.",
      "UI development with HTML/CSS/JS + React/Angular.",
      "Testing/debugging; secure, maintainable code practices.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Academic project exposure to Java/Spring; Git/DB basics.",
    ],
    track: "Java",
    level: "Entry",
  },
  {
    title: "Software Engineer — Full Stack Python (Mid Level)",
    tags: ["Python", "Mid level", "On-site", "Full-time"],
    summary:
      "Build data-driven apps with Python APIs (Flask/Django) and modern JS front-ends.",
    responsibilities: [
      "Backend APIs with Flask/Django; OAuth/security best practices.",
      "Frontend with React/Vue/Angular; integrate third-party APIs.",
      "Automated tests; Docker; CI/CD; performance/scalability.",
    ],
    qualifications: [
      "2+ years full-stack Python; REST frameworks + modern JS.",
      "Docker, Git, CI/CD; cloud familiarity; strong API design.",
    ],
    track: "Python",
    level: "Mid",
  },
  {
    title: "Software Engineer — Full Stack Python (Entry Level)",
    tags: ["Python", "Entry level", "On-site", "Full-time"],
    summary: "Contribute to Python backends and modern front-ends; learn by shipping.",
    responsibilities: [
      "Assist in Flask/Django services and REST endpoints.",
      "Build responsive UIs (React/Vue/Angular).",
      "Write clean, testable code; collaborate in stand-ups and reviews.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent; Python exposure.",
      "Frontend fundamentals, Git/SQL basics; eagerness to learn.",
    ],
    track: "Python",
    level: "Entry",
  },
  {
    title: "Software Engineer — Workday (Mid Level)",
    tags: ["Workday", "Mid level", "On-site", "Full-time"],
    summary:
      "Configure Workday HCM; reporting, integrations, data migration, and security.",
    responsibilities: [
      "Maintain HCM modules (Comp, Benefits, Time, Recruiting).",
      "Reports, calculated fields, dashboards; Studio/Core Connectors.",
      "Data migration, security, compliance; change/enhancement delivery.",
    ],
    qualifications: [
      "2+ years Workday config/support; reporting/security/EIB.",
      "Strong problem-solving/communication; stakeholder collaboration.",
    ],
    track: "Workday",
    level: "Mid",
  },
  {
    title: "Software Engineer — Workday (Entry Level)",
    tags: ["Workday", "Entry level", "On-site", "Full-time"],
    summary:
      "Support Workday configuration, integrations, reporting, and real-time support.",
    responsibilities: [
      "Assist with HCM config (Core HR/Payroll/Benefits/Recruiting).",
      "Build custom reports; support data loads and testing.",
      "Troubleshoot access/transactions; document processes.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent; ERP/HCM exposure helpful.",
      "Excel + data basics; strong analytical and communication skills.",
    ],
    track: "Workday",
    level: "Entry",
  },
  {
    title: "Software Engineer / Data Analyst (Mid Level)",
    tags: ["Data Analyst", "Mid level", "Analytics", "On-site", "Full-time"],
    summary: "Build dashboards, automate reporting, and deliver analytical insights.",
    responsibilities: [
      "Create Power BI/Tableau dashboards for business KPIs.",
      "Write complex SQL; automate reporting workflows.",
      "Root-cause analysis; partner with data engineers/stakeholders.",
    ],
    qualifications: [
      "2+ years BI/analytics; SQL, Excel, and one viz tool.",
      "Large-dataset wrangling; clear communication of insights.",
    ],
    track: "Data Analyst",
    level: "Mid",
  },
  {
    title: "Software Engineer / Data Analyst (Entry Level)",
    tags: ["Data Analyst", "Entry level", "Analytics", "On-site", "Full-time"],
    summary: "Learn BI fundamentals: clean data, build reports, and track metrics.",
    responsibilities: [
      "Gather/clean data (Excel/SQL/APIs); create charts/reports.",
      "Define metrics; assist ad-hoc analysis; document definitions.",
      "Work with users to translate data needs.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Basic SQL/Excel; exposure to Power BI/Tableau; detail-oriented.",
    ],
    track: "Data Analyst",
    level: "Entry",
  },
  {
    title: "Software Engineer / Data Engineer (Mid Level)",
    tags: ["Data Engineer", "Mid level", "Data", "On-site", "Full-time"],
    summary:
      "Design/optimize pipelines, warehouses, and real-time/batch data flows.",
    responsibilities: [
      "Pipelines with Python/Spark/cloud ETL; data lakes/warehouses.",
      "Integrate structured/semi-structured sources; performance tuning.",
      "CI/CD and data testing frameworks.",
    ],
    qualifications: [
      "2+ years pipeline development; strong SQL + Python.",
      "Cloud data tools (Glue/Dataflow/ADF) familiarity.",
    ],
    track: "Data Engineer",
    level: "Mid",
  },
  {
    title: "Software Engineer / Data Engineer (Entry Level)",
    tags: ["Data Engineer", "Entry level", "Data", "On-site", "Full-time"],
    summary:
      "Help build pipelines and clean/load data across cloud/on-prem platforms.",
    responsibilities: [
      "Assist with ETL/ELT pipelines (Python/ETL tools).",
      "Map/clean/load source data; support warehouse modeling.",
      "Write automation scripts for batch loads.",
    ],
    qualifications: [
      "STEM bachelor's / master's or equivalent.",
      "Exposure to SQL/Python/cloud data tools; ETL concepts.",
    ],
    track: "Data Engineer",
    level: "Entry",
  },
  {
    title: "Software Engineer — Data Science & AI Engineering (Mid Level)",
    tags: ["Data Science & AI", "Mid level", "AI/ML", "On-site", "Full-time"],
    summary:
      "Design, train, and deploy ML/LLM solutions, RAG pipelines, and agentic workflows.",
    responsibilities: [
      "Build ML models (sklearn/XGBoost/TensorFlow/PyTorch).",
      "Fine-tune LLMs; implement RAG with vector DBs; agent frameworks.",
      "MLOps with MLflow/DVC + cloud; dashboards and AIOps contributions.",
    ],
    qualifications: [
      "2+ years ML development/deployment; Python/SQL; cloud (AWS/GCP/Azure).",
      "LangChain/LlamaIndex; Docker/K8s for AI workflows; strong communication.",
    ],
    track: "Data Science & AI",
    level: "Mid",
  },
  {
    title: "Software Engineer — Data Science & AI Engineering (Entry Level)",
    tags: ["Data Science & AI", "Entry level", "AI/ML", "On-site", "Full-time"],
    summary:
      "Learn ML/LLM basics, RAG workflows, and MLOps by building real prototypes.",
    responsibilities: [
      "Prep/clean/explore data; assist in model training/eval.",
      "Try LLM fine-tuning, embeddings, simple RAG pipelines.",
      "Document experiments and results; join reviews and discussions.",
    ],
    qualifications: [
      "STEM bachelor's (CS/Data/Stats/Math/etc.); Python/SQL basics.",
      "Familiarity with sklearn/HF/TensorFlow; strong curiosity for GenAI.",
    ],
    track: "Data Science & AI",
    level: "Entry",
  },
];

// ---------------------------------------------------------------------------
// Job Card Sub-component
// ---------------------------------------------------------------------------

function JobCard({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const mailtoHref = `mailto:hr@skyveon.ai?subject=${encodeURIComponent(
    `Application for ${job.title}`
  )}&body=${encodeURIComponent(
    `Hi Skyveon Hiring Team,\n\nI'm applying for the ${job.title} role.\n\nBASICS\n* Full name:\n* Phone:\n* Current location (City, State):\n* Work authorization:\n\nLINKS\n* LinkedIn:\n* GitHub/Portfolio:\n\nEXPERIENCE SNAPSHOT\n* Years of experience:\n* Most recent employer / project:\n* Notice period / availability:\n\nPlease find my resume attached.\n\nThank you,`
  )}`;

  return (
    <div
      className="job-row group transition-all duration-200 rounded-[20px] border border-slate-100 bg-white shadow-sm hover:border-orange-200 hover:shadow-[0_8px_32px_rgba(249,115,22,0.10)]"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Header row — always visible */}
      <div className="p-7 flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-5 flex-1 min-w-0">
          <span className="text-2xl font-extrabold text-orange-400 min-w-[2.2rem] mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {job.title}
            </h3>
            {/* Tags */}
            <div className="mt-2.5 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-[11px] font-semibold text-slate-500 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
              {job.summary}
            </p>
          </div>
        </div>

        {/* Right: expand + apply */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[12px] border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-150 hover:border-orange-300 hover:text-orange-500"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Details <ChevronDown size={14} />
              </>
            )}
          </button>
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-2 rounded-[12px] bg-orange-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(249,115,22,0.42)]"
          >
            Apply Now <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Expandable detail panel */}
      {expanded && (
        <div className="border-t border-slate-100 px-7 pb-7 pt-5 grid md:grid-cols-2 gap-8">
          {/* Responsibilities */}
          <div>
            <h4 className="text-[13px] font-bold text-slate-400 tracking-widest uppercase mb-3">
              Key Responsibilities
            </h4>
            <ul className="space-y-2.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div>
            <h4 className="text-[13px] font-bold text-slate-400 tracking-widest uppercase mb-3">
              Qualifications
            </h4>
            <ul className="space-y-2.5">
              {job.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                  {q}
                </li>
              ))}
            </ul>

            {/* Location & EEO */}
            <div className="mt-5 space-y-1.5">
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <MapPin size={11} />
                Columbus, OH (On-site; may include unanticipated U.S. locations) · Full-time
              </p>
              <p className="text-[12px] text-slate-400">
                Equal Opportunity Employer · E-Verify participant ·{" "}
                <a
                  href="mailto:hr@skyveon.ai"
                  className="text-orange-400 hover:text-orange-500 transition-colors"
                >
                  hr@skyveon.ai
                </a>{" "}
                for accommodations
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function CareersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  const [activeTrack, setActiveTrack] = useState("All tracks");
  const [activeLevel, setActiveLevel] = useState("All levels");

  const filteredJobs = jobs.filter((job) => {
    const trackMatch = activeTrack === "All tracks" || job.track === activeTrack;
    const levelMatch = activeLevel === "All levels" || job.level === activeLevel;
    return trackMatch && levelMatch;
  });

  useGsap(() => {
    gsap.set([".benefit-card", ".job-row", ".filter-pill"], {
      willChange: "transform, opacity",
    });

    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      .from(".hero-badge", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero-h1-line", { opacity: 0, y: 60, stagger: 0.12, duration: 1 }, "-=0.2")
      .from(".hero-para", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5");

    gsap.from(".career-cta", {
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".career-cta", start: "top 80%", once: true },
    });
  }, []);

  return (
    <div className="font-sans">
      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-8 md:py-12"
        style={{
          background: "linear-gradient(135deg,#fff7ed 0%,#fff 50%,#fff 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/career-banner.webp"
            alt="Skyveon Careers"
            className="absolute inset-0 h-full w-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/15 to-orange-500/[0.09]" />
       </div>

        <div className="relative max-w-7xl mx-auto px-10">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-[18px] py-2 text-[13px] font-semibold text-orange-500 tracking-widest">
            <Sparkles size={13} />
            CAREERS AT SKYVEON
          </span>

          <h1 className="mt-8 text-3xl md:text-7xl font-bold leading-none tracking-tight text-slate-900">
            <span className="block">
              <span className="hero-h1-line block">Build The Future</span>
            </span>
            <span className="block">
              <span className="hero-h1-line block text-orange-500">With Skyveon</span>
            </span>
          </h1>

          <p className="hero-para mt-8 max-w-xl text-xl leading-relaxed text-slate-900 font-normal">
            Join a team of engineers, architects, AI specialists, and innovators
            building enterprise technology that transforms businesses.
          </p>
        </div>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section
        ref={benefitsRef}
        className="py-8 md:py-12 bg-gray-50 border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-8">
            <span className="text-orange-500 font-bold text-[12px] tracking-[0.12em]">
              BENEFITS & PERKS
            </span>
            <h2 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-slate-900">
              What You'll Love
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="benefit-card transition-transform duration-200 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm cursor-default hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 flex items-center justify-center">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <h3 className="mt-5 text-[1.2rem] font-bold text-slate-900">{b.title}</h3>
                  <p className="mt-3 text-slate-500 leading-relaxed text-sm font-light">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN POSITIONS ═══════════ */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          {/* Section header */}
          <div className="mb-10">
            <span className="text-orange-500 font-bold text-[12px] tracking-[0.12em]">
              JOIN THE TEAM
            </span>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-slate-900">
              Open Positions
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl">
              We turn ideas into dependable systems. If you love practical engineering,
              clear ownership, and measurable impact, you'll fit right in.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-10 space-y-5">
            {/* Track filter */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">
                Track
              </p>
              <div className="flex flex-wrap gap-2">
                {tracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => setActiveTrack(track)}
                    className={`filter-pill px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                      activeTrack === track
                        ? "bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Level filter */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-3">
                Level
              </p>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`filter-pill px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                      activeLevel === level
                        ? "bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="mb-6 text-[13px] text-slate-400 font-medium">
            Showing{" "}
            <span className="text-orange-500 font-bold">{filteredJobs.length}</span>{" "}
            {filteredJobs.length === 1 ? "role" : "roles"}
          </p>

          {/* Job cards */}
          <div className="flex flex-col gap-4">
            {filteredJobs.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-slate-200 py-16 text-center text-slate-400">
                No roles match these filters. Try broadening your selection.
              </div>
            ) : (
              filteredJobs.map((job, i) => (
                <JobCard key={job.title} job={job} index={i} />
              ))
            )}
          </div>

          {/* Email nudge */}
          <div className="mt-10 flex items-center gap-2 text-sm text-slate-400">
            <Mail size={14} />
            Don't see the right fit? Reach out directly at{" "}
            <a
              href="mailto:hr@skyveon.ai"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              hr@skyveon.ai
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA STRIP ═══════════ */}
      <section className="career-cta py-20 bg-orange-500 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">
            Ready to Build Something Amazing?
          </h2>
          <p className="mt-4 text-white/85 text-lg leading-relaxed font-light">
            Your next big career move starts here. We'd love to meet you.
          </p>
        </div>
      </section>
    </div>
  );
}