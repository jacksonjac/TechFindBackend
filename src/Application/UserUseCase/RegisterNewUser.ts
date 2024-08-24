import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
const secretKey = "your-256-bit-secret";

import { sendOtpEmail } from '../../Adaptors/Utilities/sendOtpEmail';
const appPass = process.env.APP_PASS;
console.log('App Password:', appPass);
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'jacksonjack333r@gmail.com',
    pass: 'ispi oava uktt atrg',
  },
});

const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};



export const RegisterNewUser = (dependencies: any) => {
  const { RegisterNewUserRepo } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
      const responseFromRegisterNewUser = await RegisterNewUserRepo.postExist(data);

      console.log("Response from RegisterNewUserRepo:", responseFromRegisterNewUser);

      if (responseFromRegisterNewUser.status === true) {
        const email: string = responseFromRegisterNewUser.data?.email;
        const userId: string = responseFromRegisterNewUser.data?._id;

        if (!email) {
          console.error("Email is undefined or null.");
          return {
            status: false,
            message: "Failed to extract email",
            Data: responseFromRegisterNewUser,
          };
        }

        const otp: string = generateOTP();
        await sendOtpEmail(email, otp);

        const AcessToken = jwt.sign(
          {
            sub: 'accesstoken', 
            name: 'jacksonr', // You can add more claims as needed
          },
          secretKey,
          { expiresIn: "1h" } // Token expires in 1 hour
        );
       


    console.log('otp ',otp)
        console.log("userId", userId);

        return {
          status: true,
          message: "OTP sent to email",
          Data: responseFromRegisterNewUser,
          OTP: otp,
          AcessToken,
          id: userId
        };
      }

      return {
        status: false,
        message: responseFromRegisterNewUser.message || "Registration failed",
        Data: responseFromRegisterNewUser,
      };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return {
        status: false,
        message: "An error occurred during registration",
        error: error
      };
    }
  };

  return { executeFunction };
};


