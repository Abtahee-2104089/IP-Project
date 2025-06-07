import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
}

export function formatDateTime(date: string | Date, time: string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return `${format(dateObj, 'MMMM d, yyyy')} at ${formatTime(time)}`;
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(':');
  const hourNum = parseInt(hour, 10);
  const isPM = hourNum >= 12;
  const hour12 = hourNum % 12 || 12;
  return `${hour12}:${minute} ${isPM ? 'PM' : 'AM'}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}