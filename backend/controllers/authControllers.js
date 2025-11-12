import bcrypt from "bcrypt"
import Account from "../models/account.js"
import jwt from "jsonwebtoken"
import crypto from "crypto";
import Session from "../models/session.js";


const ACCESS_TOKEN_TTL = "15s"
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000

export const signup = async (req, res) => {
    try {
        const { displayedName, username, password, email, phoneNumber } = req.body;

        if (!displayedName || !username || !password || !email || !phoneNumber) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        //Kiểm tra username có tồn tại không
        const duplicate = await Account.findOne({ where: { username: username } })
        if (duplicate) {
            return res.status(409).json({ message: "Username already exists" })
        }

        // mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Tạo user mới
        await Account.create({
            displayedName,
            username,
            password: hashedPassword,
            email,
            phoneNumber,
        })

        //Gửi 204 No Content
        return res.sendStatus(204)

    } catch (error) {
        console.log("Error in signup: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const signin = async (req, res) => {
    try {
        //Lấy input từ client
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        //Lấy hashedPassword trong db để so sánh với password input 
        const user = await Account.findOne({ where: { username: username } })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        //Nếu khớp, tạo accessToken với JWT
        const accessToken = jwt.sign(
            {
                userId: user.id,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: ACCESS_TOKEN_TTL }
        )

        //Tạo refreshToken => khi accesstoken hết hạn
        const refreshToken = crypto.randomBytes(64).toString("hex")

        //Tạo session mới để lưu refreshToken
        //B1: tạo model Session.js
        await Session.create({
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip || req.connection.remoteAddress
        })

        //Trả refreshToken về trong cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, //cookies không thể truy cập bằng Javascript
            secure: true, //cookies chỉ hoạt động khi kết nối HTTPS
            sameSite: 'none', //cho phép fe, be chạy trên 2 domain khác nhau, nếu deploy fe, be chung => thay 'none' bằng strict
            maxAge: REFRESH_TOKEN_TTL,
            path: '/auth/refresh' // Chỉ gửi cookie khi gọi đến route refresh token
        })

        //Trả accessToken về trong response
        return res.status(200).json({
            message: `User ${user.username} đã đăng nhập thành công!!!`
            , accessToken,
            user: {
                id: user.id,
                username: user.username,
                displayedName: user.displayedName,
                role: user.role //nhớ trả về fe
            }
        })
    } catch (error) {
        console.log("Error in signin: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const signout = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            await Session.destroy({ where: { refreshToken } })
            res.clearCookie("refreshToken")
        }

        return res.sendStatus(204)

    } catch (error) {
        console.log("Error in signOut: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) {
            return res.status(401).json({ message: 'Refresh Token không tồn tại' })
        }

        const session = await Session.findOne({ where: { refreshToken: token } })
        if (!session) {
            return res.status(403).json({ message: 'Refresh Token không hợp lệ hoặc đã hết hạn' })
        }

        if (session.expiresAt < new Date()) {
            return res.status(403).json({ message: 'Refresh Token đã hết hạn' })
        }

        const accessToken = jwt.sign(
            {
                userId: session.userId,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: ACCESS_TOKEN_TTL }
        )

        return res.status(200).json({ accessToken })

    } catch (error) {
        console.log("Error in refreshToken: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
