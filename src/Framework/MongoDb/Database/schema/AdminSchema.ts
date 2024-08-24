import mongoose from 'mongoose';

// Define the OTP schema
const AdminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true
  },
  
  password:{
    type:String,
    required:true
 }
});

// Create the OTP model
const Admin = mongoose.model('UserOtp', AdminSchema);

export{ Admin}
