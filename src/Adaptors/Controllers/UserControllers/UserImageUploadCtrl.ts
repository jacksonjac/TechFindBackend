import { Request, Response } from "express";

export default (dependecies: any) => {
  const UserProfileUploadController = async (req: Request, res: Response) => {
    const { UploadImage } = dependecies.useCase;

    

    const imageFile = req.file;
    const techId = req.query.techId; // Retrieve techId from query parameters
    console.log("Uploaded file:", imageFile);
    console.log("Tech ID:", techId);
   
    const data = {
      file: imageFile,
      techId: techId
    };
    console.log("Passing data to exec", data);

    const responce = await UploadImage(dependecies).executeFunction(data);

    res.send(responce);
  };

  return UserProfileUploadController;
};
