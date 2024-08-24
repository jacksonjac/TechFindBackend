import mongoose from 'mongoose';
import { Meetings } from '../../Database'; // Adjust the path to your Meetings model
import { Notification } from '../../Database';
export default {
    PostExit: async () => {
        console.log("Fetching all meetings from the database");

        try {
            // Find all meetings and populate the 'username' field from the User model
            const meetingList = await Meetings.find().populate('userId', 'name');
            console.log(meetingList, "Meetings found");

            if (meetingList.length > 0) {
                // Return the list of meetings with a success status
                return { status: true, data: meetingList };
            } else {
                // If no meetings are found, return a message indicating this
                return { status: false, message: "No meetings found" };
            }
        } catch (error) {
            console.error("Error fetching meetings:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred while fetching meetings" };
        }
    }
};
