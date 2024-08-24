import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technicians',
    required: true
  },
  messages: [{
    senderType: {
      type: String,
      enum: ['user', 'technician'],
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    seen: {
      type: Boolean,
      default: false // Default is false, meaning the message is not seen yet
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    
  }],
  lastMessage: {
    senderType: {
      type: String,
      enum: ['user', 'technician'],
      required: true
    },
    senderId: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true
    }}
});

const Chat = mongoose.model('Chat', ChatSchema);

export {
  Chat
};