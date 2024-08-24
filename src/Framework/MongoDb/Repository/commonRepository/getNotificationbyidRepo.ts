import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Admin model
import { User } from '../../Database';
import { Comment } from '../../Database';
import { Notification } from '../../Database';
import { Technican } from '../../Database';

export default {
    PostExit: async (techId:any) => {
        console.log("Fetching notifications for technician:", techId);

        try {
            // Find all notification documents for the specified technician ID
            const notifications = await Notification.find({ receiverId: techId,seen:false});

            // If no notifications found, return the response
            if (notifications.length === 0) {
                return {
                    status: false,
                    message: "No notifications found for the technician",
                    data: [],
                    notificationCount: 0
                };
            }

            // Prepare to fetch sender details
            const notificationsWithSenderDetails = await Promise.all(
                notifications.map(async (notification) => {
                    let senderDetails = null;

                    // Determine if senderId is a user or technician and fetch details
                    if (notification.senderid) {
                        // Check if sender is a user
                        senderDetails = await User.findById(notification.senderid).exec();
                        if (!senderDetails) {
                            // If not found in User collection, check Technician collection
                            senderDetails = await Technican.findById(notification.senderid).exec();
                        }
                    }

                    // Attach sender details to the notification
                    return {
                        ...notification.toObject(),
                        sender: senderDetails || {} // Attach empty object if sender not found
                    };
                })
            );

            // Count the number of notifications
            const notificationCount = notifications.length;

            return {
                status: true,
                message: "Notifications fetched successfully",
                data: notificationsWithSenderDetails,
                notificationCount
            };
        } catch (error) {
            console.error("Error in PostExit function:", error);
            return {
                status: false,
                message: "An error occurred while fetching notifications",
                data: [],
                notificationCount: 0
            };
        }
    }
  };