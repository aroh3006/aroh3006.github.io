// ============================================================
// portfolio.ts — Source of truth for all portfolio content
// ============================================================

export const personal = {
  name: "AROH MAURYA",
  title: "Computer Science (Cyber Security) Undergraduate",
  institution: "Manipal Institute of Technology, Bengaluru",
  email: "aroh3006@gmail.com",
  linkedin: "https://www.linkedin.com/in/arohmaurya/",
  github: "https://github.com/aroh3006",
  resume: "/Aroh Maurya Resume.pdf",
};

export const heroPrimary = [
  "Building secure digital systems",
  "through cybersecurity, software engineering,",
  "and real-world problem solving.",
];

export const heroSecondary = [
  "Passionate about application security,",
  "vulnerability assessment and",
  "ethical hacking.",
];

export const about = {
  summary: `Cybersecurity-focused Computer Science undergraduate specializing in vulnerability assessment, endpoint security, and secure software development. Experienced in security testing, API assessment, and building practical cybersecurity tools.

Beyond technology, I bring strong leadership and communication skills enabling me to collaborate effectively with diverse teams. I am actively seeking opportunities in cybersecurity, risk analysis, and information security where I can contribute to building secure, scalable and compliant systems.`,
};

export const experiences = [
  {
    id: "adlerqa",
    company: "AdlerQA Technologies Pvt. Ltd.",
    role: "Cybersecurity Intern",
    period: "June 2026 – July 2026",
    description:
      "Conducting authorized vulnerability assessments of WardenIQ. Performing API security testing using Burp Suite, and testing authentication, authorization, and session management flows. Reviewing application security against OWASP Top 10 and conducting IDOR testing and vulnerability validation.",
    technologies: [
      "Burp Suite",
      "OWASP Top 10",
      "API Security Testing",
      "Authentication Testing",
      "Authorization Testing",
      "IDOR Testing",
      "Session Management",
    ],
    certificate: "/certificates/Aroh Maurya - AdlerQA Internship Certificate.pdf",
  },
  {
    id: "internloom",
    company: "InternLoom",
    role: "Intern",
    period: "2025",
    description:
      "Grew engagement by over 3× and followers by 40% through a consistent cross-platform content strategy across LinkedIn, Instagram, and YouTube. Led content calendar planning using trend forecasting, hashtag analysis, and AI-assisted copywriting while coordinating the content team to ensure consistent delivery and sustained audience growth.",
    technologies: [],
    certificate: "/certificates/internloom-internship.pdf",
  },
];

export const projects = [
  {
    id: "vigilance",
    name: "VIGILANCE",
    tagline: "Windows Endpoint Intrusion Detection System",
    shortDescription:
      "A real-time endpoint monitoring system with encrypted logging, webcam evidence capture, and Telegram-based alerting.",
    problem:
      "Detecting unauthorized access on Windows endpoints requires a solution that can monitor activity in real time, capture evidence, and alert administrators without relying on cloud infrastructure.",
    approach:
      "Built a lightweight desktop application that continuously monitors endpoint activity, captures webcam frames on trigger events, encrypts all logs for integrity, and pushes instant alerts via the Telegram API — giving security teams immediate, verifiable evidence of intrusions.",
    technologies: ["Python", "Tkinter", "OpenCV", "Cryptography", "Telegram API"],
    features: [
      "Real-time endpoint monitoring",
      "Encrypted log storage for evidence integrity",
      "Webcam evidence capture on intrusion trigger",
      "Instant Telegram alerts to administrator",
      "Native Windows desktop application via Tkinter",
    ],
    challenges:
      "Balancing performance overhead of continuous monitoring with the responsiveness needed for real-time detection required careful threading and resource management within the Python runtime.",
    github: "https://github.com/aroh3006/VigiLance",
    demo: null,
    category: "Security",
  },
  {
    id: "password-auditor",
    name: "PASSWORD SECURITY AUDITOR",
    tagline: "Evaluate, simulate, and report on password security",
    shortDescription:
      "A desktop tool for evaluating password strength, simulating dictionary attacks, and generating security reports.",
    problem:
      "Weak passwords remain the most exploited attack vector. Organizations and individuals need a way to understand how their passwords hold up against real-world attack techniques before attackers find out for them.",
    approach:
      "Developed a Python desktop application that applies multi-factor strength evaluation — entropy analysis, dictionary attack simulation, SHA-256 hashing — and produces structured security reports to communicate findings clearly.",
    technologies: ["Python", "Tkinter"],
    features: [
      "Multi-factor password strength evaluation",
      "Dictionary attack simulation against common wordlists",
      "SHA-256 hashing for secure password representation",
      "Detailed security reporting with recommendations",
    ],
    challenges:
      "Designing the dictionary attack simulation to be realistic enough to be meaningful while staying within ethical boundaries and reasonable runtime required careful scope definition.",
    github: "https://github.com/aroh3006/Password-Auditing-Tool",
    demo: null,
    category: "Security",
  },
  {
    id: "port-scanner",
    name: "PORT SCANNER",
    tagline: "Fast, configurable network reconnaissance tool",
    shortDescription:
      "A desktop-based port scanner with quick scan, full scan, service detection, and report generation.",
    problem:
      "Understanding an organization's exposed attack surface starts with mapping open ports and running services — a foundational step in any authorized security assessment that most tooling makes inaccessible to beginners.",
    approach:
      "Built a Python desktop application wrapping Nmap with a clean Tkinter interface, offering Quick Scan and Full Scan modes, service version detection, and structured report export — making network reconnaissance accessible without sacrificing accuracy.",
    technologies: ["Python", "Tkinter", "Nmap"],
    features: [
      "Quick Scan and Full Scan modes",
      "Service version detection via Nmap integration",
      "Clean desktop interface via Tkinter",
      "Structured report generation for documentation",
    ],
    challenges:
      "Abstracting Nmap's output parsing into a reliable, readable data model required handling edge cases across different OS environments and Nmap versions.",
    github: "https://github.com/aroh3006/Port-Scanner",
    demo: null,
    category: "Security",
  },
];

export const certifications = [
  {
    id: "ceh",
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    abbreviation: "CEH",
    year: "2026",
    credentialId: "", // ← Add your CEH credential ID if available
    image: "/certificates/ceh.pdf",
    description:
      "Industry-recognized certification validating skills in ethical hacking, penetration testing, and cybersecurity defense methodologies across 20 domains.",
  },
  {
    id: "google-cyber",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    abbreviation: "GCC",
    year: "2026",
    credentialId: "", // ← Add your Google credential ID if available
    image: "/certificates/google-cybersecurity.pdf",
    description:
      "Comprehensive program covering foundations of cybersecurity, network security, Linux, SQL, Python for automation, and security information and event management (SIEM).",
  },
  {
    id: "ibm-soc",
    name: "Security Operations Center in Practice",
    issuer: "IBM SkillsBuild",
    abbreviation: "SOC",
    year: "2025",
    credentialId: "",
    image: "/certificates/security-operations-center.pdf",
    description: "Foundational knowledge and practical skills for working in a Security Operations Center.",
  },
  {
    id: "ibm-cloud",
    name: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    abbreviation: "CCF",
    year: "2026",
    credentialId: "",
    image: "/certificates/cloud-computing-fundamentals.pdf",
    description: "Core concepts of cloud computing, deployment models, and architecture.",
  },

  {
    id: "uiuc-ods",
    name: "Ordered Data Structures",
    issuer: "University of Illinois Urbana-Champaign",
    abbreviation: "ODS",
    year: "2024",
    credentialId: "",
    image: "/certificates/ordered-data-structures.pdf",
    description: "Advanced data structures, algorithmic analysis, and implementation.",
  },
  {
    id: "umich-lpt",
    name: "Leading People and Teams",
    issuer: "University of Michigan",
    abbreviation: "LPT",
    year: "2024",
    credentialId: "",
    image: "/certificates/leading-people-and-teams.pdf",
    description: "Essential skills for leading diverse teams and effective communication.",
  },
  {
    id: "mastercard-forage",
    name: "Forage Cybersecurity Job Simulation",
    issuer: "Mastercard",
    abbreviation: "MC",
    year: "2026",
    credentialId: "",
    image: "/certificates/mastercard-forage.pdf",
    description: "Practical simulation of cybersecurity tasks and real-world scenarios.",
  },
];

export const leadership = [
  {
    role: "Member",
    organization: "Placement Committee — MIT Bengaluru",
    period: "2024 – Present",
    description:
      "Active member of the Placement Committee at MIT Bengaluru, facilitating recruitment processes, coordinating with companies, and ensuring a smooth placement experience for students.",
  },
  {
    role: "President",
    organization: "Pop Culture Club (OtakuSpot)",
    period: "2024 – 2025",
    description:
      "Led the Pop Culture Club at MIT Bengaluru — organizing events, managing the team, and growing the community across campus.",
  },
  {
    role: "Vice Captain",
    organization: "Aries — General Championship",
    period: "2024 – 2025",
    description:
      "Served as Vice Captain of Aries in the General Championship. Secured 1st position in the General Championship by contributing to team strategy, coordination, and competitive performance.",
  },
  {
    role: "Founding Team",
    organization: "Google Developer Student Clubs (GDSC)",
    period: "2023",
    description:
      "Part of the founding team that established the GDSC chapter at MIT Bengaluru — building the community infrastructure, organizing the first events, and setting the culture from the ground up.",
  },
  {
    role: "Marketing Team",
    organization: "Falak",
    period: "2023 – 2024",
    description:
      "Drove visibility and engagement for Falak, the cultural fest of MIT Bengaluru, through strategic outreach, event promotion, and content — expanding the organization's reach.",
  },
  {
    role: "Captain",
    organization: "Dr. Virendra Swarup Education Centre",
    period: "2021 – 2022",
    description:
      "Captain of the school basketball team, leading strategy, team development, and competitive performance at the institutional level.",
  },
];

export const skills = {
  Programming: ["Python", "Java", "C", "SQL", "HTML/CSS"],
  Cybersecurity: [
    "VAPT",
    "Burp Suite",
    "OWASP Top 10",
    "API Security",
    "IDOR Testing",
    "Endpoint Security",
    "Cryptography",
    "Network Reconnaissance",
  ],
  Tools: ["Wireshark", "Docker", "Git", "Nmap", "Linux", "Windows", "FastAPI", "OpenCV"],
};

export const education = [
  {
    institution: "Manipal Institute of Technology",
    degree: "B.Tech in Computer Science (Cyber Security)",
    location: "Bengaluru, Karnataka",
    period: "2023–2027",
  },
  {
    institution: "Dr. Virendra Swarup Education Centre",
    degree: "ICSE, PCM with Computer Science",
    location: "Kanpur, Uttar Pradesh",
    period: "2010–2022",
  }
];
