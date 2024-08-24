import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const MessageHandler = (dependencies: any) => {

    console.log("this is message handler funtions")
    const { chatRepo } = dependencies.repositery;
    const executeFunction = async (data: any) => {
        try {
         console.log(data)
            const responseFromUserList = await chatRepo.PostExit(data);
                  
           
              if(responseFromUserList.status){
                return {
                    status: true,
                    message: "User Chat stored  successfully",
                    data: responseFromUserList.data
                   
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