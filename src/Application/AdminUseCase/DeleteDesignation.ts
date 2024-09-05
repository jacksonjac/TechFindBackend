import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const DeleteDesignation = (dependencies: any) => {

    console.log("reached Delet des use case")
    const { DeleteDesiRepo} = dependencies.repositery;

    const executeFunction = async (Desiid: any) => {
        try {
            // Fetch user data

            console.log("fksjdlksjdf data deletdesi",Desiid)
            const responseFromUserList = await DeleteDesiRepo.PostExit(Desiid);

            // Debugging: Log the fetched user data
            console.log("Fetched user data:", responseFromUserList);

            // Return the fetched user data
            return {
                status: true,
                message: responseFromUserList.message,
                data: responseFromUserList
            };

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