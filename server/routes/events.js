import express from 'express';
import Event from '../models/Event.js';
import { auth, clubAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('clubId', 'name logo')
      .populate('registeredUsers', 'name email avatar')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('clubId', 'name logo')
      .populate('registeredUsers', 'name email avatar department year')
      .populate('feedback.userId', 'name avatar');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event (club admin only)
router.post('/', clubAdminAuth, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      clubId: req.user.clubId
    };

    const event = new Event(eventData);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('clubId', 'name logo');

    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    if (event.registeredUsers.includes(req.userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event is full
    if (event.maxParticipants && event.registeredUsers.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.registeredUsers.push(req.userId);
    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Unregister from event
router.delete('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.registeredUsers = event.registeredUsers.filter(
      userId => userId.toString() !== req.userId
    );
    await event.save();

    res.json({ message: 'Successfully unregistered from event' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;