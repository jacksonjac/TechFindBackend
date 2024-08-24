import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
     
    },
    phone: {
      type: String,
      required: true,
      
    },
    district: {
      type: String,
      required: true
    },
    workexp: {
      type: Number,
      required: true
    },
    worklevel: {
      type: Number,
      required: false
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designation',  // Reference to the Designation model
      required: true
    },
    aadarNo: {
      type: String,
      required: true,
      
    },
    panNo: {
      type: String,
      required: true,
     
    },
    serviceCharge: {
      type: Number,
      required: false
    },
    password: {
      type: String,
      required: true,
     
    },
    verified: {
      type: Boolean,
      default: false // Default value is false
    },
    Approved: {
      type: Boolean,
      default: false // Default value is false
    },
    blocked: {
      type: Boolean,
      default: false // Default value is false
    },
    Likes:{
      type:Number,
      required:false,
      default:0
    },
    image:{
      type:String,
      default:false
    }
    
    
  }, {
    timestamps: true
  });

  const Technican = mongoose.model('Technicians', technicianSchema);

export {
    Technican
}