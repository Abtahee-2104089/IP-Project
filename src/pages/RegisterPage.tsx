import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    year: '',
    clubName: '',
    clubDescription: '',
    clubCategory: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Additional validation for club admin
    if (formData.role === 'club-admin') {
      if (!formData.clubName || !formData.clubDescription || !formData.clubCategory) {
        setError('Please fill in all club information fields');
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/login');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'club-admin', label: 'Club Administrator' },
  ];

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Architecture', label: 'Architecture' },
  ];
  
  const years = [
    { value: '', label: 'Select Year' },
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' },
  ];

  const clubCategories = [
    { value: '', label: 'Select Club Category' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Arts & Culture', label: 'Arts & Culture' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Social', label: 'Social' },
    { value: 'Professional', label: 'Professional' },
  ];

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Role Selection */}
            <Select
              label="I want to register as"
              id="role"
              name="role"
              options={roles}
              value={formData.role}
              onChange={handleChange}
              required
            />

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            {/* Student-specific fields */}
            {formData.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Department"
                  id="department"
                  name="department"
                  options={departments}
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
                
                <Select
                  label="Year"
                  id="year"
                  name="year"
                  options={years}
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Club Admin-specific fields */}
            {formData.role === 'club-admin' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900">Club Information</h3>
                <p className="text-sm text-blue-700">
                  As a club administrator, please provide information about your club.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Club Name"
                    id="clubName"
                    name="clubName"
                    required
                    value={formData.clubName}
                    onChange={handleChange}
                    placeholder="e.g., Robotics Club"
                  />
                  
                  <Select
                    label="Club Category"
                    id="clubCategory"
                    name="clubCategory"
                    options={clubCategories}
                    value={formData.clubCategory}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Textarea
                  label="Club Description"
                  id="clubDescription"
                  name="clubDescription"
                  required
                  value={formData.clubDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your club's mission, activities, and goals..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Your Department"
                    id="department"
                    name="department"
                    options={departments}
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                  
                  <Select
                    label="Your Year"
                    id="year"
                    name="year"
                    options={years}
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
            
            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              
              <Input
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
              {formData.role === 'club-admin' && (
                <span>
                  {' '}and the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Club Registration Guidelines
                  </a>
                </span>
              )}
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading 
              ? 'Creating account...' 
              : formData.role === 'club-admin' 
                ? 'Create Club Admin Account' 
                : 'Create Student Account'
            }
          </Button>
        </form>
      </div>
    </div>
  );
}