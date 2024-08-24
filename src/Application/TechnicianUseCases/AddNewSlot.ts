import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




export const addNewSlot = (dependencies: any) => {

    console.log("addslot funtion")
    const { AddnewSlotRepo } = dependencies.repositery

    const executeFunction = async (data: any) => {
        try {
            // Add the new slot to the repository
            const newSlot = await AddnewSlotRepo.PostExit(data);

            // Debugging: Log the added slot data
            console.log("New slot added:", newSlot);

            return {
                status: true,
                message: "Slot added successfully",
                data: newSlot,
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