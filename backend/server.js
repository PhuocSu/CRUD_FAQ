import express from "express";
import faqRoute from "./routes/faqRouters.js";
import { testConnection, syncModels } from "./config/db.js";
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })) //cho phép frontend truy cập API
app.use(express.json());
// Routes
app.use("/faqs", faqRoute);



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