import jwt from "jsonwebtoken";


const isLoginwithToken = (req, res, next)=>{
   try{
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(accessToken, refreshToken);
    if(!accessToken && !refreshToken ){
        return res.status(401).json({"msg " : "Unautharized"})
    }
    if(accessToken){
    const decodedToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET);
    req.user = decodedToken;
    return next();
    }
    if(refreshToken){
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESHTOKENSECRET);
        const newAccessToken = jwt.sign({_id: decodedToken._id, userName: decodedToken.userName}, process.env.ACCESSTOKENSECRET, {expiresIn: "2d"});
        const Options = {
            httpOnly: true,
            secure: false,
        }
        if(!accessToken){
        res.cookie("accessToken", newAccessToken,Options);
        }
        req.user = decodedToken._id;
        return next();
    }
    // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // if(!token){
    //     return res.status(401).json({"msg " : "Unautharized"})
    // }
    // const decodedToken = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    // req.user = decodedToken;
    // next();

}catch(error){
    console.log(error);
    return res.status(500).json({"msg " : "Internal Server Error"})
}
}

export {isLoginwithToken}