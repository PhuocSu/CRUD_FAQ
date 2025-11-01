import FAQ from "../models/faq.js";
import faqService from "../services/faq.service.js";
import cloudinary from '../config/cloudinary.js';

// Get all FAQs
export const getAllFaq = async (req, res) => {
  try {
    const faqs = await FAQ.findAll();
    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error getting FAQs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Create a new FAQ (đã gỡ phần upload trùng)
export const createFaq = async (req, res) => {
  try {
    const { title, questionTopic, content, isTemporarySaved } = req.body;

    if (!title || !questionTopic || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Nếu file được upload thì CloudinaryStorage đã xử lý rồi
    const fileUrl = req.file ? req.file.path : null; // CloudinaryStorage tự thêm .path = URL
    const originalFileName = req.file ? req.file.originalname : null; // ✅ Tên file gốc có .png

    const newFaq = await FAQ.create({
      title,
      questionTopic,
      attachFile: fileUrl,
      attachFileName: originalFileName,
      content,
      isTemporarySaved: isTemporarySaved || false,
    });

    res.status(201).json({
      message: "FAQ created successfully",
      data: newFaq,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update FAQ
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, questionTopic, content, isTemporarySaved, fileDeleted } = req.body;

    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    let fileUrl = faq.attachFile;
    let originalFileName = faq.attachFileName;

    // 🟢 Trường hợp 1: Có upload file mới
    if (req.file) {
      fileUrl = req.file.path;
      originalFileName = req.file.originalname;
    }
    // 🔴 Trường hợp 2: Người dùng xóa file (bấm ❌)
    else if (fileDeleted === "true") {
      fileUrl = null;
      originalFileName = null;
    }

    // 🟡 Trường hợp 3: Không đổi gì thì giữ nguyên
    // Cập nhật FAQ
    await faq.update({
      title,
      questionTopic,
      attachFile: fileUrl,
      attachFileName: originalFileName,
      content,
      isTemporarySaved,
    });

    res.status(200).json({
      message: "FAQ updated successfully",
      data: faq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete FAQ
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    await faq.destroy();

    res.status(200).json({
      message: "FAQ deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFaqSearch = async (req, res) => {
  const { keyword } = req.query
  try {
    const faqs = await faqService.searchFaqs(keyword)
    res.json(faqs)

  } catch (error) {
    console.error("Error getting FAQ search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getFaqCount = async (req, res) => {
  try {
    const { questionTopic } = req.query // lấy url sau ?
    const count = await faqService.countFaqs(questionTopic)
    res.json({ count })

  } catch (error) {
    console.error("Error getting FAQ count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}