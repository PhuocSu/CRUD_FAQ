import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo kết nối database với Railway
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log, // Bật để xem SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Hàm kiểm tra kết nối
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công!');

    // Kiểm tra xem database có tồn tại không
    const [results] = await sequelize.query("SELECT DATABASE() as db");
    console.log('Đang sử dụng database:', results[0].db);

    // Kiểm tra các bảng hiện có
    const [tables] = await sequelize.query("SHOW TABLES");
    console.log('Các bảng hiện có:', tables.map(t => Object.values(t)[0]));

    return true;
  } catch (error) {
    console.error('❌ Không thể kết nối đến database:', error.message);
    return false;
  }
};

// Hàm đồng bộ hóa model với database
const syncModels = async () => {
  try {
    console.log('Models available:', Object.keys(sequelize.models));
    console.log('🔄 Đang đồng bộ hóa models...');

    // Đồng bộ tất cả models đã được định nghĩa: 
    // force: true => là lí do mất hết dữ liệu ban đầu
    // await sequelize.sync({ alter: true }); //tự động cập nhật cột mới
    // console.log('✅ Đồng bộ hóa models thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi đồng bộ hóa model:', error);
    throw error;
  }
};

export {
  sequelize,
  testConnection,
  syncModels
};
