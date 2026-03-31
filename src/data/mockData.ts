// Mock Data Store for YUVANEXT FOUNDATION
// All data structured for future backend/API integration

export interface Activity {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  subKeywords: string;
  status: "published" | "draft";
  author: string;
  category: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "donor" | "volunteer";
  totalDonations: number;
  joinedAt: string;
  status: "active" | "inactive";
}

export interface Donation {
  id: string;
  userId: string;
  donorName: string;
  amount: number;
  date: string;
  method: "UPI" | "Bank Transfer" | "Cash" | "Online";
  collectedBy: string;
  status: "completed" | "pending" | "failed";
}

export interface VolunteerRecord {
  userId: string;
  donationsCollected: number;
  campaignsActive: number;
  status: "active" | "inactive";
}

// --- Initial Mock Data ---

export const initialActivities: Activity[] = [
  {
    id: "act-1",
    title: "Youth Empowerment Workshop in Pune",
    slug: "youth-empowerment-workshop-pune",
    image: "/placeholder.svg",
    description: "A transformative workshop empowering youth with leadership and life skills.",
    content: "The Youth Empowerment Workshop brought together over 200 young people from across Pune district. Sessions covered leadership development, communication skills, and career guidance. Expert speakers shared insights on building a meaningful career while giving back to the community.",
    metaTitle: "Youth Empowerment Workshop Pune | YUVANEXT FOUNDATION",
    metaDescription: "Join our youth empowerment workshops in Pune. Building future leaders through skill development and mentorship.",
    keywords: "youth empowerment, workshop, Pune, leadership",
    subKeywords: "skill development, mentorship, career guidance",
    status: "published",
    author: "Rahul Deshmukh",
    category: "Workshop",
    createdAt: "2025-12-15",
  },
  {
    id: "act-2",
    title: "Rural Education Drive - Satara District",
    slug: "rural-education-drive-satara",
    image: "/placeholder.svg",
    description: "Bringing quality education resources to rural schools in Satara.",
    content: "Our team distributed over 500 book kits and educational materials to 10 schools across Satara district. The drive also included teacher training sessions and digital literacy workshops for students.",
    metaTitle: "Rural Education Drive Satara | YUVANEXT FOUNDATION",
    metaDescription: "Supporting rural education in Satara with books, digital literacy, and teacher training programs.",
    keywords: "rural education, Satara, books, digital literacy",
    subKeywords: "teacher training, school support",
    status: "published",
    author: "Anjali Kulkarni",
    category: "Education",
    createdAt: "2025-11-20",
  },
  {
    id: "act-3",
    title: "Mental Health Awareness Camp",
    slug: "mental-health-awareness-camp",
    image: "/placeholder.svg",
    description: "Free mental health counseling and awareness sessions for communities.",
    content: "In partnership with local hospitals, we organized a mental health awareness camp providing free consultations and workshops on stress management, mindfulness, and emotional well-being.",
    metaTitle: "Mental Health Awareness Camp | YUVANEXT FOUNDATION",
    metaDescription: "Free mental health awareness camps providing counseling and wellness workshops.",
    keywords: "mental health, awareness, counseling, wellness",
    subKeywords: "stress management, mindfulness",
    status: "published",
    author: "Dr. Sanjay Patil",
    category: "Health",
    createdAt: "2025-10-05",
  },
  {
    id: "act-4",
    title: "Women's Skill Development Program",
    slug: "womens-skill-development-program",
    image: "/placeholder.svg",
    description: "Empowering women through vocational training and entrepreneurship.",
    content: "Draft article about upcoming women's skill development program launching in March 2026.",
    metaTitle: "Women Skill Development | YUVANEXT FOUNDATION",
    metaDescription: "Empowering women through skill development and vocational training programs.",
    keywords: "women empowerment, skill development, vocational training",
    subKeywords: "entrepreneurship, self-help groups",
    status: "draft",
    author: "Anjali Kulkarni",
    category: "Women Empowerment",
    createdAt: "2026-01-10",
  },
];

export const initialUsers: User[] = [
  { id: "usr-1", name: "Priya Sharma", email: "priya@example.com", phone: "9876543210", role: "donor", totalDonations: 15000, joinedAt: "2025-06-15", status: "active" },
  { id: "usr-2", name: "Vikram Mehta", email: "vikram@example.com", phone: "9876543211", role: "volunteer", totalDonations: 5000, joinedAt: "2025-07-20", status: "active" },
  { id: "usr-3", name: "Sneha Joshi", email: "sneha@example.com", phone: "9876543212", role: "donor", totalDonations: 25000, joinedAt: "2025-05-10", status: "active" },
  { id: "usr-4", name: "Rajesh Kulkarni", email: "rajesh@example.com", phone: "9876543213", role: "volunteer", totalDonations: 8000, joinedAt: "2025-08-01", status: "active" },
  { id: "usr-5", name: "Manisha Patil", email: "manisha@example.com", phone: "9876543214", role: "donor", totalDonations: 3000, joinedAt: "2025-09-12", status: "inactive" },
  { id: "usr-6", name: "Arun Desai", email: "arun@example.com", phone: "9876543215", role: "volunteer", totalDonations: 12000, joinedAt: "2025-04-05", status: "active" },
];

export const initialDonations: Donation[] = [
  { id: "don-1", userId: "usr-1", donorName: "Priya Sharma", amount: 5000, date: "2025-12-01", method: "UPI", collectedBy: "Direct", status: "completed" },
  { id: "don-2", userId: "usr-1", donorName: "Priya Sharma", amount: 10000, date: "2026-01-15", method: "Bank Transfer", collectedBy: "Direct", status: "completed" },
  { id: "don-3", userId: "usr-3", donorName: "Sneha Joshi", amount: 25000, date: "2025-11-20", method: "Online", collectedBy: "Direct", status: "completed" },
  { id: "don-4", userId: "usr-5", donorName: "Manisha Patil", amount: 3000, date: "2025-10-10", method: "Cash", collectedBy: "Vikram Mehta", status: "completed" },
  { id: "don-5", userId: "usr-2", donorName: "Vikram Mehta", amount: 5000, date: "2026-02-01", method: "UPI", collectedBy: "Direct", status: "completed" },
  { id: "don-6", userId: "usr-4", donorName: "Rajesh Kulkarni", amount: 8000, date: "2026-03-10", method: "Online", collectedBy: "Direct", status: "pending" },
  { id: "don-7", userId: "usr-6", donorName: "Arun Desai", amount: 12000, date: "2025-12-25", method: "Bank Transfer", collectedBy: "Vikram Mehta", status: "completed" },
];

export const initialVolunteerRecords: VolunteerRecord[] = [
  { userId: "usr-2", donationsCollected: 15000, campaignsActive: 3, status: "active" },
  { userId: "usr-4", donationsCollected: 8000, campaignsActive: 2, status: "active" },
  { userId: "usr-6", donationsCollected: 22000, campaignsActive: 4, status: "active" },
];

// Admin credentials (frontend only - NOT secure, for demo purposes)
export const ADMIN_CREDENTIALS = { username: "admin", password: "yuvanext2026" };

// Helper to generate slug from title
export const generateSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
