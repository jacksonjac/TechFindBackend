import mongoose from 'mongoose';
import { Notification } from '../../Database'; // Adjust the path to your Notification model
import { Technican } from '../../Database'; // Adjust the path to your Technician model

export default {
  PostExit: async (NotificationData: any) => {
    console.log("Inside PostExit function for notification store:", NotificationData);

    try {
      const { senderid, content, receiverId, date } = NotificationData;

      // Check if a notification from the same sender to the same receiver already exists
      const existingNotification = await Notification.findOne({
        senderid: senderid,
        receiverId:receiverId
       
      });

      if (existingNotification) {
        return { status: false, message: "Already liked", data: null };
      }

      // Find the technician using the technicianId
      

      // Increment the technician's like count
     
      // Create a new notification document
      const newNotification = new Notification({
        senderid: senderid,
        receiverId: receiverId,
        content: content,
        date: date,
        seen: false
      });

      // Save the notification document
      await newNotification.save();
      const totalNotificationCount = await Notification.countDocuments({ receiverId: receiverId });
      // Return success status with the created notification data
      return { status: true, count: totalNotificationCount };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      // Return failure status with error message
      return { status: false, message: "An error occurred", data: null };
    }
  }
};
