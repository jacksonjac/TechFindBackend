import mongoose from 'mongoose';
import { User } from '../../Database'; // Adjust the path to your Admin model
import { Designation } from '../../Database';

export default {
    PostExit: async (UserId: string) => {
      console.log("Inside PostExit function with questionId:", UserId);

      try {
        // Find the question by questionId
        const technician = await User.findOne({ _id: UserId })
  
        if (!technician) {
          return { status: false, message: "Question not found" };
        }
  
        console.log("Found Question:", technician);
  
        // Return success status with found question data
        return { status: true, data: technician };
      } catch (error) {
        console.error("Error in PostExit function:", error);
        // Return failure status with error message
        return { status: false, message: "An error occurred" };
      }
    }
  };