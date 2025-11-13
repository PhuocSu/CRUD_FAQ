import redis from '../utils/redis.js';

const DEFAULT_EXPIRATION = 3600; // 1 giờ

const cacheService = {
    // Lấy dữ liệu từ cache
    async get(key) {
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    },

    // Lưu dữ liệu vào cache
    async set(key, value, ttl = DEFAULT_EXPIRATION) {
        try {
            await redis.set(key, JSON.stringify(value), 'EX', ttl);
            return true;
        } catch (error) {
            console.error('Cache set error:', error);
            return false;
        }
    },

    // Xóa cache
    async del(key) {
        try {
            await redis.del(key);
            return true;
        } catch (error) {
            console.error('Cache delete error:', error);
            return false;
        }
    }
};

export default cacheService;