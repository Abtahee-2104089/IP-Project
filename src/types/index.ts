export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'club-admin' | 'admin';
  department?: string;
  year?: number;
  avatar?: string;
  registeredEvents?: string[];
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  category: string;
  foundedYear: number;
  members: number;
  adminId: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  events?: string[];
  announcements?: Announcement[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'past';
  registeredUsers: string[];
  maxParticipants?: number;
  feedback?: Feedback[];
}

export interface Announcement {
  id: string;
  clubId: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface Feedback {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  date: string;
}