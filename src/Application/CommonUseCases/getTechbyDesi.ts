import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const getTechById = (dependencies: any) => {
  console.log("techli by id business funtions");
  const { getTechbyIdRepo } = dependencies.repositery;

  const executeFunction = async (DesiId:any) => {
    try {
      // Fetch user data
      const responseFromUserList = await getTechbyIdRepo.PostExit(DesiId);

      // Debugging: Log the fetched user data
      console.log("Fetched Designation id data:", responseFromUserList);

      if (responseFromUserList.status === true) {
        const TechData = responseFromUserList.data;

        // Return success response with user data
        return {
          status: true,
          message: "Tech list fetched by id successfully",
          data: TechData,
        };
      } else {
        // Handle case where fetching user data was not successful
        return {
          status: false,
          message: "Failed to fetch user list",
          
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
