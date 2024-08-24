import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const AllMeetingLists = (dependencies: any) => {
  console.log("slots get alll funtions");
  const { getAllMeetingsRepo } = dependencies.repositery;

  const executeFunction = async () => {
    try {
      // Fetch meeting data
      const responseFromMeetingList = await getAllMeetingsRepo.PostExit(); // Updated method name to getAllMeetings

      // Debugging: Log the fetched meeting data
      console.log("Fetched meeting data:", responseFromMeetingList);

      if (responseFromMeetingList.status === true) {
        const meetingData = responseFromMeetingList.data;

        // Return success response with meeting data
        return {
          status: true,
          message: "Meeting list fetched successfully",
          data: meetingData,
        };
      } else {
        // Handle case where fetching meeting data was not successful
        return {
          status: false,
          message: "Failed to fetch meeting list",
          data: null,
        };
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error fetching meeting list:", error);
      return {
        status: false,
        message: "An error occurred while fetching the meeting list",
        data: null,
      };
    }
  };


  return { executeFunction };
};
