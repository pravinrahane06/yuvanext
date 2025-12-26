// API Types for PHP Backend Integration

export interface Activity {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  objectives: string[];
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API Endpoints Configuration (for PHP backend)
export const API_ENDPOINTS = {
  activities: '/api/activities',
  activity: (id: string) => `/api/activities/${id}`,
  programs: '/api/programs',
  objectives: '/api/objectives',
  contact: '/api/contact',
  volunteer: '/api/volunteer',
  newsletter: '/api/newsletter',
  donate: '/api/donate',
} as const;
