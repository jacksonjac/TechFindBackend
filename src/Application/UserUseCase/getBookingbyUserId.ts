import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const getBookingsbyUserId = (dependencies: any) => {
  console.log("bookins get alll by id  funtions");
  const { getBookingsbyUseridRepo } = dependencies.repositery;

  const executeFunction = async (userId: any) => {
    try {
      // Fetch slot data
      const responseFromSlotData = await getBookingsbyUseridRepo.PostExit(userId);

      // Debugging: Log the fetched slot data
      console.log("Fetched Slot data:", responseFromSlotData);

      if (responseFromSlotData.status === true) {
        const slotData = responseFromSlotData.data;

        // Debugging: Log the combined data
        console.log("Fetched data:", slotData);

        // Return success response with combined data
        return {
          status: true,
          message: "Slot data fetched successfully",
          data: slotData,
        };
      } else {
        // Handle case where fetching slot data was not successful
        return {
          status: false,
          message: "Failed to fetch slot data",
          data: null,
        };
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error fetching slot data:", error);
      return {
        status: false,
        message: "An error occurred while fetching slot data",
        data: null,
      };
    }
  };

  return { executeFunction };
};
