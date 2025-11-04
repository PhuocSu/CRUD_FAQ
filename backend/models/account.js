/*

CREATE TABLE ACCOUNT (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

*/ 
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Định nghĩa model Account
const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    index: true
  },
  displayedName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
    index: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
  },
  email:{
    type: DataTypes.STRING(50),
    allowNull: false,
    notEmpty: true,
    isEmail: true
  },
  phoneNumber: {
    type: DataTypes.STRING(11),
    allowNull: false,
    notEmpty: true,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']]
    }
  }
}, {
  tableName: 'Account',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hooks: {
    beforeCreate: async (user) => {
      // Mã hóa mật khẩu trước khi lưu vào database
      if (user.password) {
        // TODO: Thêm mã hóa mật khẩu ở đây
        // user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

export default Account;
