import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./connection/db.connect.js";
import { complaint_router } from "./routes/complaint.route.js";
import cspMiddleware from "./middleware/csp.middleware.js";
import { User } from "./models/user.model.js";
dotenv.config();  // config env
const app = express();
app.use(cookieParser());
app.use(cors({
    "origin": process.env.FRONTEND_URL,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials": true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cspMiddleware);

connectDB(process.env.MONGODB_URI).then(() => {
    console.log("db connected");
});
app.use(`/${process.env.API_KEY}/v1`, complaint_router);

app.get("/om", (req, res) => {
    console.log("om is here");
    res.json({
        msg: "om is here"
    })
})

app.post("/admin", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User({userName, password});
        user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message+" :? admin not created"});
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

