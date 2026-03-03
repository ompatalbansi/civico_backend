import {User} from "../models/user.model.js";

const loginAdmin = async (req, res)=>{
    try{
          const {userName, password} = req.body;
          const user = await User.findOne({userName});
          if(!user){
              return res.status(400).json({message: "Invalid username"});
          }
          const isMatch = user.check_password(password);
          if(!isMatch){
              return res.status(400).json({message: "Invalid password"});
          }
          res.status(200).json({message: "Login successful"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export {loginAdmin};
