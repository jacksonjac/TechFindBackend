import { Questions } from "../../Database";
import {Designation} from "../../Database"

export default {
    PostExit: async (data:any) => {

        console.log("question add postexit")
    try {

        const designationDoc = await Designation.findOne({ DesiName: data.designation });
        if (!designationDoc) {
            return {status:false,message:"designation does not exits"}
          }
      const newQuestion = await Questions.create({
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        correctAnswer: data.correctAnswer,
        designation: designationDoc._id 
      });

      return { status: true, message: "Question added successfully", data: newQuestion };
    } catch (error) {
      console.error("Error in addQuestion:", error);
      return { status: false, message: "An error occurred while adding the question", error: error };
    }
  },
};