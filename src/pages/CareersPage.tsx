"use client";

import FormData from "form-data";
import Mailgun from "mailgun.js";

import { useRef, useState, useEffect } from "react";
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
  X,
  Paperclip,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import gsap from "@/lib/gsap";
import useGsap from "@/hooks/use-gsap";

const apiKey = import.meta.env.VITE_MAILGUN_API;
// console.log("Mailgun API Key:", apiKey);


// ---------------------------------------------------------------------------
// Types & Data
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
  },{
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
    tags: [
      "Cloud DevOps",
      "Mid level",
      "Cloud",
      "Kubernetes",
      "On-site",
      "Full-time",
    ],
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
    summary:
      "Build end-to-end web applications with Java, Spring Boot, and modern UIs.",
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
    summary:
      "Contribute to Python backends and modern front-ends; learn by shipping.",
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
    summary:
      "Build dashboards, automate reporting, and deliver analytical insights.",
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
    summary:
      "Learn BI fundamentals: clean data, build reports, and track metrics.",
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
// Modal Component
// ---------------------------------------------------------------------------

function ApplicationModal({
  isOpen,
  onClose,
  jobTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "unset";
      setIsSuccess(false);
      setFileName(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: apiKey || "",
    });
    // console.log("Mailgun Client Initialized:", mg);
    // console.log("api key:", apiKey);
    try {
      const formData = new window.FormData(e.currentTarget);
      // console.log("Form Data:", Object.fromEntries(formData.entries()));

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const linkedin = formData.get("linkedin");
      const resume = formData.get("resume") as File;

      // console.log({ firstName, lastName, email, phone, linkedin, jobTitle });

      const data = await mg.messages.create(
        "sandboxb6f850e17aa84a5b805bedd32e84107e.mailgun.org",
        {
          from: "Mailgun Sandbox <postmaster@sandboxb6f850e17aa84a5b805bedd32e84107e.mailgun.org>",
          // to: ["<hr@skyveon.ai>"],
          to: ["<nexvosolutions@gmail.com>"],
          subject: `New Application - ${jobTitle} (${firstName} ${lastName})`,
          text: `
        Position: ${jobTitle}
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        LinkedIn: ${linkedin}
      `,
      attachment: resume,
        },
      );

      // console.log(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Mailgun Error:", error);
      alert("Failed to send application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Apply Now
            </p>
            <h3 className="text-lg font-bold text-slate-900">{jobTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Application Sent!
              </h4>
              <p className="mt-2 text-slate-500 max-w-md">
                Thank you for applying to Skyveon. Our talent team will review
                your profile and reach out if there's a match.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-slate-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-slate-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    id="phone"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="linkedin"
                  className="text-sm font-semibold text-slate-700">
                  LinkedIn URL <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Resume / CV <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center justify-center w-full">
                  <label
                    htmlFor="resume"
                    className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-orange-400 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Paperclip className="w-6 h-6 mb-2 text-slate-400" />
                      <p className="mb-1 text-sm text-slate-600 font-medium">
                        {fileName ? fileName : "Click to upload your resume"}
                      </p>
                      <p className="text-xs text-slate-400">
                        PDF, DOCX, or TXT (Max 5MB)
                      </p>
                    </div>
                    <input
                      required
                      type="file"
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) =>
                        setFileName(e.target.files?.[0]?.name || null)
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/40 disabled:opacity-70 disabled:hover:translate-y-0">
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Job Card Sub-component
// ---------------------------------------------------------------------------

function JobCard({
  job,
  index,
  onApply,
}: {
  job: Job;
  index: number;
  onApply: (title: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!expanded || !detailsRef.current) return;
    gsap.from(detailsRef.current, {
      height: 0,
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [expanded]);

  return (
    <div
      className="job-row group transition-all duration-300 rounded-[20px] border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Header Row: Responsive Grid */}
      <div className="p-6 md:p-7 flex flex-col md:flex-row items-start justify-between gap-6">
        
        {/* Left Section: Index + Info */}
        <div className="flex items-start gap-4 md:gap-5 flex-1 min-w-0 w-full">
          <span className="text-xl md:text-2xl font-extrabold text-orange-400 min-w-[1.8rem] md:min-w-[2.2rem] mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 w-full">
            <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {job.title}
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-[10px] md:text-[11px] font-semibold text-slate-500 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
              {job.summary}
            </p>
          </div>
        </div>

        {/* Right Section: Controls (Full width on mobile, auto on desktop) */}
        <div className="flex w-full md:w-auto items-center gap-3 shrink-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-700 transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            {expanded ? (
              <>Less <ChevronUp size={14} /></>
            ) : (
              <>Details <ChevronDown size={14} /></>
            )}
          </button>
          <button
            onClick={() => onApply(job.title)}
            className="flex-1 md:flex-none apply-btn inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-[13px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95"
          >
            Apply <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Expandable detail panel */}
      {expanded && (
        <div
          ref={detailsRef}
          className="job-details border-t border-slate-100 px-6 md:px-7 pb-7 pt-5 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <h4 className="text-[11px] md:text-[13px] font-bold text-slate-400 tracking-widest uppercase mb-3">
              Key Responsibilities
            </h4>
            <ul className="space-y-2.5">
              {job.responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] md:text-[13px] font-bold text-slate-400 tracking-widest uppercase mb-3">
              Qualifications
            </h4>
            <ul className="space-y-2.5">
              {job.qualifications.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
            {/* Location & EEO info - Adjusting font sizes for smaller screens */}
            <div className="mt-6 space-y-1.5">
              <p className="flex items-center gap-1.5 text-[11px] md:text-[12px] text-slate-400">
                <MapPin size={11} /> Columbus, OH (On-site) · Full-time
              </p>
              <p className="text-[11px] md:text-[12px] text-slate-400">
                Equal Opportunity Employer ·{" "}
                <a
                  href="mailto:hr@skyveon.ai"
                  className="text-orange-400 hover:text-orange-500 transition-colors"
                >
                  hr@skyveon.ai
                </a>
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
  const jobsRef = useRef<HTMLElement>(null);

  const [activeTrack, setActiveTrack] = useState("All tracks");
  const [activeLevel, setActiveLevel] = useState("All levels");

  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const handleApplyClick = (title: string) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  const filteredJobs = jobs.filter((job) => {
    const trackMatch =
      activeTrack === "All tracks" || job.track === activeTrack;
    const levelMatch =
      activeLevel === "All levels" || job.level === activeLevel;
    return trackMatch && levelMatch;
  });

  useGsap(() => {
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl
      .from(".hero-badge", { opacity: 0, y: 20, duration: 0.5 })
      .from(
        ".hero-h1-line",
        { opacity: 0, y: 60, stagger: 0.12, duration: 0.9 },
        "-=0.2",
      )
      .from(".hero-para", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4");

    gsap.set(".benefit-card", { opacity: 0, y: 50 });
    gsap.to(".benefit-card", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.set(".filter-pill", { opacity: 0, scale: 0.9 });
    gsap.to(".filter-pill", {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      stagger: 0.03,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: jobsRef.current, start: "top 85%", once: true },
    });

    gsap.utils.toArray<HTMLElement>(".job-row").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        x: index % 2 === 0 ? -40 : 40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    gsap.from(".career-cta", {
      opacity: 0,
      y: 50,
      scale: 0.97,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".career-cta", start: "top 80%", once: true },
    });
  }, [filteredJobs.length]);

  return (
    <div className="font-sans">
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-12 md:py-20 bg-slate-50">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/career-bg.webp"
            alt="Skyveon Careers"
            className="absolute inset-0 h-full w-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-orange-50/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 backdrop-blur-md px-5 py-2.5 text-xs font-bold text-orange-500 tracking-widest shadow-sm">
            <Sparkles size={14} />
            CAREERS AT SKYVEON
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-slate-900">
            <span className="block overflow-hidden">
              <span className="hero-h1-line block">Build The Future</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-h1-line block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent pb-2">
                With Skyveon
              </span>
            </span>
          </h1>

          <p className="hero-para mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
            Join a team of engineers, architects, AI specialists, and innovators
            building enterprise technology that transforms businesses.
          </p>
        </div>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section ref={benefitsRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">
              Benefits & Perks
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              What You'll Love
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="benefit-card group rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] hover:border-orange-100 cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:border-orange-200">
                    <Icon size={22} className="text-orange-500" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-slate-500 leading-relaxed text-sm">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN POSITIONS ═══════════ */}
      <section
        ref={jobsRef}
        className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">
              Join The Team
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Open Positions
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl leading-relaxed">
              We turn ideas into dependable systems. If you love practical
              engineering, clear ownership, and measurable impact, you'll fit
              right in.
            </p>
          </div>

          <div className="mb-12 space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
                Track
              </p>
              <div className="flex flex-wrap gap-2.5">
                {tracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => setActiveTrack(track)}
                    className={`filter-pill px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeTrack === track
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                    }`}>
                    {track}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
                Level
              </p>
              <div className="flex flex-wrap gap-2.5">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`filter-pill px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeLevel === level
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                    }`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-6 text-sm text-slate-500 font-medium">
            Showing{" "}
            <span className="text-slate-900 font-bold">
              {filteredJobs.length}
            </span>{" "}
            {filteredJobs.length === 1 ? "role" : "roles"}
          </p>

          <div className="flex flex-col gap-5">
            {filteredJobs.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white py-20 text-center text-slate-500 font-medium">
                No roles match these filters. Try broadening your selection.
              </div>
            ) : (
              filteredJobs.map((job, i) => (
                <JobCard
                  key={job.title}
                  job={job}
                  index={i}
                  onApply={handleApplyClick}
                />
              ))
            )}
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
