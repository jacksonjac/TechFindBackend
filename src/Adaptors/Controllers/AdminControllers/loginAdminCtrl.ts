import { Request, Response } from "express";

export default (dependecies: any) => {
  const LoginAdminController = async (req: Request, res: Response) => {
    const { loginNewAdmin } = dependecies.useCase;

    const { email, password } = req.body;

    const data = {
      email,
      password,
    };

    const responce = await loginNewAdmin(dependecies).executeFunction(data);

    res.send(responce);
  };

  return LoginAdminController;
};
