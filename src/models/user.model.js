import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
        {
        userName: {
            type: String,
            required: true,
        },
        password: {     
            type: String,
            required: true,
        }
    }
);

userSchema.pre("save", function (){
    if(!this.isModified("password")) return;

    // const hash = bcrypt.hash(this.password,5);
    
    //  this.password = hash;
});

userSchema.methods.check_password = function (pass){
    if(pass == this.password){
    return true;
    }else{
        return false;
    }
}
userSchema.methods.generateAccessToken = function(){
return jwt.sign({_id: this._id, userName: this.userName}, process.env.ACCESSTOKENSECRET, {expiresIn: "2d"})
}

userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign({_id: this._id, userName: this.userName}, process.env.REFRESHTOKENSECRET, {expiresIn: "1d"})
}



export const User= mongoose.model("users", userSchema);
      
