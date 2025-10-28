/*

CREATE TABLE FAQ (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  questionTopic VARCHAR(255) not null,
  attachFile VARCHAR(500),          -- lưu đường dẫn file (URL hoặc path)
  content TEXT not null,
  isTemporarySaved BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

*/

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Định nghĩa model FAQ
const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  questionTopic: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  attachFile: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Lưu đường dẫn file (URL hoặc path)'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isTemporarySaved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'FAQ',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  // Thêm các hook nếu cần
  hooks: {
    beforeValidate: (faq) => {
      // Xử lý trước khi validate
    },
    afterCreate: (faq) => {
      // Xử lý sau khi tạo mới
    }
  }
});

export default FAQ;