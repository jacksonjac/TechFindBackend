import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technicians',
    required: true
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  transactionStatus: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending'
  },
 
  amount: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
 
});

const Bookings = mongoose.model('Booking', bookingSchema);

export{Bookings}

// module.exports = mongoose.model('Booking', bookingSchema);