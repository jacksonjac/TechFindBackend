import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const AllSlots = (dependencies: any) => {
  console.log("slots get alll funtions");
  const { getSlotsRepo } = dependencies.repositery;

  const executeFunction = async (techid:any) => {
    try {
      // Fetch user data
      const responseFromUserList = await getSlotsRepo.PostExit(techid);

      // Debugging: Log the fetched user data
      console.log("Fetched Designation data:", responseFromUserList);

      if (responseFromUserList.status === true) {
        const TechData = responseFromUserList.Data;

        // Return success response with user data
        return {
          status: true,
          message: "Slot list fetched successfully",
          data: TechData,
        };
      } else {
        // Handle case where fetching user data was not successful
        return {
          status: false,
          message: "Failed to fetch user list",
          data: null,
        };
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error fetching user list:", error);
      return {
        status: false,
        message: "An error occurred while fetching user list",
        data: null,
      };
    }
  };

  return { executeFunction };
};
