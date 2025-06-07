import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, LayoutDashboard, Menu, X, LogOut, Settings, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Events', to: '/events', icon: Calendar },
    { name: 'Clubs', to: '/clubs', icon: Users },
  ];
  
  // Add admin routes if user is admin or club-admin
  if (user && (user.role === 'admin' || user.role === 'club-admin')) {
    navigation.push({ name: 'Admin', to: '/admin', icon: Settings });
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-blue-600 font-bold text-xl">CUET</span>
                <span className="text-purple-600 font-bold text-xl">ClubSphere</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive(item.to)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* User profile section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'student' && (
                  <Button variant="outline\" size="sm\" asChild>
                    <Link to="/clubs/register\" className="flex items-center">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Register Club
                    </Link>
                  </Button>
                )}
                <Link to="/profile" className="flex items-center space-x-2">
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-500"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center px-3 py-2 text-base font-medium ${
                isActive(item.to)
                  ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile user profile section */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <div className="flex items-center px-4 py-2">
                <div className="flex-shrink-0">
                  <Avatar src={user.avatar} name={user.name} size="md" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              {user.role === 'student' && (
                <Link
                  to="/clubs/register"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register Club
                </Link>
              )}
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-1 px-4 py-2">
              <Button
                variant="outline"
                fullWidth
                className="mb-2"
                asChild
              >
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button
                fullWidth
                asChild
              >
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}