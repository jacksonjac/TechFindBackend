import { Request, Response } from "express";

export default (dependencies: any) => {
    const Add_New_CommentCotrolller = async (req: Request, res: Response) => {
        console.log("This is add new comment controller");
    
        const { AddNewComment } = dependencies.useCase;
    
        // Destructure comment-related fields from the request body
        const { commenterId, content, date, ratingValue, technicianId } = req.body;
    
        try {
          // Prepare the data object for the use case
          const data = {
            commenterId,
            content,
            date,
            ratingValue,
            technicianId
          };
    
          console.log("Data before passing to the execute function in add new comment controller:", data);
    
          // Call the execute function from the use case
          const response = await AddNewComment(dependencies).executeFunction(data);
    
          // Send a success response with the result
          res.send(response);
        } catch (error) {
          // Send an error response with a meaningful message
          res.status(500).send({ message: "Error adding new comment", error });
        }
      };

  return Add_New_CommentCotrolller;
};
