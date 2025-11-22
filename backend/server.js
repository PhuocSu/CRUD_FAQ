import express from "express";
import faqRoute from "./routes/faqRouters.js";
import { testConnection, syncModels } from "./config/db.js";
import cors from "cors";
import 'dotenv/config';
import authRoute from "./routes/authRouters.js";
import cookieParser from 'cookie-parser';
import protectedRoute from "./middlewares/authMiddleware.js";
import userRoute from "./routes/userRouters.js";
import { Sentry, requestHandler, errorHandler } from './utils/sentry.js';
import path from "path"

//import các model đẫ dăng ký với Sequelize
import './models/account.js';
import './models/faq.js';
import './models/session.js';
import './models/association.js';

// Import và gọi setupAssociations Ở ĐÂY (SAU KHI MODELS ĐÃ IMPORT)
import setupAssociations from './models/association.js';

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3002;

// The request handler must be the first middleware on the app
app.use(requestHandler);

// The error handler must be before any other error middleware and after all controllers
// Note: We'll add errorHandler at the end of the file

// Middleware
// Cho phép cả local dev và domain live

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Sử dụng biến môi trường hoặc mặc định localhost:5173
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"]
};

app.use(cors(corsOptions));

// Xử lý preflight request
app.options('*', cors(corsOptions));


app.use(express.json());
app.use(cookieParser());


// Routes
//public route
app.use("/auth", authRoute);
app.use("/faqs", faqRoute);

//private router
app.use("/users", protectedRoute, userRoute);

// The error handler must be before any other error middleware and after all controllers
app.use(errorHandler);

// ==================================RENDER================================

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve frontend build for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// ========================================================================

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
      console.log(`🚀 Server đang chạy trên port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Lỗi khi khởi động server:", error);
    process.exit(1);
  }
};

// Gọi hàm khởi động
startServer();