import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Account', // Tên model Account
      key: 'id'
    }
  },
  refreshToken: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  userAgent: {  // Thêm trường này để lưu thông tin trình duyệt/thiết bị
    type: DataTypes.STRING(500),
    allowNull: true
  },
  ipAddress: {  // Thêm trường này để lưu địa chỉ IP
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: "sessions",
  indexes: [
    // Index cho userId để tối ưu truy vấn
    {
      fields: ['userId']
    },
    // Index cho refreshToken để tìm kiếm nhanh
    {
      fields: ['refreshToken'],
      unique: true
    },
    // Index cho expiresAt để tự động xóa các session hết hạn
    {
      fields: ['expiresAt']
    }
  ]
});

// Tự động xóa các session hết hạn
const deleteExpiredSessions = async () => {
  try {
    await Session.destroy({
      where: {
        expiresAt: {
          [sequelize.Op.lt]: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Error deleting expired sessions:', error);
  }
};

// Chạy hàm xóa session hết hạn mỗi giờ
setInterval(deleteExpiredSessions, 60 * 60 * 1000);

export default Session;