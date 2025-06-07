import { Club } from '../types';

export const clubs: Club[] = [
  {
    id: "c1",
    name: "Robotics Club",
    description: "The Robotics Club at CUET is dedicated to fostering innovation and technological advancement through robotics. Members engage in various projects, workshops, and competitions to enhance their skills in robotics, programming, and electronics.",
    logo: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Technology",
    foundedYear: 2015,
    members: 120,
    adminId: "u3",
    socialLinks: {
      instagram: "https://instagram.com/cuet_robotics",
      facebook: "https://facebook.com/cuet.robotics",
      twitter: "https://twitter.com/cuet_robotics",
      website: "https://cuet-robotics.edu"
    },
    events: ["e1", "e5"],
    announcements: [
      {
        id: "a1",
        clubId: "c1",
        title: "Robotics Workshop",
        content: "Join us for a hands-on robotics workshop this Saturday. Learn about Arduino programming and build your own robot!",
        date: "2025-05-10T09:00:00.000Z",
        important: true
      }
    ]
  },
  {
    id: "c2",
    name: "Literary Society",
    description: "The Literary Society at CUET aims to promote literature, creative writing, and critical thinking. We organize poetry recitations, book discussions, literary competitions, and publish a campus literary magazine.",
    logo: "https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Arts & Culture",
    foundedYear: 2010,
    members: 85,
    adminId: "u4",
    socialLinks: {
      instagram: "https://instagram.com/cuet_literary",
      facebook: "https://facebook.com/cuet.literary",
      twitter: "https://twitter.com/cuet_literary"
    },
    events: ["e2", "e6"],
    announcements: [
      {
        id: "a2",
        clubId: "c2",
        title: "Poetry Night",
        content: "Express yourself at our monthly poetry night. All students are welcome to perform their original pieces or recite their favorites.",
        date: "2025-05-15T18:00:00.000Z",
        important: false
      }
    ]
  },
  {
    id: "c3",
    name: "Sports Club",
    description: "The Sports Club at CUET promotes physical fitness, sportsmanship, and team spirit among students. We organize various sports tournaments, training sessions, and represent the university in inter-collegiate competitions.",
    logo: "https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Sports",
    foundedYear: 2008,
    members: 150,
    adminId: "u5",
    socialLinks: {
      instagram: "https://instagram.com/cuet_sports",
      facebook: "https://facebook.com/cuet.sports",
      twitter: "https://twitter.com/cuet_sports"
    },
    events: ["e3", "e7"],
    announcements: [
      {
        id: "a3",
        clubId: "c3",
        title: "Inter-Department Cricket Tournament",
        content: "Registration for the annual inter-department cricket tournament is now open. Form your department team and register by May 20th.",
        date: "2025-05-08T10:00:00.000Z",
        important: true
      }
    ]
  },
  {
    id: "c4",
    name: "Photography Club",
    description: "The Photography Club at CUET is a community of photography enthusiasts who explore the art of visual storytelling. We organize photo walks, workshops, exhibitions, and competitions to nurture creative talent.",
    logo: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage: "https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Arts & Culture",
    foundedYear: 2012,
    members: 95,
    adminId: "u6",
    socialLinks: {
      instagram: "https://instagram.com/cuet_photography",
      facebook: "https://facebook.com/cuet.photography"
    },
    events: ["e4", "e8"],
    announcements: [
      {
        id: "a4",
        clubId: "c4",
        title: "Campus Photography Contest",
        content: "Showcase your photography skills in our 'Campus Life' themed contest. Submit your entries by May 25th. Exciting prizes to be won!",
        date: "2025-05-12T14:00:00.000Z",
        important: false
      }
    ]
  }
];

export const getClubById = (id: string): Club | undefined => {
  return clubs.find(club => club.id === id);
};

export const getClubsByCategory = (category: string): Club[] => {
  return clubs.filter(club => club.category === category);
};