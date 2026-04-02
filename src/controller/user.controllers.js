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
          // setting up the accessToken and reFreshToken
          const Options= {
            httpOnly:true,
            secure:false,

          }
          console.log(user);
          const accessToken = user.generateAccessToken();
          const refreshToken = user.genrateRefreshToken();
          return res.status(200).cookie("accessToken", accessToken, Options).cookie("refreshToken", refreshToken, Options).json({message: "Login successful"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export {loginAdmin};
