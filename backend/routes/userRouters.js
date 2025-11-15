import express from 'express'
import { authMe, test, updateProfile } from '../controllers/userControllers.js'
import protectedRoute from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/me", authMe)
router.put("/me/profile", updateProfile)

router.get("/test", test)

export default router
