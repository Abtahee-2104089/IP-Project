import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Arts & Culture', 'Sports', 'Academic', 'Social', 'Professional']
  },
  foundedYear: {
    type: Number,
    default: new Date().getFullYear()
  },
  members: {
    type: Number,
    default: 1
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String,
    website: String
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  announcements: [{
    title: String,
    content: String,
    date: {
      type: Date,
      default: Date.now
    },
    important: {
      type: Boolean,
      default: false
    }
  }],
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Club', clubSchema);