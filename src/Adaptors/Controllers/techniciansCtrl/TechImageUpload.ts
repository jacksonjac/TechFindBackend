
import { Request, Response } from "express";

export default (dependencies: any) => {
    const TechProfileUploadController = async (req: Request, res: Response) => {
            console.log("tech")
      const { TechUploadImage} = dependencies.useCase;
      const imageFile = req.file;
    const techId = req.query.techId; // Retrieve techId from query parameters
      console.log("this is techprofile contreolller")
      const data ={
        imageFile,techId
      }
      console.log("passing data to exec",data)
     
     
  
    
  
      try {
        const response = await TechUploadImage(dependencies).executeFunction(data);
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return TechProfileUploadController;
  };