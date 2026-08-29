export interface Project {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  shortDesc: string;
  image: string;
  year: string;
  role: string;
  liveUrl?: string;
  technologies: string[];
  overview: string;
  challenge: string;
  approach: string;
  features: string[];
  nextSlug: string;
  nextTitle: string;
  theme: "dark" | "light";
}

export const projectsData: Project[] = [
  {
    slug: "emperor-media",
    id: "01",
    title: "EMPEROR MEDIA SOLUTION",
    subtitle: "Digital Platform for Media & Creative Business",
    category: "WEBSITES",
    shortDesc: "A modern digital platform designed to showcase a media and creative business through a bold visual identity, responsive experience, and polished interactions.",
    image: "/projects/emperor-media.jpg",
    year: "",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://emperormedia.example.com",
    technologies: ["NEXT.JS", "TAILWIND CSS", "TYPESCRIPT", "NODE.JS"],
    overview: "Emperor Media Solution required a modern, scalable digital platform to showcase their media services, creative work, and strategic offerings to global partners.",
    challenge: "Combining complex media showcase elements with seamless navigation, ensuring ultra-fast load times across desktop and mobile devices without losing visual impact.",
    approach: "Built using Next.js and Tailwind CSS, utilizing component-based architecture for modular layout sections, custom graphics, and optimized asset delivery.",
    features: [
      "Responsive global network hero showcase",
      "Interactive service capabilities presentation",
      "Streamlined project inquiry user workflow",
      "Clean dark-mode aesthetic with high contrast accents"
    ],
    nextSlug: "taskly",
    nextTitle: "TASKLY APP",
    theme: "dark",
  },
  {
    slug: "taskly",
    id: "02",
    title: "TASKLY APP",
    subtitle: "Productivity & Team Workflow Web Application",
    category: "WEB APPS",
    shortDesc: "A productivity-focused web application designed to help teams organize tasks, track progress, and manage their workflow through a clean and intuitive interface.",
    image: "/projects/taskly.jpg",
    year: "",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://taskly.example.com",
    technologies: ["TYPESCRIPT", "REACT", "NEXT.JS", "TAILWIND CSS", "REST API"],
    overview: "Taskly App was developed to solve team workflow bottlenecks by delivering a fast, clutter-free dashboard focused on daily priority completion and progress tracking.",
    challenge: "Creating an intuitive dashboard interface that visualizes progress metrics, task completion rates, and status updates without cluttering the screen.",
    approach: "Designed a clean widget-based dashboard layout using TypeScript and Tailwind CSS, featuring SVG radial charts, custom metrics widgets, and responsive activity lists.",
    features: [
      "Live task completion & progress dashboard widgets",
      "Visual percentage completion charts",
      "Task categorizations & priority badges",
      "Mobile-friendly dashboard controls"
    ],
    nextSlug: "velora-store",
    nextTitle: "VELORA STORE",
    theme: "dark",
  },
  {
    slug: "velora-store",
    id: "03",
    title: "VELORA STORE",
    subtitle: "E-Commerce Shopping & Fashion Storefront",
    category: "E-COMMERCE",
    shortDesc: "A modern e-commerce experience focused on premium presentation, intuitive product discovery, and a smooth shopping journey across devices.",
    image: "/projects/velora-store.jpg",
    year: "",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://velorastore.example.com",
    technologies: ["NEXT.JS", "TAILWIND CSS", "TYPESCRIPT", "NODE.JS"],
    overview: "Velora Store is an e-commerce platform designed to present modern fashion lookbooks and summer collections through a sleek, editorial digital experience.",
    challenge: "Balancing high-resolution fashion visual imagery with fast page performance, elegant product browsing typography, and frictionless checkout navigation.",
    approach: "Leveraged Next.js Image optimization and server-side rendering for lightning-fast product pages, combined with custom light off-white layout aesthetics.",
    features: [
      "Editorial lookbook hero banners",
      "Responsive fashion collection gallery",
      "Product showcase grid with hover details",
      "Clean off-white minimalist design system"
    ],
    nextSlug: "nexus-analytics",
    nextTitle: "NEXUS ANALYTICS",
    theme: "light",
  },
  {
    slug: "nexus-analytics",
    id: "04",
    title: "NEXUS ANALYTICS",
    subtitle: "Analytics & Interactive Data Visualization Dashboard",
    category: "WEB APPS",
    shortDesc: "An analytics dashboard designed to transform complex business data into clear insights through structured dashboards, metrics, and interactive data visualization.",
    image: "/projects/nexus-analytics.jpg",
    year: "",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://nexusanalytics.example.com",
    technologies: ["NEXT.JS", "TYPESCRIPT", "REACT", "TAILWIND CSS", "CHART.JS"],
    overview: "Nexus Analytics provides businesses with a centralized dashboard to track user growth, revenue funnel metrics, and API latency indicators in real time.",
    challenge: "Rendering large datasets and live chart streams efficiently without impacting UI performance or causing frame drops during rapid data refreshes.",
    approach: "Implemented web workers and optimized canvas charting libraries paired with modular Next.js server actions for ultra-responsive analytics visualization.",
    features: [
      "Real-time revenue & traffic line charts",
      "Customizable metric widgets & KPI cards",
      "Automated CSV & PDF report generation",
      "Role-based permission dashboard access"
    ],
    nextSlug: "pulse-health",
    nextTitle: "PULSE HEALTH",
    theme: "dark",
  },
  {
    slug: "pulse-health",
    id: "05",
    title: "PULSE HEALTH",
    subtitle: "Wellness & Personal Metric Web App Concept",
    category: "WEB APPS",
    shortDesc: "A wellness-focused web application concept exploring how users can track personal activity, wellness metrics, and daily progress through a simple mobile-first experience.",
    image: "/projects/pulse-health.jpg",
    year: "",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://pulsehealth.example.com",
    technologies: ["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND CSS", "WEBRTC"],
    overview: "Pulse Health is a digital wellness web application concept exploring how individuals can track personal activity metrics and monitor daily health milestones.",
    challenge: "Creating a warm, approachable UI concept that prioritizes simple user data visualization and effortless mobile usability.",
    approach: "Crafted a mobile-first web app concept utilizing soft warm gradients, clear typographic hierarchy, and smooth tab switching powered by React and Tailwind CSS.",
    features: [
      "Personal fitness milestone progress cards",
      "Mobile-optimized biometric metric dashboard",
      "Interactive activity tracking user concept"
    ],
    nextSlug: "emperor-media",
    nextTitle: "EMPEROR MEDIA SOLUTION",
    theme: "light",
  },
];
