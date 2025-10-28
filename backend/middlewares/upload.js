import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

//Cấu hình nơi lưu trữ file
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "faq_uploads",
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    },
});

//Tạo instance upload dùng cho route
const upload = multer({storage})

export default upload;

//Tiếp theo import ở bất cứ controllers nào cần upload file
//nhưng hiện tại mình tách controller và route ra nên => import ởrouters