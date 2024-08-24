import { Request, Response } from "express";

export default (dependecies: any) => {
  const getQuestionController = async (req: Request, res: Response) => {

           
    const { AllQuestions} = dependecies.useCase;

   

    const responce = await AllQuestions(dependecies).executeFunction();

    res.send(responce);
  };

  return getQuestionController;
};