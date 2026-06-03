export interface TechnologyGroup {
  title: string;
  description: string;
  technologies: string[];
}

export interface ServiceData {
  slug: string;

  title: string;

  subtitle: string;

  description: string;

  heroImage: string;

  overviewImage: string;

  accent: string;

  overview: string;

  technologyGroups: TechnologyGroup[];
  

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

    heroImage: "/images/services/digital-banner.avif",
    // heroImage: "/images/services/hero-bg.avif",

    overviewImage: "/images/services/digital.avif",

    accent: "from-orange-500 to-red-500",

    overview:
      "We design and build high-performance digital products that combine exceptional user experiences with scalable engineering. From discovery to deployment, we help organizations launch products faster while maintaining quality and long-term maintainability.",

    technologyGroups: [
      {
        title: "Frontend & Experience",
        description:
          "Modern user interfaces and digital experiences designed for performance and engagement.",
        technologies: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Figma",
        ],
      },
      {
        title: "Applications",
        description:
          "Cross-platform web and mobile applications built for scale.",
        technologies: ["React Native", "PWA", "Android", "iOS"],
      },
      {
        title: "Backend & APIs",
        description: "Robust backend systems, integrations, and scalable APIs.",
        technologies: ["Node.js", "Express", "GraphQL", "REST APIs"],
      },
      {
        title: "Cloud & DevOps",
        description:
          "Automated deployment pipelines and cloud-native infrastructure.",
        technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
      },
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
    "Build resilient cloud platforms, automate delivery pipelines, and operate with confidence through modern DevOps and Site Reliability Engineering practices.",

  heroImage: "/images/services/cloud-banner.jpg",

  overviewImage: "/images/services/cloud.avif",

  accent: "from-sky-500 to-blue-600",

  overview:
    "We help organizations modernize infrastructure, automate operations, and improve reliability through cloud-native architectures and DevOps best practices. From cloud migrations and platform engineering to observability and SRE, we create scalable systems that enable faster innovation while maintaining security, performance, and uptime.",

  technologyGroups: [
    {
      title: "Cloud Platforms",
      description:
        "Secure, scalable cloud environments designed for performance, resilience, and growth.",
      technologies: [
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Multi-Cloud",
        "Hybrid Cloud",
      ],
    },

    {
      title: "Infrastructure & Automation",
      description:
        "Infrastructure as Code and automation frameworks that ensure consistency and repeatability.",
      technologies: [
        "Terraform",
        "CloudFormation",
        "Pulumi",
        "Ansible",
        "GitOps",
      ],
    },

    {
      title: "Containers & Platform Engineering",
      description:
        "Modern container orchestration and internal platform solutions for developer productivity.",
      technologies: [
        "Docker",
        "Kubernetes",
        "OpenShift",
        "Helm",
        "ArgoCD",
      ],
    },

    {
      title: "Observability & Reliability",
      description:
        "End-to-end monitoring, tracing, and incident management for mission-critical systems.",
      technologies: [
        "Prometheus",
        "Grafana",
        "Datadog",
        "OpenTelemetry",
        "PagerDuty",
      ],
    },

    {
      title: "CI/CD & DevSecOps",
      description:
        "Automated delivery pipelines with built-in security, compliance, and governance controls.",
      technologies: [
        "GitHub Actions",
        "GitLab CI",
        "Jenkins",
        "SonarQube",
        "Snyk",
      ],
    },

    {
      title: "Security & Compliance",
      description:
        "Cloud security frameworks and compliance automation for enterprise environments.",
      technologies: [
        "IAM",
        "Vault",
        "Zero Trust",
        "FedRAMP",
        "SOC 2",
      ],
    },
  ],

  process: [
    {
      title: "Assess",
      description:
        "Evaluate infrastructure, deployment workflows, security posture, and operational maturity.",
    },
    {
      title: "Design",
      description:
        "Create cloud architectures, platform strategies, and automation blueprints aligned with business goals.",
    },
    {
      title: "Automate",
      description:
        "Implement Infrastructure as Code, CI/CD pipelines, and operational automation.",
    },
    {
      title: "Observe",
      description:
        "Deploy monitoring, logging, tracing, and incident response capabilities for full visibility.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve reliability, security, performance, and cloud cost efficiency.",
    },
  ],

  benefits: [
    {
      title: "Faster Delivery",
      description:
        "Accelerate software releases through automation and streamlined deployment workflows.",
    },
    {
      title: "Improved Reliability",
      description:
        "Reduce downtime with proactive monitoring, SRE practices, and resilient architectures.",
    },
    {
      title: "Cloud Cost Optimization",
      description:
        "Gain visibility and control over infrastructure spending while maximizing performance.",
    },
    {
      title: "Enhanced Security",
      description:
        "Embed security and compliance into every stage of the software delivery lifecycle.",
    },
  ],

  stats: [
    {
      value: "99.99%",
      label: "Platform Availability",
    },
    {
      value: "80%",
      label: "Deployment Automation",
    },
    {
      value: "50%",
      label: "Faster Release Cycles",
    },
  ],
},
  {
  slug: "data-engineering-analytics",

  title: "Data Engineering & Analytics",

  subtitle: "Modern Data Foundations",

  description:
    "Build reliable data pipelines, analytics platforms, and executive dashboards that transform raw data into actionable business intelligence.",

  heroImage: "/images/services/data-banner.avif",

  overviewImage: "/images/services/data.avif",

  accent: "from-violet-500 to-fuchsia-500",

  overview:
    "We help organizations unlock the full value of their data through modern data engineering, analytics, and business intelligence solutions. From data ingestion and transformation to lakehouse architectures and executive dashboards, we create trusted data ecosystems that empower teams to make faster, smarter decisions.",

  technologyGroups: [
    {
      title: "Data Integration & Pipelines",
      description:
        "Automated ingestion and transformation pipelines that move data reliably across systems.",
      technologies: [
        "Apache Airflow",
        "dbt",
        "Fivetran",
        "Kafka",
        "Spark Streaming",
      ],
    },

    {
      title: "Data Warehousing",
      description:
        "Centralized analytical platforms optimized for performance, governance, and scale.",
      technologies: [
        "Snowflake",
        "BigQuery",
        "Amazon Redshift",
        "Azure Synapse",
        "PostgreSQL",
      ],
    },

    {
      title: "Lakehouse Architecture",
      description:
        "Modern lakehouse platforms that unify structured and unstructured data workloads.",
      technologies: [
        "Databricks",
        "Delta Lake",
        "Apache Spark",
        "Iceberg",
        "Data Lake Storage",
      ],
    },

    {
      title: "Business Intelligence",
      description:
        "Executive dashboards and self-service analytics that drive data-informed decisions.",
      technologies: [
        "Power BI",
        "Tableau",
        "Looker",
        "Superset",
        "Metabase",
      ],
    },

    {
      title: "Real-Time Analytics",
      description:
        "Event-driven architectures that deliver operational insights as data is generated.",
      technologies: [
        "Kafka",
        "Flink",
        "Spark Streaming",
        "Redis",
        "Event Hubs",
      ],
    },

    {
      title: "Data Governance & Quality",
      description:
        "Data quality frameworks, lineage tracking, and governance controls for trusted analytics.",
      technologies: [
        "Great Expectations",
        "Data Catalogs",
        "Collibra",
        "Monte Carlo",
        "OpenMetadata",
      ],
    },
  ],

  process: [
    {
      title: "Discover",
      description:
        "Assess data sources, business goals, reporting requirements, and governance needs.",
    },
    {
      title: "Ingest",
      description:
        "Collect, cleanse, and standardize data from applications, APIs, databases, and event streams.",
    },
    {
      title: "Model",
      description:
        "Design scalable warehouses, lakehouses, and semantic layers optimized for analytics.",
    },
    {
      title: "Visualize",
      description:
        "Create executive dashboards and self-service reporting experiences.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve performance, data quality, reliability, and cost efficiency.",
    },
  ],

  benefits: [
    {
      title: "Trusted Insights",
      description:
        "Make business decisions using accurate, governed, and high-quality data.",
    },
    {
      title: "Faster Reporting",
      description:
        "Reduce manual effort with automated pipelines and near real-time dashboards.",
    },
    {
      title: "Scalable Data Platform",
      description:
        "Support growing data volumes and advanced analytics workloads with confidence.",
    },
    {
      title: "Improved Visibility",
      description:
        "Gain a complete view of business operations through centralized analytics.",
    },
  ],

  stats: [
    {
      value: "10B+",
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
},
{
  slug: "enterprise-platforms",

  title: "Enterprise Platforms",

  subtitle: "Workday, Salesforce & Enterprise Transformation",

  description:
    "Maximize the value of enterprise platforms through seamless implementation, integration, automation, and continuous optimization.",

  heroImage: "/images/services/enterprise-banner.avif",

  overviewImage: "/images/services/enterprise.avif",

  accent: "from-emerald-500 to-teal-600",

  overview:
    "Enterprise platforms power the core operations of modern organizations. We help businesses implement, integrate, and optimize solutions such as Workday, Salesforce, ServiceNow, and ERP systems to improve efficiency, employee experiences, and business agility. Our consultants combine deep platform expertise with business process knowledge to deliver measurable outcomes and long-term value.",

  technologyGroups: [
    {
      title: "Workday Solutions",
      description:
        "End-to-end Workday implementations, upgrades, and optimization across HR, Finance, and Planning.",
      technologies: [
        "Workday HCM",
        "Workday Finance",
        "Workday Payroll",
        "Workday Prism",
        "Workday Extend",
      ],
    },

    {
      title: "Salesforce Ecosystem",
      description:
        "Customer-centric solutions that improve sales, service, marketing, and business growth.",
      technologies: [
        "Sales Cloud",
        "Service Cloud",
        "Marketing Cloud",
        "Experience Cloud",
        "Salesforce Platform",
      ],
    },

    {
      title: "Enterprise Integration",
      description:
        "Connect business-critical systems and automate workflows across the enterprise.",
      technologies: [
        "MuleSoft",
        "Boomi",
        "Azure Integration Services",
        "REST APIs",
        "Event-Driven Integration",
      ],
    },

    {
      title: "ERP & Business Systems",
      description:
        "Modernize and optimize enterprise resource planning platforms for operational excellence.",
      technologies: [
        "SAP",
        "Oracle ERP",
        "Microsoft Dynamics 365",
        "NetSuite",
        "JD Edwards",
      ],
    },

    {
      title: "Workflow Automation",
      description:
        "Streamline operations through low-code automation and intelligent workflow orchestration.",
      technologies: [
        "ServiceNow",
        "Power Platform",
        "Power Automate",
        "UiPath",
        "Automation Anywhere",
      ],
    },

    {
      title: "Governance & Security",
      description:
        "Ensure enterprise platforms remain secure, compliant, and aligned with governance standards.",
      technologies: [
        "IAM",
        "SSO",
        "RBAC",
        "Audit Controls",
        "Compliance Frameworks",
      ],
    },
  ],

  process: [
    {
      title: "Assess",
      description:
        "Evaluate business processes, application landscape, and transformation objectives.",
    },
    {
      title: "Design",
      description:
        "Create scalable platform architectures, integration models, and governance strategies.",
    },
    {
      title: "Implement",
      description:
        "Deploy enterprise platforms using industry best practices and proven methodologies.",
    },
    {
      title: "Integrate",
      description:
        "Connect applications, automate workflows, and enable seamless data movement.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve adoption, performance, automation, and business outcomes.",
    },
  ],

  benefits: [
    {
      title: "Operational Efficiency",
      description:
        "Reduce manual effort and streamline business operations through automation.",
    },
    {
      title: "Connected Enterprise",
      description:
        "Unify systems, people, and data across departments and business functions.",
    },
    {
      title: "Improved User Experience",
      description:
        "Deliver intuitive employee and customer experiences through modern platforms.",
    },
    {
      title: "Accelerated Transformation",
      description:
        "Drive faster business outcomes with scalable enterprise technology solutions.",
    },
  ],

  stats: [
    {
      value: "100+",
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

  heroImage: "/images/services/ai-banner.avif",

  overviewImage: "/images/services/ai.avif",

  accent: "from-fuchsia-500 to-purple-600",

  overview:
    "Artificial Intelligence is transforming how organizations operate, innovate, and compete. We help businesses design, develop, and deploy AI solutions that deliver measurable outcomes—from intelligent automation and predictive analytics to private LLM assistants and generative AI applications. Our focus on security, governance, scalability, and business value ensures AI initiatives move beyond experimentation into production-ready systems.",

  technologyGroups: [
    {
      title: "Generative AI & LLMs",
      description:
        "Enterprise-grade generative AI applications powered by modern large language models.",
      technologies: [
        "OpenAI",
        "Azure OpenAI",
        "Claude",
        "Gemini",
        "Llama",
      ],
    },

    {
      title: "AI Assistants & RAG",
      description:
        "Private AI assistants that securely access enterprise knowledge and business data.",
      technologies: [
        "LangChain",
        "LlamaIndex",
        "RAG",
        "Semantic Search",
        "Prompt Engineering",
      ],
    },

    {
      title: "Vector Databases",
      description:
        "Scalable knowledge retrieval systems optimized for AI-powered search and recommendations.",
      technologies: [
        "Pinecone",
        "Weaviate",
        "ChromaDB",
        "FAISS",
        "Qdrant",
      ],
    },

    {
      title: "Machine Learning & Predictive Analytics",
      description:
        "Build predictive models that uncover insights, forecast outcomes, and drive smarter decisions.",
      technologies: [
        "Python",
        "Scikit-Learn",
        "TensorFlow",
        "PyTorch",
        "XGBoost",
      ],
    },

    {
      title: "MLOps & Model Lifecycle",
      description:
        "Production-ready machine learning pipelines with monitoring, governance, and continuous improvement.",
      technologies: [
        "MLflow",
        "Kubeflow",
        "Docker",
        "Kubernetes",
        "Azure ML",
      ],
    },

    {
      title: "Intelligent Automation",
      description:
        "Automate repetitive processes using AI, workflows, and intelligent decision-making systems.",
      technologies: [
        "AI Agents",
        "Workflow Automation",
        "Document Intelligence",
        "OCR",
        "Process Mining",
      ],
    },
  ],

  process: [
    {
      title: "Discover",
      description:
        "Identify high-impact AI opportunities, business objectives, and measurable success criteria.",
    },
    {
      title: "Prepare",
      description:
        "Assess data readiness, establish governance controls, and build secure AI foundations.",
    },
    {
      title: "Build",
      description:
        "Develop machine learning models, AI assistants, and intelligent automation solutions.",
    },
    {
      title: "Deploy",
      description:
        "Launch production-ready AI systems with monitoring, guardrails, and evaluation frameworks.",
    },
    {
      title: "Optimize",
      description:
        "Continuously improve model performance, user adoption, and business outcomes.",
    },
  ],

  benefits: [
    {
      title: "Intelligent Automation",
      description:
        "Reduce manual effort and increase productivity through AI-driven workflows.",
    },
    {
      title: "Faster Decision Making",
      description:
        "Leverage predictive insights and real-time intelligence to improve business outcomes.",
    },
    {
      title: "Enterprise-Ready AI",
      description:
        "Deploy secure, scalable, and governed AI systems with confidence.",
    },
    {
      title: "Knowledge Acceleration",
      description:
        "Enable teams to access information instantly through AI-powered assistants.",
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
      label: "Operational Cost Reduction",
    },
  ],
}
];
