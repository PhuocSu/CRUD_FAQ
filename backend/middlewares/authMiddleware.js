import jwt from "jsonwebtoken";
import Account from '../models/account.js'

const protectedRoute = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" })
            }

            const user = await Account.findByPk(decodedUser.userId, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            req.user = user
            next()
        })

    } catch (error) {
        console.log("Error in protectedRoute: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default protectedRoute

