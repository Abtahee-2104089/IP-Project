import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Event } from '../types';
import { formatDate, formatTime, truncateText } from '../lib/utils';
import { useEvent } from '../context/EventContext';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { isUserRegistered, registerForEvent, unregisterFromEvent } = useEvent();
  const [isRegistering, setIsRegistering] = React.useState(false);
  
  const registered = isUserRegistered(event.id);
  const registrationFull = event.maxParticipants !== undefined && 
    event.registeredUsers.length >= event.maxParticipants;
  
  const statusVariant = {
    upcoming: 'default',
    ongoing: 'success',
    past: 'secondary'
  } as const;

  const handleRegistration = async () => {
    setIsRegistering(true);
    
    try {
      if (registered) {
        await unregisterFromEvent(event.id);
      } else {
        await registerForEvent(event.id);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={statusVariant[event.status]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between">
          <Link to={`/events/${event.id}`} className="hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
          </Link>
          <Badge variant="outline">{event.category}</Badge>
        </div>
        <p className="text-sm text-gray-500 mt-2">{truncateText(event.description, 100)}</p>
      </CardHeader>
      
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{event.location}</span>
        </div>
        {event.maxParticipants && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{event.registeredUsers.length} / {event.maxParticipants} participants</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            asChild
          >
            <Link to={`/events/${event.id}`}>Details</Link>
          </Button>
          
          {event.status !== 'past' && (
            <Button 
              variant={registered ? "outline" : "default"} 
              size="sm" 
              className="flex-1"
              onClick={handleRegistration}
              disabled={(!registered && registrationFull) || isRegistering}
            >
              {isRegistering 
                ? 'Processing...' 
                : registered 
                  ? 'Unregister' 
                  : registrationFull 
                    ? 'Full' 
                    : 'Register'
              }
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}