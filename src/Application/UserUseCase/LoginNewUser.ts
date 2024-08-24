import { RegisterNewUserRepo } from "../../Framework/MongoDb/Repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET || 'Jwtsecreatkey';


export const loginNewUser = (dependencies: any) => {
  const { loginNewUserRepo } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    const { email, password } = data;

    try {
      // Fetch user data based on email
      const responseFromLoginNewUser = await loginNewUserRepo.postExist({
        email,
      });

      // Debugging: Log the fetched user data
      console.log("Fetched user data:", responseFromLoginNewUser);

      if (responseFromLoginNewUser.status === true && responseFromLoginNewUser.data) {
        const userData = responseFromLoginNewUser.data;

        if (responseFromLoginNewUser.google === true) {
          // User authenticated with Google
          return {
            status: false,
            message: "Login failed: User authenticated with Google",
            data: null,
          };
        }

        const hashedPassword = userData.password;

        if (hashedPassword) {
          // Check if the provided password matches the hashed password
          const passwordMatch = await bcrypt.compare(password, hashedPassword);

          // Debugging: Log the result of password comparison
          console.log("Password match:", passwordMatch);

          if (passwordMatch) {
            // Passwords match, generate a JWT token
            const AcessToken = jwt.sign(
              {
                sub: userData._id, 
                name: userData.name, // You can add more claims as needed
              },
              secretKey,
              { expiresIn: "1h" } // Token expires in 1 hour
            );
           


            return {
              status: true,
              message: "Login successful",
              data: userData,
              AcessToken,
             


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
          // No hashed password found
          return {
            status: false,
            message: "Login failed: No hashed password found",
            data: null,
          };
        }
      } else {
        // User not found or some other failure reason
        return {
          status: responseFromLoginNewUser.status,
          message: responseFromLoginNewUser.message,
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return {
        status: false,
        message: "An error occurred during login",
        error: error,
      };
    }
  };

  return { executeFunction };
};