import { Request, Response } from "express";

export default (dependecies: any) => {
  const getDesignationController = async (req: Request, res: Response) => {

    
    const { AllDesignation} = dependecies.useCase;

   

    const responce = await AllDesignation(dependecies).executeFunction();

    res.send(responce);
  };

  return getDesignationController;
};