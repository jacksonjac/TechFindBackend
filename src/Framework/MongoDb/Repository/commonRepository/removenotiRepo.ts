import mongoose from 'mongoose';
import { Notification } from '../../Database'; // Adjust the path to your Notification model

export default {
    PostExit: async (NotificationId: string) => {
        console.log("Inside PostExit function with NotificationId:", NotificationId);

        try {
            // Find the notification by NotificationId and update the 'seen' field to true
            const updatedNotification = await Notification.findOneAndUpdate(
                { _id: NotificationId },
                { $set: { seen: true } },
                { new: true } // Return the updated document
            );

            if (!updatedNotification) {
                return { status: false, message: "Notification not found" };
            }

            console.log("Updated Notification:", updatedNotification);

            // Return success status with updated notification data
            return { status: true, data: updatedNotification };
        } catch (error) {
            console.error("Error in PostExit function:", error);
            // Return failure status with error message
            return { status: false, message: "An error occurred" };
        }
    }
};
