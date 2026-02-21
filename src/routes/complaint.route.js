import { Router } from "express";
import { createComplaint, getAllComplaints, getComplaintById, updateStatus } from "../controller/complaint.controller.js";

const complaint_router = Router();

complaint_router.post("/register", createComplaint);
complaint_router.get("/all", getAllComplaints);
complaint_router.get("/:id", getComplaintById);
complaint_router.patch("/:id/status", updateStatus);

export { complaint_router };