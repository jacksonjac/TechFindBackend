import { RegisterNewUserRepo } from "../../Framework/MongoDb/Repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const secretKey = "your-256-bit-secret";


export const UserAddnewSlot = (dependencies: any) => {
  const { UserAddnewSlotRepo } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
      // Fetch user data based on email
      const responseFromSlotAdd = await UserAddnewSlotRepo.postExist(data);
    console.log(responseFromSlotAdd,"userAddnewslot mani funtion ")
      if (responseFromSlotAdd.status) {
        return {
          status: true,
          message: "Slot added to user successfully",
          technician: responseFromSlotAdd.technician,
        };
      } else {
        return {
          status: false,
          message: responseFromSlotAdd.message,
        };
      }
    } catch (error) {
      console.error("Error in UserAddnewSlot:", error);
      return {
        status: false,
        message: "An error occurred while adding slot to user",
        error: error,
      };
    }
  };

  return { executeFunction };
};