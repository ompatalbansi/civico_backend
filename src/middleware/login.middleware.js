import jwt from "jsonwebtoken";


const isLoginwithToken = (req, res, next) => {
  try {

    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const refreshToken = req.cookies?.refreshToken;

    // console.log("Access:", accessToken);
    // console.log("Refresh:", refreshToken);

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Access Token
    if (accessToken) {
      try {
        const decodedToken = jwt.verify(
          accessToken,
          process.env.ACCESSTOKENSECRET
        );

        req.user = decodedToken;
        return next();

      } catch (error) {
        console.log("Access token expired");
      }
    }

    // Refresh Token
    if (refreshToken) {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESHTOKENSECRET
      );

      const newAccessToken = jwt.sign(
        {
          _id: decodedToken._id,
          userName: decodedToken.userName,
        },
        process.env.ACCESSTOKENSECRET,
        { expiresIn: "2d" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
      });

      req.user = decodedToken;
      return next();
    }

  } catch (error) {
    console.log("Middleware Error:", error);

    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};

export {isLoginwithToken}