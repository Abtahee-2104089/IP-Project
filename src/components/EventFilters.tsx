import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Input } from './ui/Input';

interface EventFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
}

export interface FilterOptions {
  search: string;
  category: string;
  status: string;
  date: string;
}

export default function EventFilters({ onFilterChange, categories }: EventFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    status: '',
    date: '',
  });

  const handleFilterChange = (name: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      category: '',
      status: '',
      date: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const statusOptions = [
    { value: '', label: 'All statuses' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'past', label: 'Past' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Filter toggle and search (always visible) */}
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter size={16} />
            {isOpen ? 'Hide filters' : 'Show filters'}
          </Button>
          {Object.values(filters).some(Boolean) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Expanded filters */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              options={[
                { value: '', label: 'All categories' },
                ...categories.map(category => ({ value: category, label: category }))
              ]}
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            />
            <div>
              <Input
                type="date"
                label="Date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}