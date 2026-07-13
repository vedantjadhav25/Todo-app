import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenandSaveinCookies = async(userId , res) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET_KEY,{
        expiresIn : "10d" //10days expiry
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure:false, // Set to true if using HTTPS
        sameSite: "lax",// Adjust based on your requirements
        path: "/", // Adjust based on your requirements
    });

    await User.findByIdAndUpdate(userId, { token });
    return token;
}  