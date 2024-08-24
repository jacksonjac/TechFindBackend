import nodemailer, { Transporter } from "nodemailer";
import { generateOTP } from "../../Adaptors/Utilities/Otp-GenerateFn";
import { sendOtpEmail } from "../../Adaptors/Utilities/sendOtpEmail";

export const RegisterNewTech = (dependencies: any) => {

    console.log("application new tech register")
  const {
    repositery: { RegisterNewTechRepo },
  } = dependencies;

  const executeFunction = async (data: any) => {


    console.log(data,"data in application")

    
    const responceFromRegisterNewUser = await RegisterNewTechRepo.postExist(
      data
    );

    if (responceFromRegisterNewUser.status === true) {
      const email: string = responceFromRegisterNewUser.data?.email;
      const Techid: string = responceFromRegisterNewUser.data?._id;

      if (!email) {
        console.error("Email is undefined or null.");
        return {
          message: "Failed to extract email",
          Data: responceFromRegisterNewUser,
        };
      }

      const otp: string = generateOTP();
      await sendOtpEmail(email, otp);


     
      return {
        message: "OTP sent to email",
        Data: responceFromRegisterNewUser,
        OTP:otp,
        token:"jacksontoken",
        id:Techid
      };
    }

    return {
      message: responceFromRegisterNewUser.status,
      Data: responceFromRegisterNewUser,
    };
  };

  return { executeFunction };
};
