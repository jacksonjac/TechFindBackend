import { Request, Response } from "express";

export default (dependecies: any) => {
  const getTechByidController = async (req: Request, res: Response) => {

            console.log("getUserbyid Controller")
    const { getTechById} = dependecies.useCase;
    const DesId = req.query.id;

   
 console.log("desi id",DesId)
    const responce = await getTechById(dependecies).executeFunction(DesId);

    res.send(responce);
  };

  return getTechByidController;
};