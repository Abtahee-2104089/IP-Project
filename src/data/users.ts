import { User } from '../types';

export const users: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@cuet.edu",
    role: "student",
    department: "Computer Science",
    year: 2,
    avatar: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e1", "e2", "e4"]
  },
  {
    id: "u2",
    name: "Samantha Lee",
    email: "samantha@cuet.edu",
    role: "student",
    department: "Electrical Engineering",
    year: 3,
    avatar: "https://images.pexels.com/photos/3746254/pexels-photo-3746254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e1", "e3"]
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "michael@cuet.edu",
    role: "club-admin",
    department: "Mechanical Engineering",
    year: 4,
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e2", "e6"]
  },
  {
    id: "u4",
    name: "Emma Wilson",
    email: "emma@cuet.edu",
    role: "club-admin",
    department: "English Literature",
    year: 3,
    avatar: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e2", "e6"]
  },
  {
    id: "u5",
    name: "James Miller",
    email: "james@cuet.edu",
    role: "club-admin",
    department: "Physical Education",
    year: 4,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e3", "e7"]
  },
  {
    id: "u6",
    name: "Olivia Garcia",
    email: "olivia@cuet.edu",
    role: "club-admin",
    department: "Fine Arts",
    year: 2,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e3"]
  },
  {
    id: "u7",
    name: "David Kim",
    email: "david@cuet.edu",
    role: "student",
    department: "Chemistry",
    year: 1,
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e3", "e7"]
  },
  {
    id: "u8",
    name: "Sophie Taylor",
    email: "sophie@cuet.edu",
    role: "student",
    department: "Physics",
    year: 2,
    avatar: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e3"]
  },
  {
    id: "u9",
    name: "Ethan Brown",
    email: "ethan@cuet.edu",
    role: "student",
    department: "Architecture",
    year: 3,
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e4", "e8"]
  },
  {
    id: "u10",
    name: "Ava Martinez",
    email: "ava@cuet.edu",
    role: "admin",
    department: "Administration",
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registeredEvents: ["e6"]
  }
];

export const getCurrentUser = (): User => {
  // For static data, we'll return a default logged-in user
  return users[0];
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByRole = (role: 'student' | 'club-admin' | 'admin'): User[] => {
  return users.filter(user => user.role === role);
};

export const getUsersByEvent = (eventId: string): User[] => {
  return users.filter(user => user.registeredEvents?.includes(eventId));
};