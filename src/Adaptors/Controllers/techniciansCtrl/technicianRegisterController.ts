import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default (dependencies: any) => {
  const RegisterNewTechController = async (req: Request, res: Response) => {
    console.log("Tech register controller initiated");

    const { RegisterNewTech } = dependencies.useCase;
    const {
      name,
      email,
      phone,
      district,
      workexp,
      worklevel,
      designation,    // Note the casing
      AadarNo,        // Note the casing
      PanNo,          // Note the casing
      serviceCharge,
      password
    } = req.body;

    console.log("Request body:", req.body);

    try {
      // Hash the password before passing it to the executeFunction
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const data = {
        name,
        email,
        phone,
        district,
        workexp,
        worklevel,
        designation: designation,  // Use correct casing here
        aadarNo: AadarNo,          // Use correct casing here
        panNo: PanNo,              // Use correct casing here
        serviceCharge,
        password: hashedPassword, // Use the hashed password
      };

      console.log("Data to be saved:", data);

      const response = await RegisterNewTech(dependencies).executeFunction(data);

      console.log("Response from use case:", response);

      res.send(response);
    } catch (error) {
      console.error("Error registering new user:", error);
      res.status(500).send({ message: "Error registering new user", error });
    }
  };

  return RegisterNewTechController;
};