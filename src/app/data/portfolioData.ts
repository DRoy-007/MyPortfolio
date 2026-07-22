

// NAVIGATION 
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

// HERO 
export const HERO = {
  name: "Debarpan Roy",
  firstName: "DEBARPAN",
  lastName: "ROY",
  roles: [
    "CSE Student @ NiT",
    "C Programmer",
    "DSA Enthusiast",
    "Web Developer",
    "Terminal Wizard",
  ],
  description:
    "A passionate second-year CSE student at Narula Institute of Technology, building terminal-based dark fantasy games, exploring DSA, and crafting experiences where code meets creativity.",
  github: "https://github.com/DRoy-007",
  stats: [
    { label: "Public Repos", value: "10+" },
    { label: "GitHub", value: "DRoy-007" },
    { label: "Major", value: "CSE" },
  ],
};

// ABOUT
export const ABOUT = {
  intro: [
    "Hey! I'm Debarpan Roy — a second-year CSE student at Narula Institute of Technology, Kolkata. Originally from Kirnahar, Birbhum, I'm driven by an obsession with programming, designing softwares and researching about AI.",
    "My journey started with C, grew into DSA through Striver's A2Z, GfG POTD, and now stretches into web development. When not debugging, I just stand up stretch out, refresh my mind and backing boom, bugs clear out.",
  ],
  quickFacts: [
    { label: "Hometown", value: "Kirnahar, Birbhum" },
    { label: "GitHub", value: "DRoy-007" },
    { label: "Institute", value: "Narula Institute of Technology" },
    { label: "Branch", value: "CSE (2nd Year)" },
  ],
  interests: [
    "Terminal Projects",
    "AI & ML",
    "Competitive DSA",
    "Infra Development",
    "Geopolitics",
    "Riding"
  ],
};

// SKILLS
export const TECH_SKILLS = [
  { name: "C Programming", level: 85, color: "linear-gradient(90deg, #c0392b, #e74c3c)" },
  { name: "HTML / CSS", level:65, color: "linear-gradient(90deg, #e67e22, #f39c12)" },
  { name: "Java (Basics)", level: 45, color: "linear-gradient(90deg, #6c3483, #9b59b6)" },
  { name: "Python", level: 25, color: "linear-gradient(90deg, #606c38, #8ab031)" },
  { name: "DSA & Algorithms", level: 35, color: "linear-gradient(90deg, #1a5276, #2980b9)" },
  { name: "Terminal / Bash", level: 60, color: "linear-gradient(90deg, #1e8449, #2ecc71)" },
] as const;

export const TOOLS_AND_TECH = [
  { name: "C", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "C++", category: "Language" },
  { name: "HTML", category: "Web" },
  { name: "CSS", category: "Web" },
  { name: "JavaScript", category: "Web" },
  { name: "Git", category: "Tool" },
  { name: "GitHub", category: "Tool" },
  { name: "VS Code", category: "Tool" },
  { name: "WSL / Ubuntu", category: "System" },
  { name: "GCC / MinGW", category: "System" },
  { name: "DSA (TUF & GfG)", category: "CS" },
] as const;

export const DEV_SETUP = [
  { key: "CPU", val: "AMD Ryzen 5 5625U" },
  { key: "RAM", val: "16 GB" },
  { key: "Storage", val: "512 GB SSD" },
  { key: "GPU", val: "AMD Radeon" },
  { key: "C/C++ Env", val: "Ubuntu WSL" },
] as const;

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Language: { bg: "bg-[#c0392b]/10", text: "text-[#e74c3c]", border: "border-[#c0392b]/30" },
  Web: { bg: "bg-[#e67e22]/10", text: "text-[#f39c12]", border: "border-[#e67e22]/30" },
  Tool: { bg: "bg-[#2980b9]/10", text: "text-[#5dade2]", border: "border-[#2980b9]/30" },
  System: { bg: "bg-[#1e8449]/10", text: "text-[#2ecc71]", border: "border-[#1e8449]/30" },
  CS: { bg: "bg-[#6c3483]/10", text: "text-[#9b59b6]", border: "border-[#6c3483]/30" },
};

// PROJECTS
export const FEATURED_PROJECT = {
  title: "PDFVerify",
  subtitle: "E-signature validation tool",
  description:
    "A web application that validates electronic signatures on documents, ensuring authenticity and compliance. Built with modern web technologies for secure e-document handling.",
  features: [
    "Upload and verify digital signatures",
    "Support for multiple e-sign formats",
    "Real-time validation feedback",
    "Secure backend verification",
    "User-friendly UI with progress tracking",
  ],
  tags: ["React", "Node.js", "TypeScript", "E-signature", "Security"],
  href: "https://github.com/DRoy-007/PDFVerify",
  liveHref: "https://pdfverify.vercel.app",
};

export const OTHER_PROJECTS = [
  {
    title: "MyPortfolio",
    desc: "A website developed with the help of vibe-coding and vibe-debugging with manual descriptions",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    status: "Live" as const,
    href: "https://github.com/DRoy-007/MyPortfolio",
  },
  {
    title: "Stone Paper Scissor",
    desc: "Terminal game with ASCII art, color-coded output, RNG, and file I/O score tracking.",
    tags: ["C", "Terminal", "MIT"],
    status: "Public" as const,
    href: "https://github.com/DRoy-007/Stone-Paper-Scissor_Game_in_C",
  },
  {
    title: "CLIBanking",
    desc: "Full-featured CLI banking app in Java with OOP design, user management and transactions.",
    tags: ["Java", "OOP", "CLI"],
    status: "Public" as const,
    href: "https://github.com/DRoy-007/CLIBanking",
  },
  {
    title: "Hangman Game in C",
    desc: "An advanced terminal-based Hangman with a dark \"cursed ritual\" theme, built entirely in C",
    tags: ["C", "Terminal", "Cross-platform"],
    status: "Public" as const,
    href: "https://github.com/DRoy-007/Hangman_Game_in_C",
  },
  {
    title: "mindmate",
    desc: "AI chatbot web app frontend deployed live on Vercel, crafted through vibe coding.",
    tags: ["HTML", "CSS", "JS"],
    status: "Live" as const,
    href: "https://mindmate-swart.vercel.app",
  },
  {
    title: "AlgoForge",
    desc: "Comprehensive C++ repo for algorithm implementations and competitive programming.",
    tags: ["C++", "DSA", "Algorithms"],
    status: "Public" as const,
    href: "https://github.com/DRoy-007/AlgoForge",
  },
  {
    title: "CodingC",
    desc: "DSA practice in pure C following Striver's A2Z Sheet — no library shortcuts.",
    tags: ["C", "DSA", "A2Z"],
    status: "Active" as const,
    href: "https://github.com/DRoy-007/CodingC",
  },
] as const;

// EDUCATION
export const EDUCATION_TIMELINE = [
  {
    year: "2025 - Present",
    title: "B.Tech — Computer Science & Engineering",
    institution: "Narula Institute of Technology",
    location: "Kolkata, WB",
    desc: "Pursuing B.Tech CSE. Building strong foundations in programming, DSA, Artificial Intelligence and Machine Learning and real-world project development.",
    color: "#c0392b",
    badge: "Ongoing",
    badgeColor: "bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/20",
  },
  {
    year: "2023 - 2025",
    title: "WBCHSE (PCMB) - Higher Secondary Education",
    institution: "Kirnahar Shib Chandra High School",
    location: "Birbhum, WB",
    desc: "Physics, Chemistry, Mathematics & Biology. Scored 404/500. Appeared in JEE Main 2025 (82.11 percentile) and NEET UG 2025.",
    color: "#6c3483",
    badge: "Completed",
    badgeColor: "bg-[#6c3483]/10 text-[#9b59b6] border-[#6c3483]/20",
  },
  {
    year: "2011 - 2023",
    title: "ICSE - Secondary Education",
    institution: "St. Joseph's Convent School",
    location: "Birbhum, WB",
    desc: "Completed Class X with strong academic foundations with a score of 481/500. Built the discipline and focus that powers my engineering journey today.",
    color: "#e67e22",
    badge: "Completed",
    badgeColor: "bg-[#e67e22]/10 text-[#f39c12] border-[#e67e22]/20",
  },
] as const;

export const ENTRANCE_EXAMS = [
  { name: "JEE Main 2025", score: "82.11 Percentile", detail: "AIR: 2,65,274", color: "#c0392b" },
  { name: "NEET UG 2025", score: "395 / 720", detail: "AIR: 2,20,053", color: "#6c3483" },
] as const;

export const CURRENTLY_LEARNING = [
  "DSA via TUF A2Z Striver Sheet & GfG POTD",
  "C Programming (Advanced)",
  "Web Development Basics",
  "Java (Intermediate)",
] as const;

// CONTACT / SOCIAL
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@DRoy-007",
    href: "https://github.com/DRoy-007",
    type: "github" as const,
    color: "#e8e8f0",
    bg: "bg-[#e8e8f0]/5",
    border: "border-[#e8e8f0]/15",
    hover: "hover:border-[#e8e8f0]/40",
  },
  {
    label: "LinkedIn",
    handle: "debarpan-roy",
    href: "https://linkedin.com/in/debarpan-roy",
    type: "linkedin" as const,
    color: "#0a66c2",
    bg: "bg-[#0a66c2]/10",
    border: "border-[#0a66c2]/20",
    hover: "hover:border-[#0a66c2]/50",
  },
  {
    label: "Instagram",
    handle: "@droy_007.in",
    href: "https://instagram.com/droy_007.in",
    type: "instagram" as const,
    color: "#e1306c",
    bg: "bg-[#e1306c]/10",
    border: "border-[#e1306c]/20",
    hover: "hover:border-[#e1306c]/50",
  },
  {
    label: "X (Twitter)",
    handle: "@DebarpanRoy07",
    href: "https://x.com/DebarpanRoy07",
    type: "twitter" as const,
    color: "#e8e8f0",
    bg: "bg-[#e8e8f0]/5",
    border: "border-[#e8e8f0]/15",
    hover: "hover:border-[#e8e8f0]/40",
  },
  {
    label: "Email",
    handle: "roydebarpan07@gmail.com",
    href: "mailto:roydebarpan07@gmail.com",
    type: "email" as const,
    color: "#c0392b",
    bg: "bg-[#c0392b]/10",
    border: "border-[#c0392b]/20",
    hover: "hover:border-[#c0392b]/50",
  },
] as const;
