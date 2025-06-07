import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, Clock, Edit, Trash2, Eye, Users, Settings, Bell, BarChart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatTime } from '../lib/utils';
import { eventsAPI } from '../services/api';
import { useClubs, useEvents } from '../hooks/useData';
import type { Club, Event } from '../types';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { clubs, loading: clubsLoading } = useClubs();
  const { events, loading: eventsLoading, refetch: refetchEvents } = useEvents();
  const [activeTab, setActiveTab] = useState<'events' | 'members' | 'announcements' | 'settings'>('events');
  const [view, setView] = useState<'list' | 'create'>('list');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: '',
    image: 'https://images.pexels.com/photos/3760454/pexels-photo-3760454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    maxParticipants: ''
  });
    // Check if user is admin or club-admin
  if (!user || (user.role !== 'admin' && user.role !== 'club-admin')) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  // Get club events if user is club-admin
  const userClub = user.role === 'club-admin' && clubs.length > 0 ? 
    clubs.find((club: Club) => club.adminId === user.id) : null;
    const clubEvents = userClub ? 
    events.filter((event: Event) => event.clubId === userClub.id) : 
    user.role === 'admin' ? events : [];
  
  // Show loading state
  if (clubsLoading || eventsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="bg-gray-200 rounded-lg h-16 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userClub) {
      alert('Club not found. Unable to create event.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        category: formData.category,
        image: formData.image,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        clubId: userClub.id
      };
      
      await eventsAPI.create(eventData);
      
      // Reset form and go back to list
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        category: '',
        image: 'https://images.pexels.com/photos/3760454/pexels-photo-3760454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        maxParticipants: ''
      });
      setView('list');
      
      // Refresh events list
      refetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Categories for dropdown
  const categories = ['Workshop', 'Seminar', 'Contest', 'Performance', 'Sports', 'Discussion', 'Wellness'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {user.role === 'admin' ? 'Admin Dashboard' : `Club Admin Dashboard`}
        </h1>
      </div>

      {/* Dashboard navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2 p-2">
          <Button
            variant={activeTab === 'events' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('events')}
            className="flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </Button>
          <Button
            variant={activeTab === 'members' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('members')}
            className="flex items-center"
          >
            <Users className="h-4 w-4 mr-2" />
            Members
          </Button>
          <Button
            variant={activeTab === 'announcements' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('announcements')}
            className="flex items-center"
          >
            <Bell className="h-4 w-4 mr-2" />
            Announcements
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Events</p>
              <h3 className="text-2xl font-bold">{clubEvents.length}</h3>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <h3 className="text-2xl font-bold">{userClub?.members || 0}</h3>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>
              <h3 className="text-2xl font-bold">
                {clubEvents.filter((e: Event) => e.status === 'upcoming').length}
              </h3>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <h3 className="text-2xl font-bold">
                {clubEvents.reduce((acc: number, event: Event) => acc + (event.registeredUsers?.length || 0), 0)}
              </h3>
            </div>
            <BarChart className="h-8 w-8 text-amber-500" />
          </div>
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Manage Events</h2>
            {view === 'list' ? (
              <Button onClick={() => setView('create')}>
                <PlusCircle size={16} className="mr-2" />
                Create Event
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setView('list')}>
                Back to Events
              </Button>
            )}
          </div>

          {view === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registrations
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>                <tbody className="bg-white divide-y divide-gray-200">
                  {clubEvents.map((event: Event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-xs text-gray-500">{event.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-900">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={
                          event.status === 'upcoming' ? 'default' : 
                          event.status === 'ongoing' ? 'success' : 'secondary'
                        }>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </td>                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.registeredUsers?.length || 0}
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => navigate(`/events/${event.id}`)}
                          >
                            <Eye size={16} />
                            <span className="sr-only">View</span>
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  
                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categories.map(cat => ({ value: cat, label: cat }))}
                    required
                  />
                  
                  <Input
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Start Time"
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="End Time"
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="Maximum Participants (optional)"
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    min="1"
                  />
                  
                  <Input
                    label="Cover Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="md:col-span-2"
                  />
                  
                  <Textarea
                    label="Event Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="md:col-span-2"
                    required
                  />
                </div>
                  <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setView('list')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'members' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Club Members</h2>
          <p className="text-gray-500">Member management features will be available soon.</p>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Announcements</h2>
          <p className="text-gray-500">Announcement management features will be available soon.</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Club Settings</h2>
          <p className="text-gray-500">Club settings and configuration options will be available soon.</p>
        </div>
      )}
    </div>
  );
}