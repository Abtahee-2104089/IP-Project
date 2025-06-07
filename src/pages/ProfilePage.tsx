import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Mail, Book, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
import { events } from '../data/events';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You need to be logged in to view this page.</p>
        <Button onClick={() => navigate('/login')}>
          Sign in
        </Button>
      </div>
    );
  }
  
  // Get registered events
  const registeredEvents = user.registeredEvents
    ? events.filter(event => user.registeredEvents?.includes(event.id))
    : [];
  
  const upcomingEvents = registeredEvents.filter(event => event.status === 'upcoming');
  const pastEvents = registeredEvents.filter(event => event.status === 'past');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        
        <div className="px-6 sm:px-8 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16">
            <Avatar 
              src={user.avatar} 
              name={user.name} 
              size="lg" 
              className="border-4 border-white h-32 w-32 shadow-md"
            />
            
            <div className="pb-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">
                {user.role === 'student' 
                  ? 'Student' 
                  : user.role === 'club-admin' 
                    ? 'Club Administrator'
                    : 'Administrator'
                }
              </p>
            </div>
            
            <div className="sm:ml-auto pb-6">
              <Button 
                variant="outline" 
                onClick={logout}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* User information card */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              {user.department && (
                <div className="flex items-start gap-3">
                  <Book className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-gray-600">{user.department}</p>
                  </div>
                </div>
              )}
              
              {user.year && (
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Year</p>
                    <p className="text-gray-600">{user.year === 1 ? '1st' : user.year === 2 ? '2nd' : user.year === 3 ? '3rd' : `${user.year}th`} Year</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Registered events */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">You haven't registered for any upcoming events.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/events')}
                >
                  Browse Events
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Past Events</h2>
            
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">You haven't attended any past events.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}