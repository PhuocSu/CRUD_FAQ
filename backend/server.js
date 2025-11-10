import express from "express";
import faqRoute from "./routes/faqRouters.js";
import { testConnection, syncModels } from "./config/db.js";
import cors from "cors";
import 'dotenv/config';
import authRoute from "./routes/authRouters.js";
import cookieParser from 'cookie-parser';
import ProtectedRoute from "./middlewares/authMiddleware.js";
import userRoute from "./routes/userRouters.js";

//import các model đẫ dăng ký với Sequelize
import './models/account.js';
import './models/faq.js';
import './models/session.js';
import './models/association.js';

// Import và gọi setupAssociations Ở ĐÂY (SAU KHI MODELS ĐÃ IMPORT)
import setupAssociations from './models/association.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true  // Quan trọng: cho phép gửi cookie qua CORS
})) //cho phép frontend truy cập API
app.use(express.json());
app.use(cookieParser());
// Routes

//public route
app.use("/auth", authRoute);
app.use("/faqs", faqRoute);

//private route
app.use(ProtectedRoute)
app.use("/users", userRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Khởi tạo server
const startServer = async () => {
  try {
    // 1️⃣ Kiểm tra kết nối database
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("❌ Không thể kết nối đến database");
    }

    // Gọi setupAssociations sau khi DB kết nối
    setupAssociations();

    // 2️⃣ Đồng bộ hóa models với database
    await syncModels();
    console.log("✅ Đã đồng bộ hóa models với database");

    // 3️⃣ Khởi động server
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khi khởi động server:", error);
    process.exit(1);
  }
};

// Gọi hàm khởi động
startServer();