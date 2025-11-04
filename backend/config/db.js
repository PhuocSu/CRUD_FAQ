import { Sequelize } from "sequelize";

// Khởi tạo kết nối database
const sequelize = new Sequelize("crud_faq_db", "root", "Phuocsud.t@2003", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false, // Bật để xem SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

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
