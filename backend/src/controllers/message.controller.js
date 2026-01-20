import User from "../models/user.model";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.json(filterUsers);
    } catch (error) {
        console.log(`Message Controller Error: ${error}`)
        return res.status(500).json({ message: `Internal Server Error` })
    }
}