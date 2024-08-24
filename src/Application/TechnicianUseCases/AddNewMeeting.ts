import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const addNewMeeting = (dependencies: any) => {

    console.log("addslot funtion")
    const { AddnewMeetingRepo } = dependencies.repositery

    const executeFunction = async (data: any) => {
        try {
            // Add the new slot to the repository
            const newMeetingdata = await AddnewMeetingRepo.PostExit(data);

            // Debugging: Log the added slot data
            console.log("New Meeting added:", newMeetingdata);

            return {
                status: true,
                message: "Meeting  added successfully",
                data: newMeetingdata,
            };
        } catch (error) {
            // Handle any errors that occur during the process
            console.error("Error adding new slot:", error);
            return {
                status: false,
                message: "Failed to add slot",
                data: null,
            };
        }
    };

    return { executeFunction };
};