import { Request, Response } from "express";

export default (dependecies: any) => {
  const getUserByidController = async (req: Request, res: Response) => {

            console.log("getQuestionByid Controller")
    const { getUserById} = dependecies.useCase;
    const DesId = req.query.id;

   
 console.log("desi id",DesId)
    const responce = await getUserById(dependecies).executeFunction(DesId);

    res.send(responce);
  };

  return getUserByidController;
};