export interface IndustryData {
  slug: string;

  title: string;

  subtitle: string;

  description: string;

  heroImage: string;

  overviewImage: string;

  accent: string;

  overview: string;

  challenges: string[];

  solutions: string[];

  outcomes: {
    title: string;
    description: string;
  }[];

  stats: {
    value: string;
    label: string;
  }[];
}


export const industries: IndustryData[] = [
  {
    slug: "financial-services",

    title: "Financial Services",

    subtitle: "Secure, Compliant & Scalable Digital Banking",

    description:
      "Modernize financial operations with secure cloud platforms, real-time analytics, AI-driven insights, and enterprise-grade reliability.",

    // heroImage: "/images/industries/finance-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

    overviewImage:"/images/industries/finance.webp",

    accent: "from-orange-500 to-red-500",

    overview:
      "Financial institutions face increasing pressure to innovate while maintaining security, compliance, and customer trust. Skyveon helps organizations modernize banking systems, automate operations, and leverage data-driven decision making.",

    challenges: [
      "Legacy Core Banking Systems",
      "Regulatory Compliance Requirements",
      "Cybersecurity Threats",
      "Customer Experience Expectations",
      "Data Silos Across Platforms",
      "Operational Inefficiencies",
    ],

    solutions: [
      "Cloud-Native Banking Platforms",
      "Real-Time Fraud Detection",
      "Enterprise Data Modernization",
      "AI-Powered Customer Insights",
      "DevSecOps & Compliance Automation",
      "Digital Transformation Programs",
    ],

    outcomes: [
      {
        title: "Enhanced Security",
        description:
          "Strengthen data protection and compliance through modern security architectures.",
      },
      {
        title: "Faster Innovation",
        description:
          "Accelerate delivery of new financial products and digital services.",
      },
      {
        title: "Operational Efficiency",
        description:
          "Reduce manual effort through automation and intelligent workflows.",
      },
    ],

    stats: [
      { value: "99.99%", label: "System Availability" },
      { value: "40%", label: "Reduced Operational Costs" },
      { value: "3x", label: "Faster Service Delivery" },
    ],
  },

  {
    slug: "healthcare",

    title: "Healthcare & Life Sciences",

    subtitle: "Technology That Improves Patient Outcomes",

    description:
      "Enable secure healthcare innovation through compliant platforms, advanced analytics, and intelligent automation.",

    // heroImage: "/images/industries/health-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

        overviewImage:"/images/industries/health.webp",


    accent: "from-orange-500 to-red-500",

    overview:
      "Healthcare organizations require secure, compliant, and scalable technology solutions to improve patient care, streamline operations, and support innovation.",

    challenges: [
      "HIPAA & Regulatory Compliance",
      "Patient Data Security",
      "Disconnected Systems",
      "Legacy Healthcare Platforms",
      "Data Accessibility",
      "Operational Complexity",
    ],

    solutions: [
      "Healthcare Data Platforms",
      "Patient Engagement Solutions",
      "AI-Assisted Diagnostics",
      "Cloud Modernization",
      "Interoperability Solutions",
      "Predictive Analytics",
    ],

    outcomes: [
      {
        title: "Better Patient Experience",
        description:
          "Deliver personalized and seamless healthcare experiences.",
      },
      {
        title: "Improved Data Accessibility",
        description:
          "Enable clinicians with real-time access to critical information.",
      },
      {
        title: "Operational Excellence",
        description:
          "Reduce administrative burden through automation.",
      },
    ],

    stats: [
      { value: "50%", label: "Faster Data Access" },
      { value: "30%", label: "Improved Efficiency" },
      { value: "100%", label: "HIPAA-Focused Solutions" },
    ],
  },

  {
    slug: "retail",

    title: "Retail & eCommerce",

    subtitle: "Personalized Experiences At Scale",

    description:
      "Drive growth with modern commerce platforms, customer insights, and AI-powered personalization.",

    // heroImage: "/images/industries/retail-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

    overviewImage:"/images/industries/retail.webp",


    accent: "from-orange-500 to-red-500",

    overview:
      "Retailers must adapt quickly to changing customer expectations while maintaining operational efficiency. We help businesses deliver exceptional shopping experiences through data, cloud, and AI.",

    challenges: [
      "Customer Retention",
      "Inventory Visibility",
      "Omnichannel Experiences",
      "Demand Forecasting",
      "Peak Traffic Scalability",
      "Data Fragmentation",
    ],

    solutions: [
      "Modern eCommerce Platforms",
      "Customer Analytics",
      "AI-Powered Personalization",
      "Inventory Optimization",
      "Cloud-Native Commerce",
      "Real-Time Business Intelligence",
    ],

    outcomes: [
      {
        title: "Higher Conversion Rates",
        description:
          "Improve customer journeys with personalized experiences.",
      },
      {
        title: "Inventory Optimization",
        description:
          "Reduce stock issues through predictive analytics.",
      },
      {
        title: "Increased Revenue",
        description:
          "Drive growth through data-driven commerce strategies.",
      },
    ],

    stats: [
      { value: "25%", label: "Revenue Growth" },
      { value: "3x", label: "Faster Insights" },
      { value: "99.9%", label: "Platform Reliability" },
    ],
  },

  {
    slug: "manufacturing",

    title: "Manufacturing",

    subtitle: "Smart Manufacturing & Industry 4.0",

    description:
      "Modernize manufacturing operations through connected systems, predictive analytics, and intelligent automation.",

    // heroImage: "/images/industries/manufacturing-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

        overviewImage:"/images/industries/manufacturing.webp",


    accent: "from-orange-500 to-red-500",

    overview:
      "Manufacturers are transforming operations with connected devices, real-time data, and predictive technologies. Skyveon helps organizations unlock efficiency and resilience through digital transformation.",

    challenges: [
      "Legacy Equipment Integration",
      "Downtime & Reliability",
      "Supply Chain Visibility",
      "Operational Inefficiencies",
      "Data Collection Challenges",
      "Predictive Maintenance Needs",
    ],

    solutions: [
      "Industrial IoT Platforms",
      "Predictive Maintenance",
      "Data Engineering Pipelines",
      "Manufacturing Analytics",
      "Cloud Integration",
      "AI-Driven Optimization",
    ],

    outcomes: [
      {
        title: "Reduced Downtime",
        description:
          "Predict failures before they impact production.",
      },
      {
        title: "Improved Productivity",
        description:
          "Optimize manufacturing operations through automation.",
      },
      {
        title: "Greater Visibility",
        description:
          "Monitor production performance in real time.",
      },
    ],

    stats: [
      { value: "35%", label: "Reduced Downtime" },
      { value: "20%", label: "Higher Productivity" },
      { value: "24/7", label: "Operational Visibility" },
    ],
  },

  {
    slug: "public-sector",

    title: "Public Sector",

    subtitle: "Mission-Critical Technology Solutions",

    description:
      "Deliver secure, reliable, and compliant digital services for government agencies and public institutions.",

    // heroImage: "/images/industries/public-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

            overviewImage:"/images/industries/public.webp",

    

    accent: "from-orange-500 to-red-500",

    overview:
      "Government agencies require technology solutions that balance innovation, compliance, security, and public trust. We help modernize services while maintaining mission-critical reliability.",

    challenges: [
      "Legacy Infrastructure",
      "Data Security",
      "Citizen Experience",
      "Regulatory Compliance",
      "Budget Constraints",
      "System Modernization",
    ],

    solutions: [
      "Cloud Transformation",
      "Digital Citizen Services",
      "Data Governance",
      "Security & Compliance",
      "Process Automation",
      "Modern Application Development",
    ],

    outcomes: [
      {
        title: "Improved Public Services",
        description:
          "Deliver faster and more accessible citizen experiences.",
      },
      {
        title: "Enhanced Security",
        description:
          "Protect sensitive information with modern security controls.",
      },
      {
        title: "Operational Efficiency",
        description:
          "Automate workflows and reduce administrative burden.",
      },
    ],

    stats: [
      { value: "99.99%", label: "Service Reliability" },
      { value: "40%", label: "Process Efficiency Gains" },
      { value: "100%", label: "Compliance Focused" },
    ],
  },

  {
    slug: "media-technology",

    title: "Media & Technology",

    subtitle: "Platforms Built For Scale & Innovation",

    description:
      "Accelerate innovation with scalable platforms, cloud-native architectures, and AI-powered solutions.",

    // heroImage: "/images/industries/media-banner.webp",
        heroImage: "/images/services/hero-bg.webp",

            overviewImage:"/images/industries/media.webp",

    accent: "from-orange-500 to-red-500",

    overview:
      "Technology and media companies must continuously innovate while maintaining platform reliability and user experience. Skyveon helps organizations build resilient and scalable digital ecosystems.",

    challenges: [
      "Rapid Product Delivery",
      "Platform Scalability",
      "Content Distribution",
      "User Engagement",
      "Operational Complexity",
      "Data Growth",
    ],

    solutions: [
      "Cloud-Native Platforms",
      "AI-Powered Experiences",
      "Platform Engineering",
      "Data & Analytics",
      "DevOps Automation",
      "Digital Product Development",
    ],

    outcomes: [
      {
        title: "Accelerated Innovation",
        description:
          "Launch products faster with modern engineering practices.",
      },
      {
        title: "Scalable Platforms",
        description:
          "Support millions of users with confidence.",
      },
      {
        title: "Improved User Experience",
        description:
          "Deliver engaging and personalized digital experiences.",
      },
    ],

    stats: [
      { value: "5x", label: "Faster Releases" },
      { value: "99.9%", label: "Platform Uptime" },
      { value: "1M+", label: "Users Supported" },
    ],
  },
];