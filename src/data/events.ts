import { Event } from '../types';
import { format, addDays, subDays } from 'date-fns';

const today = new Date();
const tomorrow = addDays(today, 1);
const yesterday = subDays(today, 1);
const nextWeek = addDays(today, 7);
const lastWeek = subDays(today, 7);

export const events: Event[] = [
  {
    id: "e1",
    title: "Robotics Workshop",
    description: "Learn the basics of robotics and build your own robot in this hands-on workshop. Materials will be provided.",
    clubId: "c1",
    date: format(tomorrow, 'yyyy-MM-dd'),
    startTime: "10:00",
    endTime: "16:00",
    location: "Engineering Building, Room 201",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Workshop",
    status: "upcoming",
    registeredUsers: ["u1", "u2"],
    maxParticipants: 30
  },
  {
    id: "e2",
    title: "Poetry Slam",
    description: "Express yourself at our poetry slam event. Perform your original pieces or recite your favorites.",
    clubId: "c2",
    date: format(today, 'yyyy-MM-dd'),
    startTime: "18:00",
    endTime: "21:00",
    location: "Arts Building, Auditorium",
    image: "https://images.pexels.com/photos/3380743/pexels-photo-3380743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Performance",
    status: "ongoing",
    registeredUsers: ["u1", "u3", "u4"],
    maxParticipants: 50
  },
  {
    id: "e3",
    title: "Inter-Department Cricket Tournament",
    description: "Annual cricket tournament between university departments. Form your department team and participate!",
    clubId: "c3",
    date: format(lastWeek, 'yyyy-MM-dd'),
    startTime: "09:00",
    endTime: "17:00",
    location: "University Sports Ground",
    image: "https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Sports",
    status: "past",
    registeredUsers: ["u2", "u5", "u6", "u7", "u8"],
    feedback: [
      {
        id: "f1",
        userId: "u2",
        eventId: "e3",
        rating: 5,
        comment: "Great organization and fair play. Looking forward to next year!",
        date: format(subDays(today, 5), 'yyyy-MM-dd')
      },
      {
        id: "f2",
        userId: "u5",
        eventId: "e3",
        rating: 4,
        comment: "Well organized but could use better refreshment options.",
        date: format(subDays(today, 6), 'yyyy-MM-dd')
      }
    ]
  },
  {
    id: "e4",
    title: "Campus Photography Contest",
    description: "Showcase your photography skills in our 'Campus Life' themed contest. Submit your entries by the deadline.",
    clubId: "c4",
    date: format(nextWeek, 'yyyy-MM-dd'),
    startTime: "14:00",
    endTime: "17:00",
    location: "Media Center",
    image: "https://images.pexels.com/photos/3774088/pexels-photo-3774088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Contest",
    status: "upcoming",
    registeredUsers: ["u1", "u9"]
  },
  {
    id: "e5",
    title: "AI and Robotics Seminar",
    description: "Learn about the latest advancements in AI and robotics from industry experts and academic researchers.",
    clubId: "c1",
    date: format(addDays(nextWeek, 3), 'yyyy-MM-dd'),
    startTime: "13:00",
    endTime: "16:00",
    location: "Computer Science Building, Seminar Hall",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Seminar",
    status: "upcoming",
    registeredUsers: []
  },
  {
    id: "e6",
    title: "Book Club Meeting",
    description: "Join us for a discussion on 'The Alchemist' by Paulo Coelho. New members are welcome!",
    clubId: "c2",
    date: format(yesterday, 'yyyy-MM-dd'),
    startTime: "16:00",
    endTime: "18:00",
    location: "Library, Discussion Room",
    image: "https://images.pexels.com/photos/711009/pexels-photo-711009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Discussion",
    status: "past",
    registeredUsers: ["u3", "u4", "u10"],
    feedback: [
      {
        id: "f3",
        userId: "u3",
        eventId: "e6",
        rating: 5,
        comment: "Fantastic discussion! Great insights from everyone.",
        date: format(today, 'yyyy-MM-dd')
      }
    ]
  },
  {
    id: "e7",
    title: "Yoga and Meditation Session",
    description: "Relax and rejuvenate with our yoga and meditation session. All levels welcome.",
    clubId: "c3",
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    startTime: "07:00",
    endTime: "08:30",
    location: "University Garden",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Wellness",
    status: "upcoming",
    registeredUsers: ["u5", "u7"],
    maxParticipants: 20
  },
  {
    id: "e8",
    title: "Photography Workshop: Basics of Composition",
    description: "Learn the fundamentals of photographic composition from professional photographers.",
    clubId: "c4",
    date: format(addDays(today, 5), 'yyyy-MM-dd'),
    startTime: "15:00",
    endTime: "17:00",
    location: "Media Center, Studio 2",
    image: "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Workshop",
    status: "upcoming",
    registeredUsers: ["u1", "u9"],
    maxParticipants: 25
  }
];

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getEventsByClub = (clubId: string): Event[] => {
  return events.filter(event => event.clubId === clubId);
};

export const getEventsByStatus = (status: 'upcoming' | 'ongoing' | 'past'): Event[] => {
  return events.filter(event => event.status === status);
};

export const getEventsByCategory = (category: string): Event[] => {
  return events.filter(event => event.category === category);
};