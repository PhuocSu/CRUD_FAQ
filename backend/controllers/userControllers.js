import Account from '../models/account.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'

export const authMe = (req, res) => {
    try {
        const user = req.user; //lấy từ middleware
        return res.status(200).json({ user });

    } catch (error) {
        console.log("Error in authMe: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { displayedName, password, email, phoneNumber } = req.body;

        // Validate input
        if (!displayedName || !email || !phoneNumber) {
            return res.status(400).json({ message: "Displayed name, email and phone number are required" });
        }

        // Check if email is already taken by another user
        const existingUser = await Account.findOne({
            where: {
                email,
                id: { [Op.ne]: userId }
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already taken by another user" });
        }

        // Prepare update object
        const updateData = { displayedName, email, phoneNumber };

        // Always hash and update password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Update user
        await Account.update(updateData, {
            where: { id: userId },
            returning: true
        });

        const user = await Account.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            user: user
        });

    } catch (error) {
        console.log("Error in updateProfile: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//test refresh token
export const test = async (req, res) => {
    res.status(200).json({ message: "Test thành công" })
}

