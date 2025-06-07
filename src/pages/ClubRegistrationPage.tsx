import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';

export default function ClubRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    logo: '',
    coverImage: '',
    socialLinks: {
      website: '',
      facebook: '',
      twitter: '',
      instagram: '',
    },
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You need to be logged in to register a club.</p>
        <Button asChild>
          <Link to="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialNetwork = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialNetwork]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin');
    } catch (err) {
      setError('Failed to register club. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Arts & Culture', label: 'Arts & Culture' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Social', label: 'Social' },
    { value: 'Professional', label: 'Professional' },
  ];

  return (
    <div className="min-h-[calc(100vh-16rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Register Your Club</h1>
            <p className="mt-2 text-gray-600">
              Create a new club profile and start organizing events on campus
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Club Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Select
                label="Category"
                name="category"
                options={categories}
                value={formData.category}
                onChange={handleChange}
                required
              />

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />

              <Input
                label="Logo URL"
                name="logo"
                type="url"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                required
              />

              <Input
                label="Cover Image URL"
                name="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/cover.png"
                required
              />

              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Website"
                    name="social.website"
                    type="url"
                    value={formData.socialLinks.website}
                    onChange={handleChange}
                    placeholder="https://yourclub.com"
                  />
                  <Input
                    label="Facebook"
                    name="social.facebook"
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/yourclub"
                  />
                  <Input
                    label="Twitter"
                    name="social.twitter"
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/yourclub"
                  />
                  <Input
                    label="Instagram"
                    name="social.instagram"
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourclub"
                  />
                </div>
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
                I confirm that I am authorized to register this club and agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Club Registration Guidelines
                </a>
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Club'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}