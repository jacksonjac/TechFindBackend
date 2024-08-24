import { Request, Response } from "express";

export default (dependecies: any) => {
  const getQuestionByidController = async (req: Request, res: Response) => {

            console.log("getQuestionByid Controller")
    const { getQuestionById} = dependecies.useCase;
    const DesId = req.query.id;

   
 console.log("desi id",DesId)
    const responce = await getQuestionById(dependecies).executeFunction(DesId);

    res.send(responce);
  };

  return getQuestionByidController;
};