import { createContext, useContext, useState, ReactNode } from 'react';
import { Event, Feedback } from '../types';
import { events, getEventById } from '../data/events';
import { useAuth } from './AuthContext';

interface EventContextType {
  registerForEvent: (eventId: string) => Promise<boolean>;
  unregisterFromEvent: (eventId: string) => Promise<boolean>;
  submitFeedback: (eventId: string, rating: number, comment: string) => Promise<boolean>;
  getUserEvents: () => string[];
  isUserRegistered: (eventId: string) => boolean;
  hasUserSubmittedFeedback: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState<string[]>(user?.registeredEvents || []);

  const registerForEvent = async (eventId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!user) return false;
    
    if (!userEvents.includes(eventId)) {
      setUserEvents([...userEvents, eventId]);
    }
    
    return true;
  };

  const unregisterFromEvent = async (eventId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!user) return false;
    
    setUserEvents(userEvents.filter(id => id !== eventId));
    
    return true;
  };

  const submitFeedback = async (eventId: string, rating: number, comment: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, we would add the feedback to the database
    return true;
  };

  const getUserEvents = () => {
    return userEvents;
  };

  const isUserRegistered = (eventId: string) => {
    return userEvents.includes(eventId);
  };

  const hasUserSubmittedFeedback = (eventId: string) => {
    if (!user) return false;
    
    const event = getEventById(eventId);
    return !!event?.feedback?.some(feedback => feedback.userId === user.id);
  };

  return (
    <EventContext.Provider 
      value={{ 
        registerForEvent, 
        unregisterFromEvent, 
        submitFeedback, 
        getUserEvents,
        isUserRegistered,
        hasUserSubmittedFeedback
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}