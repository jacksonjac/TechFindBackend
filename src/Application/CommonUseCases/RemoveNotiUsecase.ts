import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const RemoveNotification = (dependencies: any) => {
    const { removenotiRepo } = dependencies.repositery;

    const executeFunction = async (NotiId: string) => {
        try {
            // Call the repository function to delete the notification
            const responseFromRepo = await removenotiRepo.PostExit(NotiId);

            // Check if the notification was successfully deleted
            if (responseFromRepo.status) {
                console.log("Notification deleted successfully:", responseFromRepo.data);

                // Return success status
                return {
                    status: true,
                    message: "Notification deleted successfully",
                    data: responseFromRepo.data
                };
            } else {
                // If the notification was not found or not deleted
                return {
                    status: false,
                    message: "Failed to delete notification",
                    data: null
                };
            }

        } catch (error) {
            // Handle any unexpected errors
            console.error("Error deleting notification:", error);
            return {
                status: false,
                message: "An error occurred while deleting the notification",
                data: null
            };
        }
    };

    return { executeFunction };
};