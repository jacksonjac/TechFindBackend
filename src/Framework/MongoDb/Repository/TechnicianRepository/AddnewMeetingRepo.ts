import { Meetings } from "../../Database";
import {Technican} from "../../Database"
import { Notification } from "../../Database";

export default {
    PostExit: async (data: any) => {
        console.log("Adding new meeting slot");
    
        try {
          // Fetch the technician document to ensure it exists
          const technicianDoc = await Technican.findOne({ _id: data.technicianId });
          if (!technicianDoc) {
              return { status: false, message: "Technician does not exist" };
          }

          // Create a new meeting slot with the provided data
          const newMeeting = await Meetings.create({
              meetingDate: data.meetingDate,
              technicianId: data.technicianId,
              userId: data.userId,
              endTime: data.endTime,
              booked: false,
              videoCallLink: data.videoCallLink,
              startTime: data.startTime,
          });

          // Create a notification after the meeting is scheduled
          const notificationContent = `New meeting scheduled with technician ${technicianDoc.name} on ${data.meetingDate}.`;
          const newNotification = new Notification({
              senderid: data.technicianId,
              receiverId: data.userId,
              content: notificationContent,
              data: newMeeting, // Store the meeting data object in the notification
          });

          await newNotification.save(); // Save the notification to the database
          console.log('Notification created:', newNotification);

          return { status: true, message: "Meeting scheduled successfully", data: newMeeting };
      } catch (error) {
          console.error("Error in PostExit:", error);
          return { status: false, message: "An error occurred while scheduling the meeting", error: error };
      }
  }
};