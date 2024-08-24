import { Request, Response } from "express";

export default (dependecies: any) => {
  const LoginNewUserController = async (req: Request, res: Response) => {
    const { loginNewUser } = dependecies.useCase;

    const { email, password } = req.body;

    const data = { email, password };

    console.log("login controller", data);

    const response = await loginNewUser(dependecies).executeFunction(data);

    if (response.status) {
      console.log("AccessToken:", response.AcessToken);
      

      res.cookie('accessToken', response.AcessToken, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        
      });

     

      res.send(response);
    } else {
      res.status(401).send(response);
    }
  };
  return LoginNewUserController;
};
