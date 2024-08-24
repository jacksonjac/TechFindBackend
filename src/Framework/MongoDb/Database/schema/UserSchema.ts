
import mongoose, { Schema } from 'mongoose'

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    
  },
  phone: {
    type: Number,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false // Default value is false
  },
  image: {
    type: String,
    required: false
  },
  blocked: {
    type: Boolean,
    default: false // Default value is false
  },
  google:{
    type:Boolean,
    default:false
  },
  address: { // Lowercase 'a' for consistency
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address', // Reference to the Address model
    required: false
  },
  slots: [{
    type: Schema.Types.ObjectId,
    ref: 'Slot'
  }] 
});

// Create the User model
const User = mongoose.model('User', userSchema);

export {
    User
}
