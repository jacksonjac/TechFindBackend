import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default (dependencies: any) => {
  const RegisterNewUserController = async (req: Request, res: Response) => {
    const { RegisterNewUser } = dependencies.useCase;
    const { name, email, phone, district, password } = req.body;

    try {
      // Hash the password before passing it to the executeFunction
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const data = {
        name,
        email,
        phone,
        district,
        password: hashedPassword,
        
      };

      const response = await RegisterNewUser(dependencies).executeFunction(
        data
      );
      res.cookie('accessToken', response.AcessToken, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        
      });
      res.send(response);
    } catch (error) {
      res.status(500).send({ message: "Error registering new user", error });
    }
  };

  return RegisterNewUserController;
};
