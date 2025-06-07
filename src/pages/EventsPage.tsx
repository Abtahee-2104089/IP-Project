import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, GridIcon, ListIcon } from 'lucide-react';
import EventCard from '../components/EventCard';
import EventFilters, { FilterOptions } from '../components/EventFilters';
import CalendarView from '../components/CalendarView';
import { Button } from '../components/ui/Button';
import { events } from '../data/events';
import { formatDate } from '../lib/utils';

export default function EventsPage() {
  const [view, setView] = useState<'grid' | 'calendar'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    status: '',
    date: '',
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    events.forEach(event => uniqueCategories.add(event.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter
      if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !event.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category && event.category !== filters.category) {
        return false;
      }
      
      // Status filter
      if (filters.status && event.status !== filters.status) {
        return false;
      }
      
      // Date filter
      if (filters.date && event.date !== filters.date) {
        return false;
      }
      
      return true;
    });
  }, [events, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Events</h1>
        
        <div className="flex space-x-2 self-end md:self-auto">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('grid')}
          >
            <GridIcon size={16} className="mr-1" />
            Grid
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
          >
            <CalendarIcon size={16} className="mr-1" />
            Calendar
          </Button>
        </div>
      </div>
      
      <EventFilters 
        onFilterChange={handleFilterChange}
        categories={categories}
      />
      
      {view === 'grid' ? (
        <>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No events found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilters({ search: '', category: '', status: '', date: '' })}
              >
                Clear filters
              </Button>
            </div>
          )}
        </>
      ) : (
        <CalendarView 
          events={filteredEvents}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      )}
    </div>
  );
}