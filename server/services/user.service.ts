import { Response } from "express";
import { redis } from "../utils/redis";

//get user by Id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);

    if (userJson) {
        const user = JSON.parse(userJson);
        return res.status(200).json({
            success: true,
            user
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: "User not found in redis"
        });
    }
};