import { Address } from "../../Database";
import { Slot } from "../../Database";
import { Bookings } from "../../Database";
import { Comment } from "../../Database";
export default {
  postExist: async (data: any) => {
    try {
        // Create a new comment using the Comment model and the data passed from the controller
        const newComment = new Comment({
          technicianId: data.technicianId,
          commenterId: data.commenterId,
          content: data.content,
          ratingValue: data.ratingValue
        });
  
        // Save the new comment to the database
        const savedComment = await newComment.save();
  
        return {
          status: true,
          message: "Comment added successfully",
          data: savedComment
        };
      } catch (error) {
        console.error("Error in addComment:", error);
        return {
          status: false,
          message: "An error occurred while adding the comment",
          error: error
        };
      }
    }
};
