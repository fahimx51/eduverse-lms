import { Redis } from 'ioredis';

const redisClient = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection failed: REDIS_URL is not defined in environment variables');
}

export const redis = new Redis(redisClient());
