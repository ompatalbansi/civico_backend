const express = require("express");
const dotenv = require("dotenv");
dotenv.config();  // config env
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    console.log(req.body);
    res.json({
        msg: "ok",
        data: req.body
    });
});

app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT || 6000}`);
}); 

