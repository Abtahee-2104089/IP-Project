import { useState, useEffect } from 'react';
import { User, Club, Event } from '../types';
import { usersAPI, clubsAPI, eventsAPI } from '../services/api';

// Users hooks
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersAPI.getAll();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await usersAPI.getById(id);
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};

// Clubs hooks
export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const data = await clubsAPI.getAll();
        setClubs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch clubs');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const refetch = async () => {
    try {
      const data = await clubsAPI.getAll();
      setClubs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refetch clubs');
    }
  };

  return { clubs, loading, error, refetch };
};

export const useClub = (id: string) => {
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClub = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await clubsAPI.getById(id);
        setClub(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch club');
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [id]);

  return { club, loading, error };
};

// Events hooks
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsAPI.getAll();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const refetch = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refetch events');
    }
  };

  return { events, loading, error, refetch };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await eventsAPI.getById(id);
        setEvent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const refetch = async () => {
    if (!id) return;
    try {
      const data = await eventsAPI.getById(id);
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refetch event');
    }
  };

  return { event, loading, error, refetch };
};

// Helper functions for filtered data
export const getEventsByStatus = (events: Event[], status: 'upcoming' | 'ongoing' | 'past') => {
  return events.filter(event => event.status === status);
};

export const getEventsByClub = (events: Event[], clubId: string) => {
  return events.filter(event => event.clubId === clubId);
};

export const getEventsByCategory = (events: Event[], category: string) => {
  return events.filter(event => event.category === category);
};

export const getClubsByCategory = (clubs: Club[], category: string) => {
  return clubs.filter(club => club.category === category);
};
