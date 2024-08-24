import { Request, Response } from "express";

export default (dependecies: any) => {
  const LoginNewTechController = async (req: Request, res: Response) => {
    const { loginNewTech } = dependecies.useCase;

    const { email, password } = req.body;

    const data = {
      email,
      password,
    };

    const responce = await loginNewTech(dependecies).executeFunction(data);

    res.send(responce);
  };

  return LoginNewTechController;
};
