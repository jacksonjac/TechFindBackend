import { verify } from 'crypto';
import mongoose, { Schema } from 'mongoose'

// Define the User schema
const DesigSchema = new mongoose.Schema({
  DesiName: {
    type: String,
    required: true,
    
  },
  
});

// Create the User model
const Designation = mongoose.model('Designation', DesigSchema);

export {
    Designation
}
