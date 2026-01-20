export const getUsersForSidebar = async (req, res) => {
    try {

    } catch (error) {
        console.log(`Message Controller Error: ${error}`)
        return res.status(500).json({ message: `Internal Server Error` })
    }
}