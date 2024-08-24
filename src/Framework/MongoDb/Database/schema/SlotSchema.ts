// Assuming you have Mongoose installed and required in your Node.js project
import mongoose, { Schema } from 'mongoose'

// Define the schema for a slot
const SlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  techId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Technicians',
    require:false
  } ,
  createdAt: { type: Date, default: Date.now },
  booked:{type:Boolean,require:false},
  bookedid:{type:String,require:false},
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',  // Reference to the Address model
    required: false
  }
});

// Create a model using the schema
const Slot = mongoose.model('Slot', SlotSchema);

export{ Slot}