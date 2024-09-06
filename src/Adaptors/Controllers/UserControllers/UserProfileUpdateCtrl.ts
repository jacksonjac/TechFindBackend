import { Request, Response } from "express";

export default (dependecies: any) => {
  const UpateUserProfilController = async (req: Request, res: Response) => {

     console.log("updateUserProfile Controller")
    const { UpdateUserData } = dependecies.useCase;

    

    const techId = req.query.techId;
    // Retrieve user profile data from the request body
    const { name, email, district, phone } = req.body;

    console.log("Tech ID:", techId);
    console.log("Profile data to be updated:", { name, email, district, phone });

    try {
      // Prepare data for updating
      const updateData = {
        techId: techId,
        name: name,
        email: email,
        district: district,
        phone: phone,
      };
      console.log("passing data to updater userdata",updateData)
      // Call the use case to update user profile data
      const response = await UpdateUserData(dependecies).executeFunction(updateData);

      // Send success response
      res.send(response);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).send({ error: "Failed to update user profile." });
    }
  };

  return UpateUserProfilController;
};
