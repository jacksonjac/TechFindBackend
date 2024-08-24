import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician', // Assuming you have a Technician model
    required: true
  },
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  content: {
    type: String,
    required: true
  },
  ratingValue: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true // This will add `createdAt` and `updatedAt` fields automatically
});

const Comment = mongoose.model('Comment', commentSchema);

export { 
    Comment
}
