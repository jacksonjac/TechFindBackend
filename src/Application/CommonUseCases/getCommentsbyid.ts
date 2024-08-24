import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const GetAllCommentsbyTechid = (dependencies: any) => {
  console.log("Initializing GetCommentsByTechnicianId use case");

  const { getCommetsbyidRepo } = dependencies.repositery;

  const executeFunction = async (technicianId: string) => {
    try {
      // Fetch comments data from the repository
      const responseFromRepo = await getCommetsbyidRepo.PostExit(technicianId);

      // Debugging: Log the fetched comments data
      console.log("Fetched comments data:", responseFromRepo);

      if (responseFromRepo.status) {
        const commentsData = responseFromRepo.data;
        const averageRating = responseFromRepo.averageRating;
        const commentCount = responseFromRepo.commentCount;

        // Return success response with comments data
        return {
          status: true,
          message: "Comments fetched successfully",
          data: commentsData,
          averageRating,
          commentCount
        };
      } else {
        // Handle case where fetching comments data was not successful
        return {
          status: false,
          message: responseFromRepo.message || "Failed to fetch comments",
          data: null,
        };
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error fetching comments:", error);
      return {
        status: false,
        message: "An error occurred while fetching comments",
        data: null,
      };
    }
  };


  return { executeFunction };
};
