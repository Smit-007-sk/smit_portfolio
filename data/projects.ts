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
    slug: "millionaire-digital",
    id: "01",
    title: "MILLIONAIRE DIGITAL (MDZ)",
    subtitle: "3D Animated Website for Creative Media & Production",
    category: "WEBSITES",
    shortDesc: "A fully immersive 3D animated website created for Millionaire Digital (MDZ), a creative company specializing in photography, video shoots, event organization, and digital media services. The project focuses on premium presentation, interactive visuals, and a strong portfolio-driven user experience.",
    image: "/projects/millionaire-digital-real.jpg",
    year: "2026",
    role: "DESIGN + DEVELOPMENT",
    liveUrl: "https://millionairedigital.example.com",
    technologies: ["NEXT.JS", "THREE.JS", "WEBGL", "GSAP", "TAILWIND CSS", "TYPESCRIPT"],
    overview: "A fully immersive 3D animated website created for Millionaire Digital (MDZ), a creative company specializing in photography, video shoots, event organization, and digital media services. The project focuses on premium presentation, interactive visuals, and a strong portfolio-driven user experience.",
    challenge: "Implementing interactive 3D visual elements and real-time animations while maintaining smooth framerates, fast initial load speeds, and intuitive navigation across all desktop and mobile devices.",
    approach: "Designed and developed a premium, modern interface with interactive 3D visual presentation, smooth animated interactions, visual storytelling, and responsive web principles.",
    features: [
      "Designed and developed a premium, modern interface to showcase creative services and portfolio content.",
      "Implemented immersive 3D visual presentation and smooth animated interactions to create an engaging browsing experience.",
      "Structured the website around clear service presentation, visual storytelling, and easy navigation.",
      "Built the experience with responsive web principles so the presentation can adapt across different screen sizes."
    ],
    nextSlug: "nexora-crm",
    nextTitle: "NEXORA CRM",
    theme: "dark",
  },
  {
    slug: "nexora-crm",
    id: "02",
    title: "NEXORA CRM",
    subtitle: "Lead & Customer Management System",
    category: "WEB APPS",
    shortDesc: "A custom CRM platform designed to manage the complete customer and lead lifecycle. Nexora helps teams capture leads and move them through business stages including Sales, Resume Team, Marketing, and Placement.",
    image: "/projects/nexora-crm-real.jpg",
    year: "2026",
    role: "FULL-STACK DEVELOPMENT",
    liveUrl: "https://nexoracrm.example.com",
    technologies: ["REACT", "NEXT.JS", "NODE.JS", "POSTGRESQL", "TAILWIND CSS", "REST API"],
    overview: "A custom CRM platform designed to manage the complete customer and lead lifecycle. Nexora helps teams capture leads and move them through business stages including Sales, Resume Team, Marketing, and Placement.",
    challenge: "Organizing complex multi-department business pipelines and lead qualification stages into a unified, responsive, and secure dashboard for seamless team collaboration.",
    approach: "Developed a centralized system for capturing, organizing, and tracking leads with dedicated business-stage workflows covering Sales, Resume Team, Marketing, and Placement operations.",
    features: [
      "Developed a centralized system for capturing, organizing, and tracking leads and customer information.",
      "Implemented business-stage workflows covering Sales, Resume Team, Marketing, and Placement operations.",
      "Created management functionality that helps teams monitor customer progress and streamline internal workflows.",
      "Organized the application around a scalable structure suitable for day-to-day business and team collaboration."
    ],
    nextSlug: "emperor-media",
    nextTitle: "EMPEROR MEDIA SOLUTION",
    theme: "dark",
  },
  {
    slug: "emperor-media",
    id: "03",
    title: "EMPEROR MEDIA SOLUTION",
    subtitle: "Marketing Website & Custom Admin Panel",
    category: "WEBSITES",
    shortDesc: "A modern marketing website developed for Emperor Smart Solution together with a custom admin panel for managing website content and designs. The platform includes 30+ customizable templates and is structured to support different client requirements.",
    image: "/projects/emperor-media.jpg",
    year: "2026",
    role: "DESIGN + FULL-STACK",
    liveUrl: "https://emperormedia.example.com",
    technologies: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "NODE.JS", "REST API"],
    overview: "A modern marketing website developed for Emperor Smart Solution together with a custom admin panel for managing website content and designs. The platform includes 30+ customizable templates and is structured to support different client requirements.",
    challenge: "Building a dynamic CMS and admin architecture capable of switching, editing, and previewing 30+ distinct templates smoothly without layout discrepancies.",
    approach: "Developed a premium marketing website focused on clear service presentation paired with a full-featured admin management portal for complete content and template customization.",
    features: [
      "Developed a premium marketing website focused on clear service presentation and modern visual design.",
      "Built an admin panel to create, edit, delete, switch, and manage website content and templates.",
      "Integrated 30+ customizable templates to support multiple website layouts and client-specific requirements.",
      "Designed the management architecture to simplify content updates and support scalable website administration."
    ],
    nextSlug: "dental-website-uk",
    nextTitle: "DENTAL PRACTICE UK",
    theme: "dark",
  },
  {
    slug: "dental-website-uk",
    id: "04",
    title: "DENTAL PRACTICE UK",
    subtitle: "Modern Responsive Healthcare & Dental Practice Website",
    category: "WEBSITES",
    shortDesc: "A modern responsive dental website developed with PHP for a UK-based dental practice. The website provides a professional online presence with clear information about dental services, practice details, and straightforward navigation for patients.",
    image: "/projects/dental-uk-real.jpg",
    year: "2026",
    role: "WEB DEVELOPMENT",
    liveUrl: "https://dentalpracticeuk.example.com",
    technologies: ["PHP", "JAVASCRIPT", "HTML5 / CSS3", "RESPONSIVE UI", "MYSQL"],
    overview: "A modern responsive dental website developed with PHP for a UK-based dental practice. The website provides a professional online presence with clear information about dental services, practice details, and straightforward navigation for patients.",
    challenge: "Delivering a clean, trustworthy patient-oriented experience with easy appointment inquiries, clear service breakdown, and accessible navigation across all devices.",
    approach: "Developed a clean and professional healthcare interface using PHP, structured service and practice information for straightforward patient navigation, and optimized for mobile responsiveness.",
    features: [
      "Developed a clean and professional interface suitable for a healthcare-focused business website.",
      "Implemented responsive layouts to provide a consistent experience across desktop and mobile devices.",
      "Structured service and practice information for clear presentation and easy patient navigation.",
      "Used PHP as the core development technology for the website implementation."
    ],
    nextSlug: "spotify-clone",
    nextTitle: "SPOTIFY CLONE",
    theme: "light",
  },
  {
    slug: "spotify-clone",
    id: "05",
    title: "SPOTIFY CLONE",
    subtitle: "Responsive Music Streaming Interface & Audio Player",
    category: "WEB APPS",
    shortDesc: "Responsive Spotify-inspired music streaming interface with music playback controls including play, pause, next, previous, and progress-bar functionality.",
    image: "/projects/spotify-clone-real.jpg",
    year: "2026 – PRESENT",
    role: "FRONTEND DEVELOPMENT",
    liveUrl: "https://spotifyclone.example.com",
    technologies: ["HTML5", "CSS3", "JAVASCRIPT", "AUDIO API", "RESPONSIVE DESIGN"],
    overview: "Responsive Spotify-inspired music streaming interface featuring audio playback controls, interactive progress bars, track switching, and an intuitive music dashboard.",
    challenge: "Creating an intuitive, audio-synchronized progress scrubber and responsive playlist layout with vanilla web technologies.",
    approach: "Built a responsive music interface using HTML, CSS, and JavaScript, implementing core playback controls and progress interaction.",
    features: [
      "Built a responsive music interface using HTML, CSS, and JavaScript.",
      "Implemented core playback controls (play, pause, next, previous).",
      "Interactive audio progress bar with seek functionality.",
      "Modern Spotify-inspired dark layout with playlist navigation."
    ],
    nextSlug: "ecommerce-platform",
    nextTitle: "E-COMMERCE PLATFORM",
    theme: "dark",
  },
  {
    slug: "ecommerce-platform",
    id: "06",
    title: "E-COMMERCE PLATFORM",
    subtitle: "Functional E-Commerce Storefront & Shopping Cart",
    category: "E-COMMERCE",
    shortDesc: "Functional e-commerce platform with product listing, shopping cart, checkout, user authentication, and order management.",
    image: "/projects/ecommerce-platform-real.jpg",
    year: "2025",
    role: "FULL-STACK DEVELOPMENT",
    liveUrl: "https://ecommerceplatform.example.com",
    technologies: ["REACT", "NEXT.JS", "TAILWIND CSS", "NODE.JS", "AUTHENTICATION"],
    overview: "A functional e-commerce platform designed for modern online retail, featuring dynamic product catalogs, persistent shopping cart, user authentication, and order-management.",
    challenge: "Building a seamless shopping workflow from product discovery and cart addition to authenticated checkout and order confirmation.",
    approach: "Developed product browsing and cart functionality, paired with robust user authentication and order-management workflows.",
    features: [
      "Developed product browsing, filtering, and responsive cart functionality.",
      "Implemented user authentication and secure login/signup flows.",
      "Comprehensive order-management and checkout processes.",
      "High-performance mobile-first responsive design."
    ],
    nextSlug: "millionaire-digital",
    nextTitle: "MILLIONAIRE DIGITAL (MDZ)",
    theme: "light",
  },
];
