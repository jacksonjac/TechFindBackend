import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const AllQuestions = (dependencies: any) => {
  console.log("allQuestion business funtions");
  const { getAllQuestionRepo } = dependencies.repositery;

  const executeFunction = async () => {
    try {
      // Fetch user data
      const responseFromUserList = await getAllQuestionRepo.PostExit();

      // Debugging: Log the fetched user data
      console.log("Fetched questionData data:", responseFromUserList);

      if (responseFromUserList.status === true) {
        const TechData = responseFromUserList.data;

        // Return success response with user data
        return {
          status: true,
          message: "Tech list fetched successfully",
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
