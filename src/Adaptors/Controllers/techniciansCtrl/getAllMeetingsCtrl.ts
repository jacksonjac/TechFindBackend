import { Request, Response } from "express";

export default (dependecies: any) => {
  const getAllMeetingsController = async (req: Request, res: Response) => {

   
    const { AllMeetingLists} = dependecies.useCase;

   

    const responce = await AllMeetingLists(dependecies).executeFunction();

    res.send(responce);
  };

  return getAllMeetingsController;
};