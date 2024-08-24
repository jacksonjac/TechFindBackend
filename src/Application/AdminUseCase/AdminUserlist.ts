import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const Adminuserlist = (dependencies: any) => {
    const { AdUserlistRepo } = dependencies.repositery;

    const executeFunction = async () => {
        try {
            // Fetch user data
            const responseFromUserList = await AdUserlistRepo.PostExit();

            // Debugging: Log the fetched user data
            console.log("Fetched user data:", responseFromUserList);

            if (responseFromUserList.status === true) {
                const userData = responseFromUserList.Data;

                // Return success response with user data
                return {
                    status: true,
                    message: "User list fetched successfully",
                    data: userData
                };
            } else {
                // Handle case where fetching user data was not successful
                return {
                    status: false,
                    message: "Failed to fetch user list",
                    data: null
                };
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error fetching user list:", error);
            return {
                status: false,
                message: "An error occurred while fetching user list",
                data: null
            };
        }
    };

    return { executeFunction };
};