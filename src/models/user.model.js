import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema= new mongoose.Schema(
    userName= {
        type: String,
        required: true,
    },{
        password: {
            type: String,
            required: true,
        }
    }
)
userSchema.pre("save", function async (){
    bcrypt.hash(this.password, 10).then(function(hash) {
    // Store hash in your password DB.
    this.password=hash;
    return res.status(200).json({msg: "pass encrypted successfully!"});
    }).catch((error)=>{
    return res.status(404).json({error: `pass encryption error: ${error}`})
    })

})


export const User= mongoose.model("users", userSchema);
      
