import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const NotificationHandler = (dependencies: any) => {

    console.log("this is Notification handler funtions")
    const { notificationRepo } = dependencies.repositery;
    const executeFunction = async (data: any) => {
        try {
         console.log(data)
            const responseFromUserList = await notificationRepo.PostExit(data);
                  
           
              if(responseFromUserList.status){
                return {
                    status: true,
                    message: "User liked  successfully",
                    data: responseFromUserList.data
                   
                };

              }else{
                return {
                    status:false,
                    message:"User alredy liked ",
                    data:null
                }
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