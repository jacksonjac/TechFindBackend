import mongoose from 'mongoose';
import { Technican } from '../../Database'; // Adjust the path to your Technician model
import { Notification } from '../../Database'; // Adjust the path to your Notification model

export default {
  PostExit: async (TechId: string) => {
    console.log("Inside PostExit function with TechId:", TechId);

    try {
      // Find the technician by TechId
      const technician = await Technican.findOne({ _id: TechId }).populate('designation');

      if (!technician) {
        return { status: false, message: "Technician not found" };
      }

      console.log("Found Technician data", technician);

      // Count the notifications where receiverId matches TechId and seen is true
      const notificationCount = await Notification.countDocuments({
        receiverId: TechId,
        seen: false
      });

      console.log("Seen Notification Count:", notificationCount);

      // Return success status with found technician data and notification count
      return {
        status: true,
        data: {
          technician,
          notificationCount
        }
      };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      // Return failure status with error message
      return { status: false, message: "An error occurred" };
    }
  }
};
