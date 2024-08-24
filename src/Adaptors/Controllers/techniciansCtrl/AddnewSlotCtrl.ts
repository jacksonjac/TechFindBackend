import { Request, Response } from "express";

export default (dependecies: any) => {
  const AddNewSlotController = async (req: Request, res: Response) => {
    const { addNewSlot } = dependecies.useCase;

    const { date, time, techId } = req.body;

    const data = {
        date,
        time,
        techId,
      };

      console.log("before the pass slot data" ,data)

    const responce = await addNewSlot(dependecies).executeFunction(data);

    res.send(responce);
  };

  return AddNewSlotController;
};
