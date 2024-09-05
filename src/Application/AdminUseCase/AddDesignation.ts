import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const AddDesignation = (dependencies: any) => {
    const {AddDesignationRepo } = dependencies.repositery; // Ensure 'repository' spelling is correct
       
    const executeFunction = async (designation: string) => {
        try {

            console.log("addDesignation usecase ",designation)
            // Call the repository method to add the designation
            const response = await AddDesignationRepo.PostExit(designation);
            
            if (response.status) {
                return {
                    status: true,
                    message: response.message,
                };
            } else {
                return {
                    status: false,
                    message: response.message,
                };
            }
        } catch (error) {
            console.error("Error adding designation:", error);
            return {
                status: false,
                message: "An error occurred while adding designation",
            };
        }
    };

    return { executeFunction };
};