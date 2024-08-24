import nodemailer, { Transporter } from "nodemailer";
import { generateOTP } from "../../Adaptors/Utilities/Otp-GenerateFn";
import { sendOtpEmail } from "../../Adaptors/Utilities/sendOtpEmail";

export const AddNewAddress = (dependencies: any) => {

    console.log("sfklsdfslkdf add new addresss")
    const {Addnew_Address_SlotRepo  } = dependencies.repositery;
      const executeFunction = async (data: any) => {
        try {

            console.log("before call post exist in AddnewAddress" ,data)
          const responseFromAddNewAddressSlot = await Addnew_Address_SlotRepo.postExist(data);
    
          console.log("Response from AddNewAddressSlotRepo:", responseFromAddNewAddressSlot);
    
          if (responseFromAddNewAddressSlot.status) {
            return {
              status: true,
              message: "Address and slot updated successfully",
              data: responseFromAddNewAddressSlot.data,
            };
          } else {
            return {
              status: false,
              message: responseFromAddNewAddressSlot.message || "Operation failed",
              data: responseFromAddNewAddressSlot,
            };
          }
        } catch (error) {
          console.error("Error in executeFunction:", error);
          return {
            status: false,
            message: "An error occurred during the process",
            error: error,
          };
        }
      };
    
      return { executeFunction };
};