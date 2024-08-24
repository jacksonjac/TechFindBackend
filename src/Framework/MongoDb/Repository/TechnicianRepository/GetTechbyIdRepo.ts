import mongoose from 'mongoose';
import { Technican } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (userId:any) => {
        console.log("Inside getTechnicianById function with userId:", userId);
    
        try {
          // Find the technician by userId
          const technician = await Technican.findById(userId);
    
          if (!technician) {
            return { status: false, message: "Technician not found" };
          }
    
          console.log("Technician found:", technician);
    
          // Return success status with technician data
          return { status: true, data: technician };
        } catch (error) {
          console.error("Error in getTechnicianById function:", error);
          // Return failure status with error message
          return { status: false, message: "An error occurred" };
        }
      }
    };
  