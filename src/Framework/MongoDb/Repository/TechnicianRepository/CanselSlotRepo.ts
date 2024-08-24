import mongoose from 'mongoose';
import { Slot } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (slotId: string) => {
        console.log("Inside PostExit function with slotId:", slotId);
    
        try {
          // Find the slot by its ID and delete it
          const deletedSlot = await Slot.findOneAndDelete({ _id: slotId });
    
          if (!deletedSlot) {
            return { status: false, message: "Slot not found" };
          }
    
          console.log("Deleted Slot:", deletedSlot);
    
          // Return success status with deleted slot data
          return { status: true, data: deletedSlot };
        } catch (error) {
          console.error("Error in PostExit function:", error);
          // Return failure status with error message
          return { status: false, message: "An error occurred" };
        }
      }
  };