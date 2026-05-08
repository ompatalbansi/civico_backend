import Complaint from "../models/complaint.model.js";
import mongoose from "mongoose";

const createComplaint = async (req, res) => {
    try {
        const { fullName, email, phone, address, priority, category, subject, description, status } = req.body;
        const complaints = new Complaint({
            fullName,
            email,
            phone,
            address,
            priority,
            description,
            status,
            subject,
            category
        });
        await complaints.save();
        res.status(201).json(complaints);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            cause: "data not save to db"
        });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteComplaint = async (req, res) =>{
    const {id} = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "Invalid complaint ID"
        });
    }
    try{
        const complaint =await Complaint.deleteOne({_id: id});
        if(!complaint) return res.status(404).json({
            message : "facing error in deleting element from db"
        });
        res.status(200).json(complaint);
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getComplaintById = async (req, res) => {
     const {id} = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "Invalid complaint ID"
        });
    }
    try {
        // console.log(req.params.id);
        const complaint = await Complaint.findById(id);
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json(complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
     const {id} = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "Invalid complaint ID"
        });
    }
    try {
        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createComplaint,deleteComplaint, getAllComplaints, getComplaintById, updateStatus };
