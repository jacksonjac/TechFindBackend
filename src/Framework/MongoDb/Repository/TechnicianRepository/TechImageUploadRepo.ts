import mongoose from 'mongoose';
import { Technican } from '../../Database'; // Adjust the path to your Admin model

export default {
  PostExit: async (data: { imageFile: Express.Multer.File, techId: string }) => {

    console.log(data,"this is post exti")
    const { techId, imageFile } = data;

    // Assuming the image URL is derived from the file name or path
   

    try {
      // Find the user by techId and update the imageUrl field
      const updatedUser = await Technican.findOneAndUpdate(
        { _id: techId },
        { $set: { image: imageFile.path } },
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