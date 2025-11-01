import express from "express";
import { getAllFaq, createFaq, updateFaq, deleteFaq } from "../controllers/faqControllers.js";
import { getFaqCount, getFaqSearch } from "../controllers/faqControllers.js";
//import upload từ middleware
import upload from "../middlewares/upload.js";

const router = express.Router();

// Dùng middleware upload cho route POST
router.post("/", upload.single('attachFile'), createFaq); // 'attachFile' phải trùng với tên field trong formData

router.put("/:id", upload.single('attachFile'), updateFaq);


//Các route khác
router.get("/count", getFaqCount);

router.get("/search", getFaqSearch);

router.get("/", getAllFaq);

router.delete("/:id", deleteFaq);

export default router;

