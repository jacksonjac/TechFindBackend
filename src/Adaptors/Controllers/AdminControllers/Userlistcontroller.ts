import { Request, Response } from "express";

export default (dependecies: any) => {
  const UserlistController = async (req: Request, res: Response) => {
    const { Adminuserlist} = dependecies.useCase;

   

    const responce = await Adminuserlist(dependecies).executeFunction();

    res.send(responce);
  };

  return UserlistController;
};