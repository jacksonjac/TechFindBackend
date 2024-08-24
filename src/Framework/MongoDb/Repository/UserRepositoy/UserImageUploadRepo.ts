import mongoose from 'mongoose';
import { User } from '../../Database'; // Adjust the path to your Admin model

export default {
  PostExit: async (data: { file: Express.Multer.File, techId: string }) => {
    const { techId, file } = data;

    // Assuming the image URL is derived from the file name or path
     console.log("techid and file name",file,"s---",techId)

    try {
      // Find the user by techId and update the imageUrl field
      const updatedUser = await User.findOneAndUpdate(
        { _id: techId },
        { $set: { image: file.path } },
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