import axios from 'axios';

const API_URL = "http://localhost:3002/faqs"

const faqService = {
  // //Total Count: 전체
  // getFaqCount : async () => {
  //     const res = await axios.get(`${API_URL}/count`)
  //     console.log(res.data.count)
  //     return res.data.count;
  // },

  //Không sử dụng nữa => nó chỉ lấy count từ databse chứ không lấy filteredFaqs.length
  // getFaqCountByTopic : async (questionTopic) => {
  //     const url = questionTopic === '전체' 
  //     ? `${API_URL}/count`
  //     : `${API_URL}/count?questionTopic=${encodeURIComponent(questionTopic)}`

  //     const res = await axios.get(url)
  //     // console.log(res.data.count)
  //     return res.data.count;
  // },

  //fetchFAQ
  //thêm retry để tránh lỗi khi fetch trên production => on trial 
  fetchFaqs: async (retry = 5, delay = 1000) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      if (retry > 0) {
        console.log(`Retry fetch faqs... (${retry} left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return faqService.fetchFaqs(retry - 1, delay);
      }
      console.error('Failed to fetch faqs', err);
      throw err; // Ném lỗi để component có thể bắt được
    }
  },

  searchFaqs: async (keyword) => {
    if (!keyword || keyword.trim() === '') return [];
    const res = await axios.get(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`)
    return res.data;
  },

  deleteFaq: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }
  },

}

export default faqService;