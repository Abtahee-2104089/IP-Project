import express from 'express';
import Club from '../models/Club.js';
import { auth, clubAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find({ isApproved: true })
      .populate('adminId', 'name email')
      .populate('events');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get club by ID
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('adminId', 'name email')
      .populate('events');
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update club (club admin only)
router.put('/:id', clubAdminAuth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is the club admin or system admin
    if (club.adminId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('adminId', 'name email');

    res.json(updatedClub);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;