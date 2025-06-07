import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import ClubCard from '../components/ClubCard';
import { useClubs } from '../hooks/useData';

export default function ClubsPage() {
  const { clubs, loading, error } = useClubs();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    clubs.forEach(club => uniqueCategories.add(club.category));
    return Array.from(uniqueCategories).sort();
  }, []);
  
  // Filter clubs based on search query and category
  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      // Search filter
      if (searchQuery && !club.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !club.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (categoryFilter && club.category !== categoryFilter) {
        return false;
      }
      
      return true;
    });
  }, [clubs, searchQuery, categoryFilter]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Clubs & Organizations</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      {/* Filter and search section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search clubs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <Select
            label="Filter by category"
            options={[
              { value: '', label: 'All categories' },
              ...categories.map(category => ({ value: category, label: category }))
            ]}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}
      
      {/* Clubs grid */}
      {!loading && (
        <>
          {filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredClubs.map(club => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {clubs.length === 0 ? 'No clubs available.' : 'No clubs found matching your criteria.'}
              </p>
              {clubs.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}