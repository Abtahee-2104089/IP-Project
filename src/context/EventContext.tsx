import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { eventsAPI } from '../services/api';

interface EventContextType {
  registerForEvent: (eventId: string) => Promise<boolean>;
  unregisterFromEvent: (eventId: string) => Promise<boolean>;
  submitFeedback: (eventId: string, rating: number, comment: string) => Promise<boolean>;
  getUserEvents: () => string[];
  isUserRegistered: (eventId: string) => boolean;
  hasUserSubmittedFeedback: (eventId: string) => boolean;
  loading: boolean;
  refreshUserEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's registered events on mount and when user changes
  useEffect(() => {
    if (user) {
      setUserEvents(user.registeredEvents || []);
    } else {
      setUserEvents([]);
    }
  }, [user]);

  const refreshUserEvents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // The user's registered events are already in the user object from AuthContext
      // We could also fetch from a dedicated endpoint if needed
      setUserEvents(user.registeredEvents || []);
    } catch (error) {
      console.error('Failed to refresh user events:', error);
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      await eventsAPI.register(eventId);
      
      // Update local state
      if (!userEvents.includes(eventId)) {
        setUserEvents([...userEvents, eventId]);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to register for event:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unregisterFromEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      await eventsAPI.unregister(eventId);
      
      // Update local state
      setUserEvents(userEvents.filter(id => id !== eventId));
      
      return true;
    } catch (error) {
      console.error('Failed to unregister from event:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (eventId: string, rating: number, comment: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      await eventsAPI.submitFeedback(eventId, { rating, comment });
      
      return true;
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserEvents = () => {
    return userEvents;
  };

  const isUserRegistered = (eventId: string) => {
    return userEvents.includes(eventId);
  };  const hasUserSubmittedFeedback = (_eventId: string) => {
    // This would need to be determined from the event data or a separate API call
    // For now, we'll return false and can enhance this later
    // TODO: Implement feedback checking logic when needed
    return false;
  };

  return (
    <EventContext.Provider 
      value={{ 
        registerForEvent, 
        unregisterFromEvent, 
        submitFeedback, 
        getUserEvents,
        isUserRegistered,
        hasUserSubmittedFeedback,
        loading,
        refreshUserEvents
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