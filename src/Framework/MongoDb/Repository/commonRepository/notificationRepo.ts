import mongoose from 'mongoose';
import { Notification } from '../../Database'; // Adjust the path to your Notification model
import { Technican } from '../../Database'; // Adjust the path to your Technician model

export default {
  PostExit: async (NotificationData: any) => {
    console.log("Inside PostExit function for notification store:", NotificationData);

    try {
      const { technicianId, content, userid, date } = NotificationData;

      // Check if a notification from the same sender to the same receiver already exists
      const existingNotification = await Notification.findOne({
        senderid: userid,
        receiverId:technicianId
       
      });

      if (existingNotification) {
        return { status: false, message: "Already liked", data: null };
      }

      // Find the technician using the technicianId
      const technician = await Technican.findById(technicianId);

      if (!technician) {
        return { status: false, message: "Technician not found", data: null };
      }

      // Increment the technician's like count
      technician.Likes = (technician.Likes || 0) + 1;

      // Save the updated technician document
      await technician.save();

      // Create a new notification document
      const newNotification = new Notification({
        senderid: userid,
        receiverId: technicianId,
        content: content,
        date: date,
        seen: false
      });

      // Save the notification document
      await newNotification.save();

      // Return success status with the created notification data
      return { status: true, data: newNotification };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      // Return failure status with error message
      return { status: false, message: "An error occurred", data: null };
    }
  }
};
