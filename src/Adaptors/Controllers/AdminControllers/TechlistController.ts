import { Request, Response } from "express";

export default (dependecies: any) => {
  const TechlistController = async (req: Request, res: Response) => {

  
    const { AdminTechlist} = dependecies.useCase;

   

    const responce = await AdminTechlist(dependecies).executeFunction();

    res.send(responce);
  };

  return TechlistController;
};