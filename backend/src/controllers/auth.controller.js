import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async  (req,res) =>{
    try {
        if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be atleast 6 characters"})
        }
        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "Email already exists"});
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })
        if (newUser){
            // generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({message: "Invalid User"});
        }

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message: "Something is wrong in our system"})
    }
}

export const login = async (req,res) =>{
    try {
        if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    const { email, password } = req.body
    if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect){
        return res.status(400).json({message: "Invalid Password"})
    }
    generateToken(user._id,res)
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
    })
    } catch (error) {
        console.log(`Error Message ${error}`);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
        console.log(`Error in logging out ${error}`);
        res.status(500).json({message:"Internal Server Error"}) 
    }
}

export const updateProfile = (req,res) =>{
    
}