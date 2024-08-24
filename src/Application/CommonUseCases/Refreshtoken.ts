import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const secretKey = "your-256-bit-secret";



export const RefreshToken = (dependencies: any) => {
   
    const executeFunction = async () => {
        try {
            // Generate a new access token
            const accessToken = jwt.sign(
                {
                    sub: 'refreshtoken',
                    name: 'jacksonR', // Add more claims if needed
                },
                secretKey,
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            // Return the new token
            return {
                status: true,
                message: "Token generated successfully",
                data: accessToken 
            };

        } catch (error) {
            // Handle any unexpected errors
            console.error("Error generating access token:", error);
            return {
                status: false,
                message: "An error occurred while generating the token",
                data: null
            };
        }
    };

    return { executeFunction };
};