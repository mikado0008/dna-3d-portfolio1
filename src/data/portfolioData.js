/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * You can easily customize all your personal information, links, and content here.
 * Placeholders are marked with comments and default values.
 */

export const portfolioData = {
  // ----------------------------------------------------------------------------
  // SECTION 1: HERO / IDENTITY
  // ----------------------------------------------------------------------------
  hero: {
    // [MY NAME]
    name: "ARPUTHARAJ B",
    // [MY PROFESSIONAL TITLE]
    title: "BSc Chemistry Student | Learning Python | Vibe Coder & Web Developer",
    tagline: "Bridging Chemistry & Computing through Modern Web Development & Python",
    // [MY PHOTO] - Can be a local path or URL.
    photoUrl: "/profile.jpg",
    introText: "I am a BSc Chemistry student exploring the world of technology. I am currently learning Python, building web projects through vibe coding, and continuously developing my skills in programming and modern web development.",
    ctaText: "Explore My Journey",
    statusBadge: "Learning, Building & Growing 🚀",
    location: "Thiruvarur, Tamil Nadu, India | Open to Remote & Global Opportunities",
    genomeSequence: "CHEM-PYTH-VIBE-CODE-NODE-WEB3-ALGO-NEXT"
  },

  // ----------------------------------------------------------------------------
  // SECTION 2: ABOUT ME
  // ----------------------------------------------------------------------------
  about: {
    heading: "About Me",
    subheading: "Where Chemical Sciences Meet Modern Web & Software Development",
    bioParagraphs: [
      "I am a BSc Chemistry student with a deep fascination for the intersection of natural sciences and modern computing. Driven by curiosity, I stepped into the world of programming to explore how digital technology and software can solve real-world problems.",
      "Currently mastering Python and modern web development architectures, I love vibe coding and transforming creative ideas into interactive, high-performance web applications and digital tools.",
      "My goal is to bridge molecular science, computational algorithms, and full-stack software development to build intuitive products and contribute to innovative global tech initiatives."
    ],
    highlights: [
      { label: "Focus Areas", value: "Chemistry, Python Programming, Web Dev" },
      { label: "Methodology", value: "Vibe Coding, Rapid Prototyping, Clean Code" },
      { label: "Core Passion", value: "Bridging Science & Software Innovation" },
      { label: "Work Ethic", value: "Curious, Self-Driven, Continuous Learner" }
    ],
    stats: [
      { number: "100+", label: "Hours of Python & Code Practice" },
      { number: "5+", label: "Web & Interactive Apps Built" },
      { number: "100%", label: "Curiosity & Passion for Tech" },
      { number: "24/7", label: "Creative Vibe Coding Mindset" }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 3: CURRENT STUDIES
  // ----------------------------------------------------------------------------
  studies: {
    heading: "Current Studies",
    subheading: "Academic Foundation at Bishop Heber College & Tech Exploration",
    // [CURRENT DEGREE]
    degree: "Bachelor of Science in Chemistry",
    // [UNIVERSITY / INSTITUTION]
    institution: "Bishop Heber College (Autonomous), Tiruchirappalli",
    period: "2025 — 2028",
    specialization: "Web Development, Intersection of Chemistry & Bioinformatics",
    gpa: "Undergraduate Batch (2025 — 2028)",
    overview: "Pursuing Chemistry while actively expanding into web development, Python programming, and computational bioinformatics interfaces.",
    coreModules: [
      {
        title: "Web Development & 3D Interactive UI",
        desc: "Building modern responsive websites, Three.js 3D graphics, JavaScript, and Tailwind CSS interfaces.",
        icon: "globe"
      },
      {
        title: "Python Programming & Scripting",
        desc: "Algorithmic logic, data manipulation, automated scripting, and computer science fundamentals.",
        icon: "code"
      },
      {
        title: "Chemical Sciences & Molecular Bonding",
        desc: "Organic, Inorganic & Physical chemistry principles, chemical reactions, and molecular structures.",
        icon: "atom"
      },
      {
        title: "Chemistry & Bioinformatics Convergence",
        desc: "Cheminformatics, molecular visualization, biological data concepts, and digital scientific workflows.",
        icon: "dna"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 4: SKILLS & ENCODED CAPABILITIES
  // ----------------------------------------------------------------------------
  skills: {
    heading: "Encoded Capabilities",
    subheading: "Technical Skills & Development Tools Encoded in the Double Helix",
    categories: [
      {
        name: "Technical & Programming (Learning Track)",
        color: "#00f0ff",
        items: [
          { name: "Python Programming", level: 80, tag: "Learning" },
          { name: "Web Development (HTML5 / CSS3 / JS)", level: 85, tag: "Learning" },
          { name: "Vibe Coding & AI Prompt Engineering", level: 90, tag: "Learning" },
          { name: "Tailwind CSS & Responsive UI", level: 82, tag: "Learning" },
          { name: "Chemistry Informatics & Data Basics", level: 75, tag: "Learning" },
          { name: "Git & Version Control Fundamentals", level: 78, tag: "Learning" },
          { name: "Frontend 3D & Interactive Graphics", level: 80, tag: "Learning" },
          { name: "Algorithms & Problem Solving", level: 76, tag: "Learning" }
        ]
      },
      {
        name: "Tools, Software & AI Frameworks",
        color: "#a855f7",
        items: [
          { name: "VS Code Studio", level: 92, tag: "Active" },
          { name: "Jupyter Notebook", level: 85, tag: "Active" },
          { name: "GitHub & Version Control", level: 86, tag: "Active" },
          { name: "Cursor / AI Coding IDEs", level: 90, tag: "Active" },
          { name: "Terminal & Command Line", level: 82, tag: "Active" },
          { name: "ChemDraw / Molecular Visualization Tools", level: 84, tag: "Active" },
          { name: "Chrome DevTools & Web Inspector", level: 88, tag: "Active" },
          { name: "Vite & Modern Build Tools", level: 85, tag: "Active" }
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 5: PROJECTS
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "dna-3d-portfolio",
      title: "3D DNA Helix Personal Portfolio Experience",
      category: "Web 3D & Graphics",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "Designed and built an interactive 3D WebGL website featuring a procedural DNA double helix with smooth scroll-driven camera choreography, holographic glassmorphism UI, and particle effects.",
      technologies: ["Three.js", "JavaScript", "GSAP", "Tailwind CSS", "Vite"],
      metrics: "60 FPS Real-Time WebGL",
      demoUrl: "https://github.com/Arputharaj-B",
      githubUrl: "https://github.com/Arputharaj-B",
      featured: true
    },
    {
      id: "python-scripting-lab",
      title: "Python Science & Automation Scripts",
      category: "Python / Programming",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description: "A growing collection of Python scripts exploring algorithmic problem solving, basic scientific calculations, file parsing, and chemistry data exploration.",
      technologies: ["Python 3", "Algorithms", "VS Code", "Data Logic"],
      metrics: "Core Logic Building",
      demoUrl: "https://github.com/Arputharaj-B",
      githubUrl: "https://github.com/Arputharaj-B",
      featured: true
    },
    {
      id: "vibe-coding-ui",
      title: "VibeLab: Interactive Web UI Prototypes",
      category: "Frontend / Vibe Coding",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      description: "Experimental modern web interfaces crafted through vibe coding, featuring futuristic dark modes, glassmorphic HUD elements, and responsive designs.",
      technologies: ["HTML5", "CSS3 / Tailwind", "JavaScript", "AI Prompting"],
      metrics: "Modern Responsive UI",
      demoUrl: "https://github.com/Arputharaj-B",
      githubUrl: "https://github.com/Arputharaj-B",
      featured: true
    },
    {
      id: "chembio-visualizer",
      title: "ChemBio Molecular 3D Viewer (Upcoming)",
      category: "Chemistry & Bio Tech",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
      description: "An in-development interactive web project aimed at visualizing chemical bonding, 3D molecular structures, and biological compounds directly in the web browser.",
      technologies: ["Three.js", "Python", "Cheminformatics", "Web Dev"],
      metrics: "In Active Research & Dev",
      demoUrl: "https://github.com/Arputharaj-B",
      githubUrl: "https://github.com/Arputharaj-B",
      featured: false
    }
  ],

  // ----------------------------------------------------------------------------
  // SECTION 6: CERTIFICATIONS & ACHIEVEMENTS
  // ----------------------------------------------------------------------------
  certifications: [
    {
      title: "Python Essential Training & Programming Foundations",
      issuer: "LinkedIn Learning",
      date: "2024 — 2025",
      skills: "Python Syntax, Data Structures, Functions, Object-Oriented Logic",
      credentialUrl: "https://www.linkedin.com/learning",
      badgeIcon: "award",
      status: "Verified on LinkedIn Learning"
    },
    {
      title: "Programming Foundations: Fundamentals & Algorithms",
      issuer: "LinkedIn Learning",
      date: "2024 — 2025",
      skills: "Algorithmic Thinking, Control Flow, Problem Solving, Clean Code",
      credentialUrl: "https://www.linkedin.com/learning",
      badgeIcon: "shield-check",
      status: "Verified on LinkedIn Learning"
    },
    {
      title: "Web Development Foundations & Modern Web UI",
      issuer: "LinkedIn Learning",
      date: "2024 — 2025",
      skills: "HTML5, CSS3, JavaScript Fundamentals, Responsive Design",
      credentialUrl: "https://www.linkedin.com/learning",
      badgeIcon: "cpu",
      status: "Verified on LinkedIn Learning"
    },
    {
      title: "Exploring Technology & Data in Science",
      issuer: "LinkedIn Learning",
      date: "2024 — 2025",
      skills: "Data Exploration, Scientific Mindset, Digital Tools",
      credentialUrl: "https://www.linkedin.com/learning",
      badgeIcon: "atom",
      status: "Verified on LinkedIn Learning"
    }
  ],

  achievements: [
    {
      title: "BSc Chemistry Scholar — Bishop Heber College",
      desc: "Actively pursuing undergraduate chemistry education at Bishop Heber College (Autonomous), Tiruchirappalli (2025–2028 batch).",
      year: "2025 — Present"
    },
    {
      title: "Self-Driven Tech & Vibe Coding Journey",
      desc: "Independently learning Python programming, 3D web development, and modern development workflows through continuous practice.",
      year: "2024 — Present"
    },
    {
      title: "Continuous Professional Upskilling",
      desc: "Actively completing verified professional learning paths and certifications on LinkedIn Learning.",
      year: "2024 — Present"
    }
  ],

  // ----------------------------------------------------------------------------
  // SECTION 7: COMPLETED LEARNING JOURNEY
  // ----------------------------------------------------------------------------
  journey: [
    {
      phase: "Phase 01",
      year: "2024",
      title: "Spark of Curiosity & Science Foundations",
      desc: "Deepened core understanding of chemistry, molecular principles, and began exploring how computer programming can empower modern science.",
      milestone: "Decided to learn coding and explore computer science."
    },
    {
      phase: "Phase 02",
      year: "2024 — 2025",
      title: "Python Foundations & LinkedIn Learning",
      desc: "Completed foundational courses on LinkedIn Learning covering Python syntax, algorithmic logic, control flows, and data basics.",
      milestone: "Wrote first Python scripts for problem solving and data handling."
    },
    {
      phase: "Phase 03",
      year: "2025",
      title: "Web Development & Vibe Coding Mastery",
      desc: "Dived into modern web development with HTML5, CSS3, Tailwind CSS, JavaScript, and rapid prototyping through vibe coding.",
      milestone: "Built interactive web UI prototypes and creative digital experiments."
    },
    {
      phase: "Phase 04",
      year: "2025 — 2028",
      title: "BSc Chemistry Degree & Interdisciplinary Tech",
      desc: "Currently studying at Bishop Heber College (Autonomous) while actively bridging chemical sciences, bioinformatics, and full-stack software development.",
      milestone: "Created 3D Interactive DNA Portfolio Website."
    }
  ],

  // ----------------------------------------------------------------------------
  // SECTION 8: FUTURE GOALS & VISION
  // ----------------------------------------------------------------------------
  vision: {
    heading: "My Future Vision",
    quote: "Building the future through the convergence of science, programming and modern web technology.",
    pillars: [
      {
        title: "Full-Stack & Python Mastery",
        desc: "Becoming a proficient software engineer capable of building robust web applications, automated tools, and scalable software solutions.",
        icon: "sparkles"
      },
      {
        title: "Chemistry & Tech Synergy",
        desc: "Developing computational tools and 3D web visualizations that make scientific data intuitive, accessible, and interactive for researchers.",
        icon: "atom"
      },
      {
        title: "Continuous Learning & Global Impact",
        desc: "Collaborating on open-source initiatives, building impactful tech products, and exploring worldwide opportunities in tech.",
        icon: "globe"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // SECTION 9: CONTACT & CONNECT
  // ----------------------------------------------------------------------------
  contact: {
    heading: "Let's Connect",
    subheading: "Open for Collaborations, Learning Opportunities & Tech Inquiries",
    // [EMAIL]
    email: "raj.mikado.08@gmail.com",
    // [LINKEDIN URL]
    linkedin: "https://www.linkedin.com/in/arputharaj-b-5831783ba",
    // [GITHUB URL]
    github: "https://github.com/Arputharaj-B",
    // Other links
    twitter: "https://github.com/Arputharaj-B",
    portfolioUrl: "http://localhost:5173",
    location: "Thiruvarur / Tiruchirappalli, Tamil Nadu, India",
    closingMessage: "Building the future through science, programming and modern web technology."
  }
};
