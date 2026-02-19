import express from "express";
import dotenv from "dotenv";
dotenv.config();  // config env
const app = express();


app.use(express.json());

app.post("/", (req, res) => {
    res.json({
        msg: "ok"
    });
});

app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT || 6000}`);
});