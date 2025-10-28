import { Op } from 'sequelize';
import FAQ from "../models/faq.js";

const faqService = {
    // async getFaqCount() {
    //     const count = await FAQ.count();
    //     return count;
    // },

    async countFaqs(questionTopic) {
        const filter = questionTopic && questionTopic !== '전체'
            ? { questionTopic }
            : {}
        const count = await FAQ.count({ where: filter })
        return count
    },

    async searchFaqs(keyword) {
        if (!keyword || keyword.trim() === '') {
            return [];
        }
        
        const result = await FAQ.findAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`
                }
            }
        });
        return result;
    }
}

export default faqService;