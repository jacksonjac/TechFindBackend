import { Request, Response } from "express";

export default (dependencies: any) => {
    const getNoficationbyidController = async (req: Request, res: Response) => {

       
    
        // Extract technician ID from query parameters
        const technicianId = req.query.id as string;
    
        if (!technicianId) {
          return res.status(400).send({ message: "Technician ID is required." });
        }
    
        console.log("Technician ID:", technicianId);
    
        const { GetAllNotibyTechid } = dependencies.useCase;
    
        try {
          // Fetch comments for the specified technician ID
          const response = await GetAllNotibyTechid(dependencies).executeFunction(technicianId);
          
          if (response.status) {
            res.status(200).send(response);
          } else {
            res.status(404).send({ message: response.message || "Comments not found." });
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
          res.status(500).send({ message: "An error occurred while fetching comments.", error });
        }
      };

  return getNoficationbyidController;
};
