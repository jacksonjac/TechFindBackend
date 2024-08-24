import { Request, Response } from "express";

export default (dependecies: any) => {
  const getSlotsController = async (req: Request, res: Response) => {

    const TechId = req.query.id;
    const { AllSlots} = dependecies.useCase;

   

    const responce = await AllSlots(dependecies).executeFunction(TechId);

    res.send(responce);
  };

  return getSlotsController;
};