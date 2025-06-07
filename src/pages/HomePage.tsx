import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Award, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import EventCard from '../components/EventCard';
import ClubCard from '../components/ClubCard';
import { events, getEventsByStatus } from '../data/events';
import { clubs } from '../data/clubs';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const upcomingEvents = getEventsByStatus('upcoming').slice(0, 4);
  const featuredClubs = clubs.slice(0, 4);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                CUET ClubSphere - Your Campus Community Hub
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Discover events, join clubs, and connect with the vibrant CUET community all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link to="/events">Browse Events</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/clubs">Explore Clubs</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3769135/pexels-photo-3769135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="CUET students at an event" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{events.length}</h3>
              <p className="text-gray-600">Total Events</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{clubs.length}</h3>
              <p className="text-gray-600">Active Clubs</p>
            </div>
            <div className="p-6 bg-teal-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Award className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">100+</h3>
              <p className="text-gray-600">Members</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{upcomingEvents.length}</h3>
              <p className="text-gray-600">Upcoming Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all events
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No upcoming events scheduled.</p>
              {user?.role === 'club-admin' && (
                <Button 
                  className="mt-4" 
                  asChild
                >
                  <Link to="/admin/events/create">Create an Event</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured clubs section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Featured Clubs</h2>
            <Link 
              to="/clubs" 
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              Browse all clubs
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're looking to join a club, attend events, or showcase your talents, CUET ClubSphere has something for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/clubs/register">Register Your Club</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}