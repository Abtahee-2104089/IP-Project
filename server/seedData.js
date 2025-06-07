import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Club from './models/Club.js';
import Event from './models/Event.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cuet-clubsphere');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Club.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data');    // Seed Users (initially without clubId for club-admins)
    const users = [
      {
        name: "Alex Johnson",
        email: "alex@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Computer Science",
        year: 2,
        avatar: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Samantha Lee",
        email: "samantha@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Electrical Engineering",
        year: 3,
        avatar: "https://images.pexels.com/photos/3746254/pexels-photo-3746254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Michael Chen",
        email: "michael@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student", // Temporarily set as student, will update to club-admin later
        department: "Mechanical Engineering",
        year: 4,
        avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },      {
        name: "Emma Wilson",
        email: "emma@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student", // Temporarily set as student, will update to club-admin later
        department: "English Literature",
        year: 3,
        avatar: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "James Miller",
        email: "james@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student", // Temporarily set as student, will update to club-admin later
        department: "Physical Education",
        year: 4,
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Olivia Garcia",
        email: "olivia@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student", // Temporarily set as student, will update to club-admin later
        department: "Fine Arts",
        year: 2,
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "David Kim",
        email: "david@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Chemistry",
        year: 1,
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Sophie Taylor",
        email: "sophie@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Physics",
        year: 2,
        avatar: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Ethan Brown",
        email: "ethan@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Architecture",
        year: 3,
        avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"      },
      {
        name: "Ava Martinez",
        email: "ava@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "admin",
        department: "Administration",
        avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },      {
        name: "Dr. Sarah Johnson",
        email: "admin@cuet.edu",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        department: "Administration",
        avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      // Additional Club Administrators
      {
        name: "Dr. Rahman Ahmed",
        email: "rahman@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student", // Temporarily set as student, will update to club-admin later
        department: "Computer Science",
        year: 4,
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Maria Rodriguez",
        email: "maria@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Environmental Science",
        year: 3,
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Thomas Anderson",
        email: "thomas@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Business Administration",
        year: 4,
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Lisa Chang",
        email: "lisa@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Music",
        year: 2,
        avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Ahmed Hassan",
        email: "ahmed@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Mathematics",
        year: 3,
        avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Jennifer Lee",
        email: "jennifer@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Drama & Theatre",
        year: 3,
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Carlos Mendez",
        email: "carlos@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Social Work",
        year: 4,
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Priya Sharma",
        email: "priya@cuet.edu",
        password: await bcrypt.hash("password123", 10),
        role: "student",
        department: "Computer Science",
        year: 2,
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully');    // Find club admins
    const michaelChen = createdUsers.find(u => u.email === "michael@cuet.edu");
    const emmaWilson = createdUsers.find(u => u.email === "emma@cuet.edu");
    const jamesMiller = createdUsers.find(u => u.email === "james@cuet.edu");
    const oliviaGarcia = createdUsers.find(u => u.email === "olivia@cuet.edu");
    const rahmanAhmed = createdUsers.find(u => u.email === "rahman@cuet.edu");
    const mariaRodriguez = createdUsers.find(u => u.email === "maria@cuet.edu");
    const thomasAnderson = createdUsers.find(u => u.email === "thomas@cuet.edu");
    const lisaChang = createdUsers.find(u => u.email === "lisa@cuet.edu");
    const ahmedHassan = createdUsers.find(u => u.email === "ahmed@cuet.edu");
    const jenniferLee = createdUsers.find(u => u.email === "jennifer@cuet.edu");
    const carlosMendez = createdUsers.find(u => u.email === "carlos@cuet.edu");
    const priyaSharma = createdUsers.find(u => u.email === "priya@cuet.edu");

    // Seed Clubs
    const clubs = [
      {
        name: "Robotics Club",
        description: "The Robotics Club at CUET is dedicated to fostering innovation and technological advancement through robotics. Members engage in various projects, workshops, and competitions to enhance their skills in robotics, programming, and electronics.",
        logo: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Technology",
        foundedYear: 2015,
        members: 120,
        adminId: michaelChen._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_robotics",
          facebook: "https://facebook.com/cuet.robotics",
          twitter: "https://twitter.com/cuet_robotics",
          website: "https://cuet-robotics.edu"
        },
        announcements: [{
          title: "Robotics Workshop",
          content: "Join us for a hands-on robotics workshop this Saturday. Learn about Arduino programming and build your own robot!",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Literary Society",
        description: "The Literary Society at CUET aims to promote literature, creative writing, and critical thinking. We organize poetry recitations, book discussions, literary competitions, and publish a campus literary magazine.",
        logo: "https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Arts & Culture",
        foundedYear: 2010,
        members: 85,
        adminId: emmaWilson._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_literary",
          facebook: "https://facebook.com/cuet.literary",
          twitter: "https://twitter.com/cuet_literary"
        },
        announcements: [{
          title: "Poetry Slam Night",
          content: "Join us for an evening of spoken word poetry. Open mic for all students!",
          date: new Date(),
          important: false
        }],
        isApproved: true
      },
      {
        name: "Sports Club",
        description: "Promoting physical fitness and sportsmanship among CUET students through various sports activities, tournaments, and fitness programs.",
        logo: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Sports",
        foundedYear: 2008,
        members: 150,
        adminId: jamesMiller._id,
        socialLinks: {
          facebook: "https://facebook.com/cuet.sports",
          instagram: "https://instagram.com/cuet_sports"
        },
        announcements: [{
          title: "Inter-Department Tournament",
          content: "Annual sports tournament registration is now open. Multiple sports categories available!",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Photography Club",
        description: "Capturing moments and developing photography skills through workshops, contests, and exhibitions. Perfect for both beginners and experienced photographers.",
        logo: "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Arts & Culture",
        foundedYear: 2012,
        members: 95,
        adminId: oliviaGarcia._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_photography",
          website: "https://cuet-photography.com"
        },
        announcements: [{
          title: "Campus Photography Contest",          content: "Showcase your photography skills in our 'Campus Life' themed contest. Submit your entries by May 25th!",
          date: new Date(),
          important: false
        }],
        isApproved: true
      },
      {
        name: "Programming Society",
        description: "A community of passionate programmers dedicated to learning, sharing knowledge, and solving complex problems through code. We organize coding competitions, tech talks, and collaborative projects.",
        logo: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Technology",
        foundedYear: 2013,
        members: 180,
        adminId: rahmanAhmed._id,
        socialLinks: {
          github: "https://github.com/cuet-programming",
          instagram: "https://instagram.com/cuet_programming",
          facebook: "https://facebook.com/cuet.programming",
          website: "https://cuet-programming.org"
        },
        announcements: [{
          title: "Hackathon 2024",
          content: "48-hour coding challenge with amazing prizes! Register now for our annual hackathon.",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Environmental Club",
        description: "Promoting environmental awareness and sustainability on campus through workshops, tree planting, clean-up drives, and educational campaigns.",
        logo: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Social",
        foundedYear: 2011,
        members: 95,
        adminId: mariaRodriguez._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_green",
          facebook: "https://facebook.com/cuet.environmental",
          twitter: "https://twitter.com/cuet_green"
        },
        announcements: [{
          title: "Earth Day Celebration",
          content: "Join us for tree planting and environmental awareness activities on Earth Day!",
          date: new Date(),
          important: false
        }],
        isApproved: true
      },
      {
        name: "Business & Entrepreneurship Club",
        description: "Fostering entrepreneurial mindset and business skills among students through workshops, networking events, startup competitions, and mentorship programs.",
        logo: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Professional",
        foundedYear: 2014,
        members: 110,
        adminId: thomasAnderson._id,
        socialLinks: {
          linkedin: "https://linkedin.com/company/cuet-business-club",
          instagram: "https://instagram.com/cuet_business",
          facebook: "https://facebook.com/cuet.business"
        },
        announcements: [{
          title: "Startup Pitch Competition",
          content: "Present your startup ideas to industry experts and win funding opportunities!",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Music Society",
        description: "Bringing together music enthusiasts to explore various genres, organize concerts, and provide performance opportunities for talented musicians on campus.",
        logo: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Arts & Culture",
        foundedYear: 2009,
        members: 140,
        adminId: lisaChang._id,
        socialLinks: {
          spotify: "https://spotify.com/cuet-music",
          instagram: "https://instagram.com/cuet_music",
          youtube: "https://youtube.com/cuet-music",
          facebook: "https://facebook.com/cuet.music"
        },
        announcements: [{
          title: "Annual Music Concert",
          content: "Auditions open for our annual music concert. Showcase your talent!",
          date: new Date(),
          important: false
        }],
        isApproved: true
      },
      {
        name: "Mathematics Club",
        description: "Exploring the beauty of mathematics through problem-solving sessions, math competitions, guest lectures, and collaborative research projects.",
        logo: "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Academic",
        foundedYear: 2007,
        members: 75,
        adminId: ahmedHassan._id,
        socialLinks: {
          facebook: "https://facebook.com/cuet.mathematics",
          instagram: "https://instagram.com/cuet_math"
        },
        announcements: [{
          title: "Math Olympiad Training",
          content: "Intensive training sessions for upcoming mathematics competitions. Join us!",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Drama & Theatre Society",
        description: "Celebrating dramatic arts through stage performances, workshops, script writing, and theatrical productions that bring stories to life.",
        logo: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Arts & Culture",
        foundedYear: 2012,
        members: 85,
        adminId: jenniferLee._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_theatre",
          facebook: "https://facebook.com/cuet.theatre",
          youtube: "https://youtube.com/cuet-theatre"
        },
        announcements: [{
          title: "Auditions for Spring Play",
          content: "Open auditions for our upcoming spring theatrical production. All welcome!",
          date: new Date(),
          important: false
        }],
        isApproved: true
      },
      {
        name: "Community Service Club",
        description: "Making a positive impact in our community through volunteer work, charity drives, educational outreach, and social welfare initiatives.",
        logo: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/6995319/pexels-photo-6995319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Social",
        foundedYear: 2010,
        members: 120,
        adminId: carlosMendez._id,
        socialLinks: {
          instagram: "https://instagram.com/cuet_service",
          facebook: "https://facebook.com/cuet.service"
        },
        announcements: [{
          title: "Food Drive Campaign",
          content: "Help us collect non-perishable food items for local shelters. Drop-off locations available.",
          date: new Date(),
          important: true
        }],
        isApproved: true
      },
      {
        name: "Women in Tech",
        description: "Empowering women in technology through mentorship, skill development workshops, networking events, and promoting diversity in STEM fields.",
        logo: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        coverImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Technology",
        foundedYear: 2016,
        members: 90,
        adminId: priyaSharma._id,
        socialLinks: {
          linkedin: "https://linkedin.com/company/cuet-women-in-tech",
          instagram: "https://instagram.com/cuet_womenintech",
          twitter: "https://twitter.com/cuet_wit",
          facebook: "https://facebook.com/cuet.womenintech"
        },
        announcements: [{
          title: "Tech Leadership Workshop",
          content: "Learn leadership skills in tech industry with successful women entrepreneurs as speakers.",
          date: new Date(),
          important: true
        }],
        isApproved: true
      }
    ];

    const createdClubs = await Club.insertMany(clubs);
    console.log('Clubs seeded successfully');    // Update users with club IDs and roles
    await User.findByIdAndUpdate(michaelChen._id, { 
      clubId: createdClubs[0]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(emmaWilson._id, { 
      clubId: createdClubs[1]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(jamesMiller._id, { 
      clubId: createdClubs[2]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(oliviaGarcia._id, { 
      clubId: createdClubs[3]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(rahmanAhmed._id, { 
      clubId: createdClubs[4]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(mariaRodriguez._id, { 
      clubId: createdClubs[5]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(thomasAnderson._id, { 
      clubId: createdClubs[6]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(lisaChang._id, { 
      clubId: createdClubs[7]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(ahmedHassan._id, { 
      clubId: createdClubs[8]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(jenniferLee._id, { 
      clubId: createdClubs[9]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(carlosMendez._id, { 
      clubId: createdClubs[10]._id,
      role: "club-admin"
    });
    await User.findByIdAndUpdate(priyaSharma._id, { 
      clubId: createdClubs[11]._id,
      role: "club-admin"
    });
    console.log('Updated club admins with club IDs and roles');

    // Seed Events
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const events = [
      {
        title: "Robotics Workshop",
        description: "Learn the basics of robotics and build your own robot in this hands-on workshop. Materials will be provided.",
        clubId: createdClubs[0]._id,
        date: tomorrow,
        startTime: "10:00",
        endTime: "16:00",
        location: "Engineering Building, Room 201",
        image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Workshop",
        status: "upcoming",
        registeredUsers: [createdUsers[0]._id, createdUsers[1]._id],
        maxParticipants: 30
      },
      {
        title: "Poetry Slam",
        description: "Express yourself at our poetry slam event. Perform your original pieces or recite your favorites.",
        clubId: createdClubs[1]._id,
        date: new Date(),
        startTime: "18:00",
        endTime: "21:00",
        location: "Arts Building, Auditorium",
        image: "https://images.pexels.com/photos/3380743/pexels-photo-3380743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Performance",
        status: "ongoing",
        registeredUsers: [createdUsers[0]._id, createdUsers[2]._id, createdUsers[3]._id],
        maxParticipants: 50
      },
      {
        title: "Inter-Department Cricket Tournament",
        description: "Annual cricket tournament between university departments. Form your department team and participate!",
        clubId: createdClubs[2]._id,
        date: lastWeek,
        startTime: "09:00",
        endTime: "17:00",
        location: "University Sports Ground",
        image: "https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Sports",
        status: "past",
        registeredUsers: [createdUsers[1]._id, createdUsers[4]._id, createdUsers[5]._id],
        feedback: [{
          userId: createdUsers[1]._id,
          rating: 5,
          comment: "Great organization and fair play. Looking forward to next year!",
          date: new Date()
        }]
      },
      {
        title: "Campus Photography Contest",
        description: "Showcase your photography skills in our 'Campus Life' themed contest. Submit your entries by the deadline.",
        clubId: createdClubs[3]._id,
        date: nextWeek,
        startTime: "14:00",
        endTime: "17:00",
        location: "Media Center",
        image: "https://images.pexels.com/photos/3774088/pexels-photo-3774088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",        category: "Contest",
        status: "upcoming",
        registeredUsers: [createdUsers[0]._id, createdUsers[8]._id]
      },
      {
        title: "Hackathon 2024",
        description: "48-hour coding challenge to build innovative solutions. Form teams or participate solo. Amazing prizes await!",
        clubId: createdClubs[4]._id, // Programming Society
        date: nextWeek,
        startTime: "09:00",
        endTime: "18:00",
        location: "Computer Science Building",
        image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Competition",
        status: "upcoming",
        registeredUsers: [createdUsers[0]._id, createdUsers[2]._id, createdUsers[10]._id],
        maxParticipants: 100
      },
      {
        title: "Campus Tree Planting Drive",
        description: "Join us in making our campus greener! Help plant trees and learn about environmental conservation.",
        clubId: createdClubs[5]._id, // Environmental Club
        date: tomorrow,
        startTime: "08:00",
        endTime: "12:00",
        location: "Campus Green Area",
        image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Volunteer",
        status: "upcoming",
        registeredUsers: [createdUsers[1]._id, createdUsers[3]._id],
        maxParticipants: 50
      },
      {
        title: "Startup Pitch Competition",
        description: "Present your innovative business ideas to industry experts and win seed funding for your startup.",
        clubId: createdClubs[6]._id, // Business & Entrepreneurship Club
        date: nextWeek,
        startTime: "14:00",
        endTime: "18:00",
        location: "Business Building Auditorium",
        image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Competition",
        status: "upcoming",
        registeredUsers: [createdUsers[4]._id, createdUsers[7]._id],
        maxParticipants: 25
      },
      {
        title: "Concert Under the Stars",
        description: "Outdoor musical evening featuring student performances across various genres. Bring your instruments!",
        clubId: createdClubs[7]._id, // Music Society
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        startTime: "19:00",
        endTime: "22:00",
        location: "Campus Amphitheater",
        image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Performance",
        status: "upcoming",
        registeredUsers: [createdUsers[0]._id, createdUsers[5]._id, createdUsers[8]._id],
        maxParticipants: 200
      },
      {
        title: "Math Olympiad Training Session",
        description: "Intensive problem-solving session preparing for national mathematics competitions. All skill levels welcome.",
        clubId: createdClubs[8]._id, // Mathematics Club
        date: tomorrow,
        startTime: "15:00",
        endTime: "18:00",
        location: "Mathematics Department",
        image: "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Workshop",
        status: "upcoming",
        registeredUsers: [createdUsers[2]._id, createdUsers[6]._id],
        maxParticipants: 30
      },
      {
        title: "Spring Theatre Production",
        description: "Annual spring play auditions and rehearsals. Experience the magic of live theatre!",
        clubId: createdClubs[9]._id, // Drama & Theatre Society
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        startTime: "16:00",
        endTime: "20:00",
        location: "Theatre Hall",
        image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Performance",
        status: "upcoming",
        registeredUsers: [createdUsers[1]._id, createdUsers[4]._id],
        maxParticipants: 40
      },
      {
        title: "Community Food Drive",
        description: "Help collect and distribute food items to local shelters. Make a difference in your community!",
        clubId: createdClubs[10]._id, // Community Service Club
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        startTime: "10:00",
        endTime: "16:00",
        location: "Student Center",
        image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Volunteer",
        status: "upcoming",
        registeredUsers: [createdUsers[3]._id, createdUsers[5]._id, createdUsers[7]._id],
        maxParticipants: 60
      },
      {
        title: "Women in Tech Leadership Workshop",
        description: "Learn from successful women leaders in technology. Network and gain insights into career development.",
        clubId: createdClubs[11]._id, // Women in Tech
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        startTime: "13:00",
        endTime: "17:00",
        location: "Technology Center",
        image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Workshop",
        status: "upcoming",
        registeredUsers: [createdUsers[0]._id, createdUsers[1]._id, createdUsers[9]._id],
        maxParticipants: 35
      }
    ];

    await Event.insertMany(events);
    console.log('Events seeded successfully');

    // Update user registered events
    await User.findByIdAndUpdate(createdUsers[0]._id, { 
      registeredEvents: events.slice(0, 3).map(e => e._id) 
    });
    await User.findByIdAndUpdate(createdUsers[1]._id, { 
      registeredEvents: [events[0]._id, events[2]._id] 
    });    console.log('Database seeded successfully!');
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('📚 STUDENTS:');
    console.log('  Email: alex@cuet.edu, Password: password123');
    console.log('  Email: samantha@cuet.edu, Password: password123');
    console.log('  Email: david@cuet.edu, Password: password123');
    console.log('  Email: sophie@cuet.edu, Password: password123');
    console.log('  Email: ethan@cuet.edu, Password: password123');
    console.log('\n🏛️ CLUB ADMINISTRATORS:');
    console.log('  Email: michael@cuet.edu, Password: password123 (Robotics Club)');
    console.log('  Email: emma@cuet.edu, Password: password123 (Literary Society)');
    console.log('  Email: james@cuet.edu, Password: password123 (Sports Club)');
    console.log('  Email: olivia@cuet.edu, Password: password123 (Photography Club)');
    console.log('  Email: rahman@cuet.edu, Password: password123 (Programming Society)');
    console.log('  Email: maria@cuet.edu, Password: password123 (Environmental Club)');
    console.log('  Email: thomas@cuet.edu, Password: password123 (Business & Entrepreneurship Club)');
    console.log('  Email: lisa@cuet.edu, Password: password123 (Music Society)');
    console.log('  Email: ahmed@cuet.edu, Password: password123 (Mathematics Club)');
    console.log('  Email: jennifer@cuet.edu, Password: password123 (Drama & Theatre Society)');
    console.log('  Email: carlos@cuet.edu, Password: password123 (Community Service Club)');
    console.log('  Email: priya@cuet.edu, Password: password123 (Women in Tech)');
    console.log('\n👑 SYSTEM ADMINISTRATORS:');
    console.log('  Email: ava@cuet.edu, Password: password123');
    console.log('  Email: admin@cuet.edu, Password: admin123');
    console.log('\n=========================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
