import mongoose from "mongoose";

// model creating for mongodb 
const complaintSchema = new mongoose.Schema(
    {
     fullName: {
        type: String,
        required: true
     },
     email: {
        type: String,
        required: true
     },
     phone: {
        type: String,
        required: true
     },
     address: {
        type: String,
        required: true
     },
     subject: {
         type: String,
         required : true
     },
     priority: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     status: {
        type: String,
        required: true
     },
     category:{
      type: String,
      required: true
     }
    },
    {
        timestamps: true,
    }
);
const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;