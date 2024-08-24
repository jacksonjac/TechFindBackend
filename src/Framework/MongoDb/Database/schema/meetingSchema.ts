import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const meetingSchema = new mongoose.Schema({
    technicianId: { type: Schema.Types.ObjectId,
    ref: 'Technician',
        required: true },

    userId: { type: Schema.Types.ObjectId,
         ref: 'User',
          required: true },
    meetingDate: 
    { type: Date, 
        required: true },

    startTime:
     { type: String, 
        required: true },
        
        
    endTime:
     { type: String,
         required: true },
          
         
    status:
     { type: String,
         enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled' },
    videoCallLink: 
    { type: String, 
        required: true },

}, { timestamps: true });

const Meetings = mongoose.model('Meeting', meetingSchema);



export {
    Meetings
};