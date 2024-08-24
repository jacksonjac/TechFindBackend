import { generateOTP } from "../../Adaptors/Utilities/Otp-GenerateFn";
import { sendOtpEmail } from "../../Adaptors/Utilities/sendOtpEmail";

export const GoogleRegister = (dependencies: any) => {
    console.log("registernewuser page");
  
    const {
      repositery: { googlenewUserRepo },
    } = dependencies;
  
    console.log("after repository");
  
    const executeFunction = async (data: any) => {
      try {
        // Log the data before calling postExist
        console.log("Data before postExist:", data);
  
        const responseFromRegisterNewUser = await googlenewUserRepo.postExist(data);
  
        // Log the response from postExist
        console.log("Response from RegisterNewUserRepo.postExist:", responseFromRegisterNewUser);
  
        if (responseFromRegisterNewUser.status === true) {
          const email: string = responseFromRegisterNewUser.Data?.email;
  
          if (!email) {
            console.error("Email is undefined or null.");
            return {
              status: true, // Still returning true but with a failure message
              message: "Failed to extract email",
              Data: responseFromRegisterNewUser,
              token: "jacksontoken",
            };
          }
  
          return {
            status: true,
            message: "User registered successfully. OTP sent to email.",
            Data: responseFromRegisterNewUser,
            token: "jacksontoken",
          };
        } else if (responseFromRegisterNewUser.message === "Email already exists") {
          return {
            status: true,
            message: "Email already exists. User data updated successfully.",
            Data: responseFromRegisterNewUser.Data,
            token: "jacksontoken",
          };
        }
  
        return {
          status: false,
          message: responseFromRegisterNewUser.message || "Registration failed",
          Data: responseFromRegisterNewUser,
        };
      } catch (error) {
        console.error("Error during registration:", error);
        return {
          status: false,
          message: "An error occurred during registration.",
          error: error,
        };
      }
    };
  
    return { executeFunction };
  };
  