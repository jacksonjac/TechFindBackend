import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Admin model
import { User } from '../../Database';
import { Comment } from '../../Database';

export default {
    PostExit: async (techId:any) => {
        console.log("Fetching comments for technician:", techId);

        try {
          // Find all comment documents for the specified technician ID
          const comments = await Comment.find({ technicianId: techId })
                                        .populate('commenterId', 'name _id image'); // Assuming commenterId is a reference to User model
    
          // Check if comments are found
          if (comments.length > 0) {
            console.log("Comments found:", comments);
    
            // Calculate the total rating value
            const totalRating = comments.reduce((acc, comment) => acc + comment.ratingValue, 0);
    
            // Calculate the average rating
            const averageRating = totalRating / comments.length;
    
            // Count the number of comments
            const commentCount = comments.length;
    
            return {
              status: true,
              message: "Comments fetched successfully",
              data: comments,
              averageRating,
              commentCount
            };
          } else {
           
            return {
              status: false,
              message: "No comments found for the technician",
              data: [],
              averageRating: 0,
              commentCount: 0
            };
          }
        } catch (error) {
          console.error("Error in getCommentsByTechnicianId function:", error);
          return {
            status: false,
            message: "An error occurred while fetching comments",
            data: [],
            averageRating: 0,
            commentCount: 0
          };
        }
    }
  };