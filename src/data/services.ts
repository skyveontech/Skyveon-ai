export interface ServiceData {
  slug: string;

  title: string;

  subtitle: string;

  description: string;

  heroImage: string;
  overviewImage: string;

  accent: string;

  overview: string;

  capabilities: string[];

  technologies: string[];

  process: {
    title: string;
    description: string;
  }[];

  benefits: {
    title: string;
    description: string;
  }[];

  stats: {
    value: string;
    label: string;
  }[];
}
export const services: ServiceData[] = [
  {
    slug: "digital-product-engineering",

    title: "Digital Product Engineering",

    subtitle: "Modern Web & Mobile Experiences",

    description:
      "Build scalable digital products engineered for performance, growth, and exceptional user experience.",

    // heroImage: "/images/services/digital-banner.webp",
      heroImage: "/images/services/hero-bg.webp",

    overviewImage: "/images/services/digital.webp",

    accent: "from-orange-500 to-red-500",

    overview:
      "We design and build high-performance digital products that combine exceptional user experiences with scalable engineering. From discovery to deployment, we help organizations launch products faster while maintaining quality and long-term maintainability.",

    capabilities: [
      "Web Applications",
      "Mobile Applications",
      "UI/UX Design",
      "API Development",
      "Design Systems",
      "Progressive Web Apps",
    ],

    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "React Native",
      "Tailwind CSS",
    ],

    process: [
      {
        title: "Discover",
        description:
          "Understand business goals, users, and technical constraints.",
      },
      {
        title: "Design",
        description: "Create intuitive experiences and scalable architectures.",
      },
      {
        title: "Build",
        description: "Develop secure and high-performance solutions.",
      },
      {
        title: "Deploy",
        description: "Release with confidence using automated pipelines.",
      },
      {
        title: "Scale",
        description: "Continuously optimize and evolve platforms.",
      },
    ],

    benefits: [
      {
        title: "Faster Delivery",
        description:
          "Accelerate product launches with modern engineering practices.",
      },
      {
        title: "Scalable Architecture",
        description: "Built to handle growth from day one.",
      },
      {
        title: "Superior UX",
        description: "Deliver seamless experiences users love.",
      },
    ],

    stats: [
      {
        value: "3x",
        label: "Faster Releases",
      },
      {
        value: "99.9%",
        label: "Application Uptime",
      },
      {
        value: "50+",
        label: "Products Delivered",
      },
    ],
  },
  {
  slug: "cloud-devops",

  title: "Cloud & DevOps (SRE)",

  subtitle: "Reliable Cloud Infrastructure",

  description:
    "Automate deployments, improve reliability, and scale confidently with modern cloud and DevOps practices.",

  // heroImage: "/images/services/cloud-banner.webp",
    heroImage: "/images/services/hero-bg.webp",

  overviewImage: "/images/services/cloud.webp",

  accent: "from-sky-500 to-blue-600",

  overview:
    "We design and manage resilient cloud environments that help organizations deploy faster, recover quicker, and operate with confidence. From infrastructure automation to observability and reliability engineering, we build scalable cloud foundations that support long-term growth.",

  capabilities: [
    "Infrastructure as Code",
    "CI/CD Pipelines",
    "Monitoring & Observability",
    "Kubernetes & Containers",
    "Cloud Migration",
    "Site Reliability Engineering",
  ],

  technologies: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Terraform",
    "Kubernetes",
    "ArgoCD",
    "Docker",
    "Prometheus",
  ],

  process: [
    {
      title: "Assess",
      description:
        "Evaluate your current infrastructure, deployment flow, and reliability gaps.",
    },
    {
      title: "Automate",
      description:
        "Build Infrastructure as Code and CI/CD pipelines for repeatable delivery.",
    },
    {
      title: "Observe",
      description:
        "Implement logging, metrics, tracing, and alerting for full visibility.",
    },
    {
      title: "Optimize",
      description:
        "Improve performance, reduce operational overhead, and strengthen resilience.",
    },
    {
      title: "Scale",
      description:
        "Continuously refine systems to support growth, uptime, and future expansion.",
    },
  ],

  benefits: [
    {
      title: "Higher Uptime",
      description:
        "Keep systems available and resilient with proactive monitoring and SRE practices.",
    },
    {
      title: "Faster Deployments",
      description:
        "Release confidently through automated pipelines and cloud-native workflows.",
    },
    {
      title: "Lower Costs",
      description:
        "Optimize cloud usage and operational efficiency without sacrificing reliability.",
    },
  ],

  stats: [
    {
      value: "99.99%",
      label: "Infrastructure Availability",
    },
    {
      value: "70%",
      label: "Deployment Automation",
    },
    {
      value: "40%",
      label: "Reduced Cloud Costs",
    },
  ],
},
{
  slug: "data-engineering-analytics",

  title: "Data Engineering & Analytics",

  subtitle: "Modern Data Foundations",

  description:
    "Build reliable data pipelines, analytics platforms, and executive dashboards that turn raw data into actionable business insights.",

  // heroImage: "/images/services/data-banner.webp",
    heroImage: "/images/services/hero-bg.webp",

  overviewImage: "/images/services/data.webp",

  accent: "from-violet-500 to-fuchsia-500",

  overview:
    "We design and implement modern data ecosystems that unify sources, improve data quality, and deliver trusted insights at scale. From ingestion to visualization, we help organizations build analytics platforms that support smarter decisions and measurable business outcomes.",

  capabilities: [
    "Data Pipelines",
    "ETL / ELT Development",
    "Data Warehousing",
    "Lakehouse Architecture",
    "Business Intelligence Dashboards",
    "Real-time Analytics",
  ],

  technologies: [
    "dbt",
    "Spark",
    "Databricks",
    "Delta Lake",
    "Snowflake",
    "Airflow",
    "Power BI",
    "Tableau",
  ],

  process: [
    {
      title: "Discover",
      description:
        "Identify data sources, business metrics, reporting needs, and governance requirements.",
    },
    {
      title: "Ingest",
      description:
        "Collect, clean, and standardize data from systems, APIs, and event streams.",
    },
    {
      title: "Model",
      description:
        "Design scalable warehouses, lakehouses, and semantic data layers.",
    },
    {
      title: "Visualize",
      description:
        "Deliver dashboards and self-service reporting for teams and leadership.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve freshness, reliability, and cost efficiency.",
    },
  ],

  benefits: [
    {
      title: "Trusted Insights",
      description:
        "Make decisions based on clean, consistent, and well-modeled data.",
    },
    {
      title: "Faster Reporting",
      description:
        "Reduce manual work with automated pipelines and dashboard refreshes.",
    },
    {
      title: "Scalable Platform",
      description:
        "Support growing data volumes and new use cases with a future-ready architecture.",
    },
  ],

  stats: [
    {
      value: "10M+",
      label: "Records Processed",
    },
    {
      value: "99.9%",
      label: "Pipeline Reliability",
    },
    {
      value: "5x",
      label: "Faster Reporting",
    },
  ],
},{
  slug: "enterprise-platforms",

  title: "Enterprise Platforms",

  subtitle: "Workday, Salesforce & Enterprise Transformation",

  description:
    "Maximize the value of enterprise platforms through seamless implementation, integration, customization, and ongoing optimization.",

  // heroImage: "/images/services/enterprise-banner.webp",
    heroImage: "/images/services/hero-bg.webp",

  overviewImage: "/images/services/enterprise.webp",

  accent: "from-emerald-500 to-teal-600",

  overview:
    "Enterprise platforms are the backbone of modern organizations. We help businesses implement, integrate, and optimize platforms such as Workday and Salesforce to streamline operations, improve employee experiences, and drive business growth. Our approach combines technical expertise with business strategy to ensure measurable outcomes and long-term success.",

  capabilities: [
    "Workday HCM & Finance",
    "Salesforce Implementation",
    "CRM & ERP Integration",
    "Business Process Automation",
    "Enterprise Application Modernization",
    "Platform Support & Optimization",
  ],

  technologies: [
    "Workday",
    "Salesforce",
    "MuleSoft",
    "Boomi",
    "ServiceNow",
    "Oracle",
    "SAP",
    "Azure Integration Services",
  ],

  process: [
    {
      title: "Assess",
      description:
        "Evaluate business processes, platform landscape, and transformation goals.",
    },
    {
      title: "Design",
      description:
        "Create scalable platform architectures and integration strategies aligned with business objectives.",
    },
    {
      title: "Implement",
      description:
        "Deploy enterprise platforms with best practices, governance, and security controls.",
    },
    {
      title: "Integrate",
      description:
        "Connect systems, automate workflows, and ensure seamless data exchange across the organization.",
    },
    {
      title: "Optimize",
      description:
        "Continuously enhance platform performance, adoption, and business value.",
    },
  ],

  benefits: [
    {
      title: "Operational Efficiency",
      description:
        "Eliminate manual processes and improve productivity through automation.",
    },
    {
      title: "Unified Business Systems",
      description:
        "Connect people, processes, and data across departments and platforms.",
    },
    {
      title: "Faster Business Outcomes",
      description:
        "Accelerate decision-making and transformation initiatives with modern enterprise tools.",
    },
  ],

  stats: [
    {
      value: "50+",
      label: "Enterprise Integrations",
    },
    {
      value: "40%",
      label: "Process Automation Gains",
    },
    {
      value: "99.9%",
      label: "Platform Availability",
    },
  ],
},

{
  slug: "ai-machine-learning",

  title: "AI & Machine Learning",

  subtitle: "Intelligent Systems That Scale",

  description:
    "Transform business operations with AI-powered solutions, machine learning models, intelligent automation, and enterprise-grade generative AI systems.",

  heroImage: "/images/services/hero-bg.webp",
  overviewImage: "/images/services/ai.webp",

  accent: "from-fuchsia-500 to-purple-600",

  overview:
    "Artificial Intelligence is reshaping how organizations operate, innovate, and compete. We help businesses design, develop, and deploy AI solutions that deliver measurable outcomes—from intelligent automation and predictive analytics to private LLM assistants and generative AI applications. Our approach focuses on security, governance, scalability, and business value to ensure AI initiatives move beyond experimentation and into production.",

  capabilities: [
    "Generative AI Applications",
    "Private LLM Assistants",
    "Retrieval-Augmented Generation (RAG)",
    "Predictive Analytics",
    "Machine Learning Models",
    "Intelligent Process Automation",
    "AI Chatbots & Virtual Assistants",
    "MLOps & Model Monitoring",
  ],

  technologies: [
    "OpenAI",
    "Azure OpenAI",
    "LangChain",
    "LlamaIndex",
    "Pinecone",
    "Weaviate",
    "Python",
    "TensorFlow",
    "PyTorch",
    "MLflow",
  ],

  process: [
    {
      title: "Discover",
      description:
        "Identify high-value AI opportunities, business objectives, and data readiness.",
    },
    {
      title: "Prepare",
      description:
        "Collect, clean, and structure data while establishing governance and security controls.",
    },
    {
      title: "Build",
      description:
        "Develop machine learning models, AI assistants, and intelligent automation workflows.",
    },
    {
      title: "Deploy",
      description:
        "Launch production-ready AI systems with monitoring, evaluation, and guardrails.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve model performance, accuracy, and business impact.",
    },
  ],

  benefits: [
    {
      title: "Intelligent Automation",
      description:
        "Reduce manual effort and increase productivity through AI-driven workflows.",
    },
    {
      title: "Data-Driven Decisions",
      description:
        "Leverage predictive insights to improve planning, forecasting, and strategy.",
    },
    {
      title: "Enterprise AI Adoption",
      description:
        "Deploy secure, scalable AI solutions with governance and compliance built in.",
    },
  ],

  stats: [
    {
      value: "85%",
      label: "Automation Efficiency",
    },
    {
      value: "10x",
      label: "Faster Knowledge Access",
    },
    {
      value: "40%",
      label: "Reduction In Operational Costs",
    },
  ],
}

];
