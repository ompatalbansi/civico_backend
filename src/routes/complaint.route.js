import { Router } from "express";
import { createComplaint,deleteComplaint ,getAllComplaints, getComplaintById, updateStatus } from "../controller/complaint.controller.js";
import { loginAdmin } from "../controller/user.controllers.js";
import { isLoginwithToken } from "../middleware/login.middleware.js";
import jwt from "jsonwebtoken";

const complaint_router = Router();

complaint_router.post("/register", createComplaint);
complaint_router.get("/all", getAllComplaints);
complaint_router.post("/loginadmin", loginAdmin);
complaint_router.get("/login/auth", (req,res)=>{
try{
    const {accessToken, refreshToken} = req.cookies;
    // console.log(req.cookies);
    if(!accessToken && refreshToken){
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESHTOKENSECRET);
        const newAccessToken = jwt.sign({_id: decodedToken._id}, process.env.ACCESSTOKENSECRET, {expiresIn: "1h"});
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });
        return res.status(200).json({
            msg: "autharized",
            status : 200
        });
    }

    if(!accessToken && !refreshToken){
        return res.status(401).json({
            msg: "unautharized",
            status : 401
        });
    }
    // console.log(accessToken, refreshToken);
    if(accessToken && refreshToken){
        return res.status(200).json({
            msg: "autharized",
            status : 200
        }); 
    }else{
        return res.status(401).json({
            msg: "unautharized",
            status : 401
        });
    }
}catch(error){
    console.log(error);
    return res.status(500).json({
        msg: "Internal Server Error in auth",
        status : 500
    });
}
}    
);
complaint_router.patch("/:id/status", isLoginwithToken, updateStatus);
complaint_router.get("/:id", getComplaintById);
complaint_router.delete("/:id",deleteComplaint);



export { complaint_router };
