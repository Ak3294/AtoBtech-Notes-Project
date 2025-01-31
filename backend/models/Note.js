import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
noteSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Note', noteSchema);