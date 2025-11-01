import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path"; //cần import cái này vì devtool không hiện lỗi


//Cấu hình nơi lưu trữ file
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        //Cách 1: Tạo được (cachs ban đầu)
        // folder: "faq_uploads",
        // allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],

        //Cách 2: ko Tạo được => đã tạo được (thiếp import path)
        folder: "faq_uploads",
        allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
        public_id: (req, file) => {
            const originalName = path.parse(file.originalname).name; // Lấy tên file gốc (không có đuôi)
            return `${Date.now()}_${originalName}`;
        },
        use_filename: true,
        unique_filename: false,
    },


});

//Tạo instance upload dùng cho route
const upload = multer({ storage })

export default upload;

//Tiếp theo import ở bất cứ controllers nào cần upload file
//nhưng hiện tại mình tách controller và route ra nên => import ởrouters