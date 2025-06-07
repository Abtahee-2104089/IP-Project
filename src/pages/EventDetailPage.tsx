import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarClock, MapPin, Users, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StarRating } from '../components/ui/StarRating';
import { Avatar } from '../components/ui/Avatar';
import FeedbackForm from '../components/FeedbackForm';
import { getEventById } from '../data/events';
import { getClubById } from '../data/clubs';
import { getUsersByEvent, getUserById } from '../data/users';
import { formatDate, formatTime } from '../lib/utils';
import { useEvent } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { registerForEvent, unregisterFromEvent, isUserRegistered, hasUserSubmittedFeedback } = useEvent();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  if (!id) {
    return <div>Event not found</div>;
  }
  
  const event = getEventById(id);
  
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }
  
  const club = getClubById(event.clubId);
  const registeredUsers = getUsersByEvent(event.id);
  const registered = isUserRegistered(event.id);
  const registrationFull = event.maxParticipants !== undefined && 
    event.registeredUsers.length >= event.maxParticipants;
  const canSubmitFeedback = event.status === 'past' && registered && !hasUserSubmittedFeedback(event.id);
  
  const handleRegistration = async () => {
    setIsRegistering(true);
    
    try {
      if (registered) {
        await unregisterFromEvent(event.id);
      } else {
        await registerForEvent(event.id);
      }
    } finally {
      setIsRegistering(false);
    }
  };
  
  const statusVariant = {
    upcoming: 'default',
    ongoing: 'success',
    past: 'secondary'
  } as const;
  
  const handleFeedbackSubmitted = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/events" className="flex items-center text-gray-600">
            <ArrowLeft size={16} className="mr-1" />
            Back to Events
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={statusVariant[event.status]}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge variant="outline">{event.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            
            {club && (
              <Link 
                to={`/clubs/${club.id}`} 
                className="flex items-center gap-2 mt-2 text-blue-600 hover:text-blue-700"
              >
                <img 
                  src={club.logo} 
                  alt={club.name} 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>Organized by {club.name}</span>
              </Link>
            )}
          </div>
          
          {user && event.status !== 'past' && (
            <Button
              variant={registered ? "outline" : "default"}
              onClick={handleRegistration}
              disabled={(!registered && registrationFull) || isRegistering}
              className="min-w-[120px]"
            >
              {isRegistering 
                ? 'Processing...' 
                : registered 
                  ? 'Unregister' 
                  : registrationFull 
                    ? 'Registration Full' 
                    : 'Register Now'
              }
            </Button>
          )}
          
          {canSubmitFeedback && (
            <Button
              onClick={() => setShowFeedbackForm(true)}
              className="min-w-[120px]"
            >
              Give Feedback
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Event image */}
          <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px]">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Event details */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">About this Event</h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">{event.description}</p>
            
            {/* Show feedback form if applicable */}
            {showFeedbackForm && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Share Your Feedback</h3>
                <FeedbackForm 
                  eventId={event.id} 
                  onSubmitSuccess={handleFeedbackSubmitted} 
                />
              </div>
            )}
            
            {/* Show feedback if available and not showing form */}
            {!showFeedbackForm && event.feedback && event.feedback.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Participant Feedback</h3>
                <div className="space-y-4">
                  {event.feedback.map((feedback) => {
                    const feedbackUser = getUserById(feedback.userId);
                    return (
                      <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Avatar 
                            src={feedbackUser?.avatar} 
                            name={feedbackUser?.name || 'Anonymous'} 
                            size="sm" 
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <p className="font-medium">{feedbackUser?.name || 'Anonymous'}</p>
                                <p className="text-xs text-gray-500">{formatDate(feedback.date)}</p>
                              </div>
                              <StarRating value={feedback.rating} readOnly size="sm" />
                            </div>
                            <p className="text-sm text-gray-700">{feedback.comment}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Event info card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Event Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{formatDate(event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Participants</p>
                  <p className="text-gray-600">
                    {event.registeredUsers.length}
                    {event.maxParticipants && ` / ${event.maxParticipants}`}
                  </p>
                </div>
              </div>
            </div>
            
            {event.maxParticipants && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Registration</span>
                  <span className="text-sm text-gray-600">
                    {event.registeredUsers.length}/{event.maxParticipants} spots filled
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${event.registeredUsers.length === event.maxParticipants ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${(event.registeredUsers.length / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Registered users */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">
              Registered Participants ({registeredUsers.length})
            </h2>
            
            {registeredUsers.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {registeredUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No participants registered yet.</p>
            )}
          </div>
          
          {/* Add to calendar */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Add to Calendar</h2>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <CalendarClock size={16} />
              Add to my calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}