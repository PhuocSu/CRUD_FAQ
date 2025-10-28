import { Sequelize, DataTypes } from "sequelize";

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
    type: DataTypes.ENUM('차량 및 계약 절차 관련', '계약 조건 관련', '결제/비용 관련', '', '기타'),
    allowNull: false,
    comment: 'Chủ đề câu hỏi: 차량 및 계약 절차 관련, 계약 조건 관련, 결제/비용 관련, , 기타'
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

// Định nghĩa model Account
const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

// Hàm kiểm tra kết nối
export const testConnection = async () => {
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
export const syncModels = async () => {
  try {
    console.log('Models available:', Object.keys(sequelize.models));
    console.log('🔄 Đang đồng bộ hóa models...');

    // Đồng bộ tất cả models đã được định nghĩa
    // await sequelize.sync({ force: true });
    // console.log('✅ Đồng bộ hóa models thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi đồng bộ hóa model:', error);
    throw error;
  }
};

export { sequelize, FAQ, Account };