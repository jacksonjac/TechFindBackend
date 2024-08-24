import nodemailer, { Transporter } from "nodemailer";
import { generateOTP } from "../../Adaptors/Utilities/Otp-GenerateFn";
import { sendOtpEmail } from "../../Adaptors/Utilities/sendOtpEmail";

export const AddNewComment = (dependencies: any) => {

    console.log("Initializing AddNewComment business logic");

    const { addNewCommetRepo } = dependencies.repositery; // Ensure this is the correct repository for comments

    const executeFunction = async (data: any) => {
        try {
            console.log("Data before calling addNewCommentRepo:", data);

            // Call the repository method to add the new comment
            const responseFromAddNewComment = await addNewCommetRepo.postExist(data);

            console.log("Response from addNewCommentRepo:", responseFromAddNewComment);

            if (responseFromAddNewComment.status) {
                return {
                    status: true,
                    message: "Comment added successfully",
                    data: responseFromAddNewComment.data,
                };
            } else {
                return {
                    status: false,
                    message: responseFromAddNewComment.message || "Failed to add comment",
                    data: responseFromAddNewComment,
                };
            }
        } catch (error) {
            console.error("Error in executeFunction:", error);
            return {
                status: false,
                message: "An error occurred while adding the comment",
                error: error,
            };
        }
    };
    
      return { executeFunction };
};