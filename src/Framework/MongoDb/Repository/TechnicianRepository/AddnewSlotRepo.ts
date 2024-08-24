import { Slot } from "../../Database";
import {Technican} from "../../Database"

export default {
    PostExit: async (data:any) => {

        console.log("slot add function");

        try {
          // Fetch the technician document to ensure it exists
          const technicianDoc = await Technican.findOne({ _id: data.techId });
          if (!technicianDoc) {
            return { status: false, message: "Technician does not exist" };
          }
    
          // Create a new slot with the provided data
          const newSlot = await Slot.create({
            date: data.date,
            time: data.time,
            techId: technicianDoc._id,
            booked:false

           
          });
    
          return { status: true, message: "Slot added successfully", data: newSlot };
        } catch (error) {
          console.error("Error in addNewSlot:", error);
          return { status: false, message: "An error occurred while adding the slot", error: error };
        }
      }
};