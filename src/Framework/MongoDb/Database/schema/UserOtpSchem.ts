import mongoose from 'mongoose';

// Define the OTP schema
const OtpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300  // expires in 300 seconds (5 minutes)
  },
  expiredAt: {
    type: Date,
    required: true,
    default: function() {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5); // expire after 5 minutes
      return now;
    }
  }
});

// Create the OTP model
const UserOtp = mongoose.model('UserOtp', OtpSchema);

export{ UserOtp}
