export const authMe = (req, res) => {
    try {
        const user = req.user; //lấy từ middleware
        return res.status(200).json({ user });

    } catch (error) {
        console.log("Error in authMe: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
