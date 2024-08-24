import mongoose from 'mongoose';
import { User } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (userId: string) => {
      console.log("Inside PostExit function with userId:", userId);
  
      try {
        // Find the user by userId and update blocked status to true
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { blocked: false } },
          { new: true } // To return the updated document
        );
  
        if (!updatedUser) {
          return { status: false, message: "User not found" };
        }
  
        console.log("Updated User:", updatedUser);
  
        // Return success status with updated user data
        return { status: true, data: updatedUser };
      } catch (error) {
        console.error("Error in PostExit function:", error);
        // Return failure status with error message
        return { status: false, message: "An error occurred" };
      }
    }
  };