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

// if (process.env.NODE_ENV === 'development') {
//   const allowedOrigins = [
//     'http://localhost:5173', // FE dev
//   ];

//   app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true
//   }));
// }
// production: FE cùng domain, không cần cors

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:3000', // Common React port
  process.env.CLIENT_URL   // Production URL
].filter(Boolean); // Remove any falsy values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || allowedOrigins.some(allowedOrigin =>
      origin.startsWith('http://localhost:') ||
      origin.startsWith('https://') && origin.endsWith(process.env.CLIENT_URL || '')
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

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