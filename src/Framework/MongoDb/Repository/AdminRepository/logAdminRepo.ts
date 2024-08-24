import mongoose from 'mongoose';
import { Admin } from '../../Database'; // Adjust the path to your Admin model
import bcrypt from 'bcrypt';

export default {
    PostExit: async (data: any) => {
        console.log("Inside PostExit function login");

        try {
            const loginUser = await Admin.findOne({ email: data.email });
            console.log(loginUser, "Admin found");

            if (loginUser) {
                return { status: true, Data: loginUser };
            } 
        } catch (error) {
            console.error("Error in PostExit function:", error);
            return { status: false, message: "An error occurred" };
        }
    }
};