import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { StarRating } from './ui/StarRating';
import { useEvent } from '../context/EventContext';

interface FeedbackFormProps {
  eventId: string;
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({ eventId, onSubmitSuccess }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { submitFeedback } = useEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const success = await submitFeedback(eventId, rating, comment);
      
      if (success) {
        setRating(0);
        setComment('');
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        setError('Unable to submit feedback. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while submitting feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Rate your experience
        </label>
        <StarRating 
          value={rating} 
          onChange={setRating}
          size="lg" 
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      
      <Textarea
        label="Your comments (optional)"
        placeholder="Share your thoughts about this event..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
}