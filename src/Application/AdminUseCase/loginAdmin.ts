import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const loginNewAdmin = (dependencies: any) => {
    const { logAdminRepo } = dependencies.repositery; // Retained 'repositery' as per your original spelling

    const executeFunction = async (data: any) => {
        const { email, password } = data;

        // Fetch user data based on email
        const responseFromLoginNewUser = await logAdminRepo.PostExit({ email });

        // Debugging: Log the fetched user data
        console.log("Fetched tech data:", responseFromLoginNewUser);

        if (responseFromLoginNewUser.status === true) {
            const userData = responseFromLoginNewUser.Data;
            const storedPassword = userData.password; // Changed variable name from 'hashedPassword' to 'storedPassword'
            console.log("Stored password from DB:", storedPassword);
            console.log("User-provided password:", password);

            if (storedPassword) {
                // Directly check if the provided password matches the stored password
                const passwordMatch = storedPassword === password; // Direct comparison

                // Debugging: Log the result of password comparison
                console.log("Password match result:", passwordMatch);

                if (passwordMatch) {

                    const generatetoken = "admintoken122334"
                    // Passwords match
                    return {
                        message: "Login successful",
                        data: userData,
                        token:generatetoken,
                        status: true // Include the JWT token in the response
                    };
                } else {
                    // Passwords do not match
                    return {
                        status: false,
                        message: "Login failed: Invalid password",
                        data: null,
                    };
                }
            } else {
                // No stored password found
                return {
                    status: false,
                    message: "Login failed: No stored password found",
                    data: null,
                };
            }
        } else {
            // User not found
            return {
                status: false,
                message: "Login failed: User not found",
                data: null
            };
        }
    };

    return { executeFunction };
};