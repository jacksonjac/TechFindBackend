import mongoose from 'mongoose';
import { User } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (data: { userid: string; updatedFields: any }) => {
        const { userid, updatedFields } = data;
    
        console.log("Updating user data with techId:", userid, "and fields:", updatedFields);
    
        try {
          // Find the user by techId and update the provided fields
          const updatedUser = await User.findOneAndUpdate(
            { _id: userid },
            { $set: updatedFields },
            { new: true } // To return the updated document
          );
    
          if (!updatedUser) {
            return { status: false, message: "User not found" };
          }
    
          console.log("Updated User:", updatedUser);
    
          // Return success status with updated user data
          return { status: true, data: updatedUser };
        } catch (error) {
          console.error("Error in updateUserData function:", error);
          // Return failure status with error message
          return { status: false, message: "An error occurred while updating user data" };
        }
      }
  };