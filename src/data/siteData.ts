// Static site data - will be replaced by API calls in production

import { Activity, Program, Objective } from "@/types/api";

export const focusAreas = [
  {
    id: "education",
    title: "Education & Skill Development",
    description: "Empowering youth through quality education and vocational training programs.",
    icon: "GraduationCap",
    color: "primary",
  },
  {
    id: "health",
    title: "Health & Well-being",
    description: "Promoting physical and mental health awareness in communities.",
    icon: "Heart",
    color: "accent",
  },
  {
    id: "environment",
    title: "Environment & Sustainability",
    description: "Building a greener future through eco-friendly initiatives.",
    icon: "Leaf",
    color: "accent",
  },
  {
    id: "women",
    title: "Women Empowerment",
    description: "Supporting women's rights, education, and economic independence.",
    icon: "Users",
    color: "primary",
  },
  {
    id: "community",
    title: "Community Development",
    description: "Strengthening communities through collaborative social programs.",
    icon: "Building",
    color: "accent",
  },
];

export const objectives: Objective[] = [
  {
    id: "1",
    title: "Youth Leadership",
    description: "Develop young leaders who can drive positive change in their communities through mentorship and training programs.",
    icon: "Award",
    color: "primary",
  },
  {
    id: "2",
    title: "Digital Literacy",
    description: "Bridge the digital divide by providing technology education and access to underserved communities.",
    icon: "Monitor",
    color: "accent",
  },
  {
    id: "3",
    title: "Rural Development",
    description: "Transform rural areas through sustainable development initiatives and infrastructure improvements.",
    icon: "Home",
    color: "primary",
  },
  {
    id: "4",
    title: "Healthcare Access",
    description: "Ensure quality healthcare reaches every corner of society through mobile clinics and awareness camps.",
    icon: "Stethoscope",
    color: "accent",
  },
  {
    id: "5",
    title: "Environmental Conservation",
    description: "Protect and preserve natural resources through tree plantation and waste management drives.",
    icon: "TreePine",
    color: "accent",
  },
  {
    id: "6",
    title: "Economic Empowerment",
    description: "Create livelihood opportunities through skill training and entrepreneurship development.",
    icon: "Briefcase",
    color: "primary",
  },
  {
    id: "7",
    title: "Social Justice",
    description: "Advocate for equal rights and opportunities for marginalized sections of society.",
    icon: "Scale",
    color: "primary",
  },
];

export const programs: Program[] = [
  {
    id: "shiksha",
    title: "Shiksha Abhiyan",
    description: "A comprehensive education initiative providing free tutoring, scholarships, and educational resources to underprivileged children.",
    icon: "BookOpen",
    objectives: [
      "Free after-school tutoring for 500+ students",
      "Scholarship programs for meritorious students",
      "Distribution of educational materials",
      "Digital learning centers in rural areas",
    ],
  },
  {
    id: "swasthya",
    title: "Swasthya Sathi",
    description: "Health awareness and medical assistance program focusing on preventive healthcare and wellness.",
    icon: "HeartPulse",
    objectives: [
      "Monthly health camps in villages",
      "Mental health awareness workshops",
      "Blood donation drives",
      "Free health check-ups for elderly",
    ],
  },
  {
    id: "prakriti",
    title: "Prakriti Rakshak",
    description: "Environmental conservation initiative promoting sustainable practices and green living.",
    icon: "Sprout",
    objectives: [
      "Plant 10,000 trees annually",
      "Plastic-free community campaigns",
      "Water conservation projects",
      "Renewable energy awareness",
    ],
  },
  {
    id: "shakti",
    title: "Nari Shakti",
    description: "Women empowerment program providing skills training, financial literacy, and support for women entrepreneurs.",
    icon: "Sparkles",
    objectives: [
      "Self-help group formation",
      "Vocational training for 200+ women",
      "Legal awareness workshops",
      "Micro-finance assistance",
    ],
  },
  {
    id: "kaushal",
    title: "Yuva Kaushal",
    description: "Youth skill development program preparing young individuals for employment and entrepreneurship.",
    icon: "Rocket",
    objectives: [
      "IT and computer training",
      "Soft skills development",
      "Career counseling sessions",
      "Industry connect programs",
    ],
  },
];

export const activities: Activity[] = [
  {
    id: "1",
    title: "Annual Tree Plantation Drive 2024",
    excerpt: "Join us in our mission to plant 5000 trees across the district. Together, we can create a greener tomorrow.",
    content: "Our annual tree plantation drive was a massive success with participation from over 500 volunteers. We planted 5000 saplings across 10 villages, focusing on fruit-bearing and native species to support local biodiversity.",
    image: "/placeholder.svg",
    date: "2024-12-15",
    category: "Environment",
  },
  {
    id: "2",
    title: "Free Health Camp in Rural Areas",
    excerpt: "Providing essential healthcare services to underserved communities through our mobile health unit.",
    content: "The free health camp conducted in partnership with local hospitals provided medical consultations, free medicines, and health screenings to over 300 villagers. Special focus was given to maternal health and child nutrition.",
    image: "/placeholder.svg",
    date: "2024-12-10",
    category: "Health",
  },
  {
    id: "3",
    title: "Digital Literacy Workshop for Youth",
    excerpt: "Empowering young minds with essential computer skills and internet safety knowledge.",
    content: "A week-long digital literacy workshop trained 100 young students in basic computer operations, internet usage, and online safety. Participants received certificates upon completion.",
    image: "/placeholder.svg",
    date: "2024-12-05",
    category: "Education",
  },
  {
    id: "4",
    title: "Women's Self-Help Group Launch",
    excerpt: "Inaugurating new self-help groups to empower women through financial independence.",
    content: "Five new self-help groups were formed, bringing together 50 women from different backgrounds. The groups will receive training in handicrafts, financial management, and marketing their products.",
    image: "/placeholder.svg",
    date: "2024-11-28",
    category: "Women Empowerment",
  },
  {
    id: "5",
    title: "Blood Donation Camp",
    excerpt: "A successful blood donation camp that collected 150 units for local hospitals.",
    content: "In collaboration with the district blood bank, we organized a blood donation camp that saw enthusiastic participation from 175 donors. The collected blood will help save hundreds of lives.",
    image: "/placeholder.svg",
    date: "2024-11-20",
    category: "Health",
  },
  {
    id: "6",
    title: "Career Counseling Session for Students",
    excerpt: "Guiding students towards making informed career choices through expert counseling.",
    content: "Expert career counselors conducted sessions for 200+ students from local schools and colleges, providing guidance on various career paths, competitive exams, and skill development opportunities.",
    image: "/placeholder.svg",
    date: "2024-11-15",
    category: "Education",
  },
];

export const coreValues = [
  {
    title: "Transparency",
    description: "Complete accountability in all our operations and finances.",
    icon: "Eye",
  },
  {
    title: "Inclusivity",
    description: "Embracing diversity and ensuring no one is left behind.",
    icon: "Users",
  },
  {
    title: "Sustainability",
    description: "Creating lasting impact through sustainable practices.",
    icon: "Recycle",
  },
  {
    title: "Collaboration",
    description: "Working together with communities for collective growth.",
    icon: "Handshake",
  },
];

export const contactInfo = {
  address: "123 Foundation Lane, New Delhi, India - 110001",
  email: "info@yuvanextfoundation.org",
  phone: "+91 98765 43210",
  alternatePhone: "+91 98765 43211",
  workingHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
};

export const socialLinks = {
  facebook: "https://facebook.com/yuvanextfoundation",
  twitter: "https://twitter.com/yuvanextfdn",
  instagram: "https://instagram.com/yuvanextfoundation",
  linkedin: "https://linkedin.com/company/yuvanext-foundation",
  youtube: "https://youtube.com/@yuvanextfoundation",
};
