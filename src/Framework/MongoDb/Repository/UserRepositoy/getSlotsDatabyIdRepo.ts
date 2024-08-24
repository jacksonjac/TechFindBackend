import mongoose from 'mongoose';
import { Technican } from '../../Database'; 
import { Slot } from '../../Database';
import { Address } from '../../Database';
import {Bookings} from '../../Database'

export default {
    PostExit: async (slotId: string) => {
        console.log("Inside PostExit function with slotId:", slotId);
    
        try {
          // Find the slot by slotId
          const slot = await Slot.findOne({ _id: slotId }).populate('address');
    
          if (!slot) {
            return { status: false, message: "Slot not found" };
          }
    
          // Find the technician by techId from the slot
          const technician = await Technican.findOne({ _id: slot.techId }).populate('designation');
    
          if (!technician) {
            return { status: false, message: "Technician not found" };
          }
    
          console.log("Found Slotdata:", slot);
          console.log("Found Technician data:", technician);
    
          // Combine slot, technician, and address data into a single response
          const responseData = {
            slot,
            technician,
            address: slot.address
          };
    
          // Return success status with combined data
          return { status: true, data: responseData };
        } catch (error) {
          console.error("Error in PostExit function:", error);
          // Return failure status with error message
          return { status: false, message: "An error occurred" };
        }
      }
  };