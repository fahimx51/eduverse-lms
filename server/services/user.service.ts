import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

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

export const getAllUserService = async (res: Response) => {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
        success: true,
        users
    });
};

//update user role
export const updateUserRoleService = async (res: Response, id: string, role: string) => {
    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.role = role;
        await user.save();

        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}