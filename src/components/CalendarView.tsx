import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addDays, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Event } from '../types';

interface CalendarViewProps {
  events: Event[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function CalendarView({ events, currentMonth, onMonthChange }: CalendarViewProps) {
  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = addDays(monthStart, -getDay(monthStart));
    
    // Create a 6-week calendar grid to ensure consistent height
    return eachDayOfInterval({ start: startDate, end: addDays(monthEnd, 42 - (getDay(monthEnd) + 1)) });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const mappedEvents: Record<string, Event[]> = {};
    
    events.forEach(event => {
      const dateKey = event.date;
      if (!mappedEvents[dateKey]) {
        mappedEvents[dateKey] = [];
      }
      mappedEvents[dateKey].push(event);
    });
    
    return mappedEvents;
  }, [events]);

  const nextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onMonthChange(new Date())}
          >
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 text-center py-2 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 h-[600px]">
        {daysInMonth.map((day, dayIdx) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayEvents = eventsByDate[dateKey] || [];
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={dayIdx}
              className={`min-h-[100px] p-1 border-b border-r ${
                !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
              }`}
            >
              <div className={`text-right p-1 ${isToday ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center ml-auto' : ''}`}>
                {format(day, 'd')}
              </div>
              
              <div className="mt-1 max-h-[80px] overflow-y-auto">
                {dayEvents.slice(0, 3).map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className={`block text-xs p-1 mb-1 rounded truncate ${
                      event.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : event.status === 'ongoing'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {event.title}
                  </Link>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}