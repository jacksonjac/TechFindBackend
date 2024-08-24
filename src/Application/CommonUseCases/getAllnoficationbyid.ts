import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const GetAllNotibyTechid = (dependencies: any) => {
    console.log("Initializing GetAllNotificationsByTechId use case");

    const { getNotificationbyidRepo } = dependencies.repositery;
  
    const executeFunction = async (technicianId:any) => {
      try {
        // Fetch notifications data from the repository
        const responseFromRepo = await getNotificationbyidRepo.PostExit(technicianId);
  
        // Debugging: Log the fetched notifications data
        console.log("Fetched Notification data:", responseFromRepo);
  
        if (responseFromRepo.status) {
          const notificationsData = responseFromRepo.data;
          const notificationCount = responseFromRepo.notificationCount;
  
          // Return success response with notifications data
          return {
            status: true,
            message: "Notifications fetched successfully",
            data: notificationsData,
            
          };
        } else {
          // Handle case where fetching notifications data was not successful
          return {
            status: false,
            message: responseFromRepo.message || "Failed to fetch notifications",
            data: null,
          };
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error fetching notifications:", error);
        return {
          status: false,
          message: "An error occurred while fetching notifications",
          data: null,
        };
      }
    };
  

  return { executeFunction };
};
