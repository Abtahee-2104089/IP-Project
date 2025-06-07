import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Award, Clock } from 'lucide-react';
import EventCard from '../components/EventCard';
import ClubCard from '../components/ClubCard';
import { useEvents, useClubs } from '../hooks/useData';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types';

export default function HomePage() {
  const { user } = useAuth();
  const { events, loading: eventsLoading } = useEvents();
  const { clubs, loading: clubsLoading } = useClubs();
    // Filter upcoming events (assuming events have a date field)
  const upcomingEvents = events
    .filter((event: Event) => new Date(event.date) > new Date())
    .slice(0, 4);
  
  const featuredClubs = clubs.slice(0, 4);
  const loading = eventsLoading || clubsLoading;

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
              </p>              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/events"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 px-6 text-base bg-white text-blue-600 hover:bg-gray-100"
                >
                  Browse Events
                </Link>
                <Link 
                  to="/clubs"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 px-6 text-base border border-white bg-transparent hover:bg-white/10 text-white"
                >
                  Explore Clubs
                </Link>
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
      </section>      {/* Stats section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {loading ? '...' : events.length}
              </h3>
              <p className="text-gray-600">Total Events</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {loading ? '...' : clubs.length}
              </h3>
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
              <h3 className="text-3xl font-bold text-gray-800">
                {loading ? '...' : upcomingEvents.length}
              </h3>
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
            {loading ? (
              // Loading placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
          
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No upcoming events scheduled.</p>              {user?.role === 'club-admin' && (
                <Link 
                  to="/admin/events/create"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-10 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 mt-4"
                >
                  Create an Event
                </Link>
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
            {loading ? (
              // Loading placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              featuredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're looking to join a club, attend events, or showcase your talents, CUET ClubSphere has something for everyone.
          </p>          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 px-6 text-base bg-white text-gray-900 hover:bg-gray-100"
            >
              Create an Account
            </Link>
            <Link 
              to="/clubs/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-12 px-6 text-base border border-white bg-transparent hover:bg-white/10 text-white"
            >
              Register Your Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}