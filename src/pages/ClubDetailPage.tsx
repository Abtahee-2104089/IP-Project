import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, Users, Clock, ArrowLeft, Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import EventCard from '../components/EventCard';
import { formatDate } from '../lib/utils';
import { clubsAPI, eventsAPI, usersAPI } from '../services/api';
import type { Club, Event, User } from '../types';

export default function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [clubEvents, setClubEvents] = useState<Event[]>([]);
  const [clubAdmin, setClubAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchClubData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch club details
        const clubData = await clubsAPI.getById(id);
        setClub(clubData);
        
        // Fetch club events
        const eventsData = await eventsAPI.getAll();
        const clubEventsData = eventsData.filter((event: { clubId: string; }) => event.clubId === id);
        setClubEvents(clubEventsData);
        
        // Fetch club admin
        if (clubData.adminId) {
          const adminData = await usersAPI.getById(clubData.adminId);
          setClubAdmin(adminData);
        }
      } catch (err) {
        setError('Failed to load club details');
        console.error('Error fetching club data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClubData();
  }, [id]);
  
  if (!id) {
    return <div>Club not found</div>;
  }
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !club) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Club Not Found</h1>
        <p className="text-gray-600 mb-8">{error || "The club you're looking for doesn't exist or has been removed."}</p>
        <Button>
          <Link to="/clubs">Back to Clubs</Link>
        </Button>      </div>
    );
  }
  
  const upcomingEvents = clubEvents.filter((event: Event) => event.status === 'upcoming');
  const pastEvents = clubEvents.filter((event: Event) => event.status === 'past');

  return (
    <div>
      {/* Club header with cover image */}
      <div className="relative h-64 md:h-80 bg-gray-200">
        <img 
          src={club.coverImage} 
          alt={club.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border-4 border-white bg-white shadow-md">
              <img 
                src={club.logo} 
                alt={club.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{club.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="text-white border-white/50">
                  {club.category}
                </Badge>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  {club.members} members
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Since {club.foundedYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        <Button variant="ghost" className="mb-8">
          <Link to="/clubs" className="flex items-center text-gray-600">
            <ArrowLeft size={16} className="mr-1" />
            Back to Clubs
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-line">{club.description}</p>
            </div>
            
            {/* Announcements section */}
            {club.announcements && club.announcements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Announcements</h2>
                <div className="space-y-4">
                  {club.announcements.map((announcement) => (
                    <div 
                      key={announcement.id} 
                      className={`p-4 rounded-lg ${
                        announcement.important ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <span className="text-xs text-gray-500">{formatDate(announcement.date)}</span>
                      </div>
                      <p className="text-gray-700">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upcoming events section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all events
                </Link>
              </div>
              
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events scheduled.</p>
              )}
            </div>
            
            {/* Past events section */}
            {pastEvents.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Past Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pastEvents.slice(0, 4).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                  {pastEvents.length > 4 && (
                  <div className="text-center mt-4">
                    <Button variant="outline">
                      <Link to={`/clubs/${club.id}/events`}>View all past events</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Club info card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Club Information</h2>
              
              {clubAdmin && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Club Administrator</p>
                  <div className="flex items-center gap-3">
                    <Avatar src={clubAdmin.avatar} name={clubAdmin.name} />
                    <div>
                      <p className="font-medium">{clubAdmin.name}</p>
                      <p className="text-sm text-gray-500">{clubAdmin.email}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Founded</p>
                    <p className="text-gray-600">{club.foundedYear}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Members</p>
                    <p className="text-gray-600">{club.members} active members</p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              {club.socialLinks && Object.values(club.socialLinks).some(Boolean) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Connect with us</h3>
                  <div className="flex flex-wrap gap-3">
                    {club.socialLinks.website && (
                      <a 
                        href={club.socialLinks.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <Globe size={16} />
                        <span>Website</span>
                      </a>
                    )}
                    {club.socialLinks.facebook && (
                      <a 
                        href={club.socialLinks.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <Facebook size={16} />
                        <span>Facebook</span>
                      </a>
                    )}
                    {club.socialLinks.twitter && (
                      <a 
                        href={club.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <Twitter size={16} />
                        <span>Twitter</span>
                      </a>
                    )}
                    {club.socialLinks.instagram && (
                      <a 
                        href={club.socialLinks.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <Instagram size={16} />
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Join club */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Interested in Joining?</h2>
              <p className="text-gray-600 mb-4">
                Become a member of {club.name} and participate in exciting events and activities.
              </p>
              <Button className="w-full">
                Request to Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}