import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const AddQuestion = (dependencies: any) => {
    console.log("add Desingation function")
    const { AddQuestionRepo } = dependencies.repositery; // Retained 'repositery' as per your original spelling

    const executeFunction = async (data:any) => {
       
         console.log("newquestion data form addd question",data)
        // Fetch user data based on designation
        const responseFromLoginNewUser = await AddQuestionRepo.PostExit(data);

        // Debugging: Log the fetched user data
        console.log("Fetched tech data:", responseFromLoginNewUser);

        if (responseFromLoginNewUser.status === true) {
            return {
                status: true,
                message: "Successfully added",
            };
        } else {
            // Designation not added
            return {
                status: false,
                message: "Adding designation failed",
            };
        }
    };

    return { executeFunction };
};