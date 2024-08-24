import mongoose, { Schema } from 'mongoose';


const addressSchema = new Schema({
  district: { type: String, required: true },
  fieldName: { type: String, required: true },
  houseName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: false } // optional field
});

const Address = mongoose.model('Address', addressSchema);
export {
    Address
}
