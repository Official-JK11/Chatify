import jwt from "jsonwebtoken"
export const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*100, // 7Days
        httpOnly: true, // prevnent XSS attack cross-site scripting attack
        sameSite: "strict", // prevent CSRF cross-site request forgery attack
        secure: process.env.NODE_ENV!== "development"  // works on https only in deployment
    })
}