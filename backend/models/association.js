import Account  from "./account.js";
import Session from "./session.js";

const setupAssociations = () => {
    //1 account có  nhiều session
    Account.hasMany(Session, { 
        foreignKey: "userId",
        as: 'sessions',  // Tùy chọn: đặt tên cho mối quan hệ
        onDelete: 'CASCADE'  // Tự động xóa các session khi xóa account
    });
    
    //1 session thuộc về 1 account
    Session.belongsTo(Account, { 
        foreignKey: "userId",
        as: 'user'  // Tùy chọn: đặt tên cho mối quan hệ
    });
};

export default setupAssociations;