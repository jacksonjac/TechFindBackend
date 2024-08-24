import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const getSlotDatabyId = (dependencies: any) => {
  console.log("slots get alll by id  funtions");
  const { getSlotsDatabyIdRepo } = dependencies.repositery;

  const executeFunction = async (slotId: any) => {
    try {
      // Fetch slot data
      const responseFromSlotData = await getSlotsDatabyIdRepo.PostExit(slotId);

      // Debugging: Log the fetched slot data
      console.log("Fetched Slot data:", responseFromSlotData);

      if (responseFromSlotData.status === true) {
        const slotData = responseFromSlotData.data;

        // Debugging: Log separated data
        console.log("Technician data:", slotData.technician);
        console.log("Address data:", slotData.address);
        console.log("Slot data:", slotData.slot);

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
