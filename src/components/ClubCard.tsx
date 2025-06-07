import React from 'react';
import { Link } from 'react-router-dom';
import { Users, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Club } from '../types';
import { getEventsByClub } from '../data/events';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  const clubEvents = getEventsByClub(club.id);
  const upcomingEvents = clubEvents.filter(event => event.status === 'upcoming').length;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={club.coverImage} 
          alt={club.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white bg-white">
            <img 
              src={club.logo} 
              alt={club.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-semibold text-lg drop-shadow-md">{club.name}</h3>
        </div>
      </div>
      
      <CardHeader className="flex-1 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline">{club.category}</Badge>
            <p className="text-sm text-gray-500 mt-3">Founded: {club.foundedYear}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 text-sm pt-2">
        <p className="text-gray-600 line-clamp-3">{club.description}</p>
        
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{club.members} members</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span>{upcomingEvents} upcoming events</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          asChild
        >
          <Link to={`/clubs/${club.id}`}>View Club</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}