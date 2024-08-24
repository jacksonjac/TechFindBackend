import { Request, Response } from "express";

export default (dependecies: any) => {
  const AddNewMeetingController = async (req: Request, res: Response) => {
    const { addNewMeeting } = dependecies.useCase;

    console.log("new meeting data controller",req.body)

    const { userId,  technicianId, meetingDate ,endTime,videoCallLink,startTime} = req.body;

    const data = {
        meetingDate,
        technicianId,
        userId,
        endTime,
        startTime,
        videoCallLink
      };

      console.log("before the pass slot data" ,data)

    const responce = await addNewMeeting(dependecies).executeFunction(data);

    res.send(responce);
  };

  return AddNewMeetingController;
};
