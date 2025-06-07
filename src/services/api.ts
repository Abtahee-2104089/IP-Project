const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to make authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string, role?: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    department?: string;
    year?: number;
    clubName?: string;
    clubDescription?: string;
    clubCategory?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    return fetchWithAuth('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  forgotPassword: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    return handleResponse(response);
  },

  verifyOTP: async (email: string, otp: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    
    return handleResponse(response);
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    
    return handleResponse(response);
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return fetchWithAuth('/users');
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/users/${id}`);
  },

  updateProfile: async (userData: {
    name?: string;
    department?: string;
    year?: number;
    avatar?: string;
  }) => {
    return fetchWithAuth('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Clubs API
export const clubsAPI = {
  getAll: async () => {
    return fetchWithAuth('/clubs');
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/clubs/${id}`);
  },

  create: async (clubData: {
    name: string;
    description: string;
    category: string;
    logo: string;
    coverImage: string;
    socialLinks?: {
      website?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
  }) => {
    return fetchWithAuth('/clubs', {
      method: 'POST',
      body: JSON.stringify(clubData),
    });
  },

  update: async (id: string, clubData: any) => {
    return fetchWithAuth(`/clubs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clubData),
    });
  },
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    return fetchWithAuth('/events');
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/events/${id}`);
  },

  create: async (eventData: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    category: string;
    image: string;
    maxParticipants?: number;
  }) => {
    return fetchWithAuth('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  register: async (eventId: string) => {
    return fetchWithAuth(`/events/${eventId}/register`, {
      method: 'POST',
    });
  },

  unregister: async (eventId: string) => {
    return fetchWithAuth(`/events/${eventId}/unregister`, {
      method: 'POST',
    });
  },

  submitFeedback: async (eventId: string, feedback: {
    rating: number;
    comment: string;
  }) => {
    return fetchWithAuth(`/events/${eventId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  },
};

export default {
  auth: authAPI,
  users: usersAPI,
  clubs: clubsAPI,
  events: eventsAPI,
};
