import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    retryStrategy: (times) => {
        // Tự động kết nối lại sau 1 phút nếu mất kết nối
        const delay = Math.min(times * 50, 5000);
        return delay;
    }
});

// Xử lý lỗi kết nối
redis.on('error', (err) => {
    console.error('Redis Error:', err);
});

export default redis;