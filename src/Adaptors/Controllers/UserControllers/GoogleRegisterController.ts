import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default (dependencies: any) => {
  const  GoogleRegisterController = async (req: Request, res: Response) => {
    const { GoogleRegister } = dependencies.useCase;
    const { name, email, phone, district, password } = req.body;

     

    try {
      // Hash the password before passing it to the executeFunction
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const data = {
        name,
        email,
        phone,
        district,
        password: hashedPassword, // Use the hashed password
      };
      console.log(data,"data from Google register")
      const response = await GoogleRegister(dependencies).executeFunction(
        data
      );

      res.send(response);
    } catch (error) {
      res.status(500).send({ message: "Error registering new user", error });
    }
  };

  return GoogleRegisterController;
};
