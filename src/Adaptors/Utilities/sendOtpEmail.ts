
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()
 
const Password = process.env.APP_PASS

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'jacksonjack333r@gmail.com',
      pass: Password
    },
  });
const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
      from: 'jacksonjack333r@gmail.com',
      to: email,
      subject: 'FindTech OTP for verification',
      text: `Your OTP is ${otp}`
     
    };

    try {
      console.log("Sending email to:", email);
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  export{
    sendOtpEmail

  }