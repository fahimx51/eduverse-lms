import { NextFunction, Response } from "express";
import orderModel from "../models/order.model";

export const newOrder = async (data: any, next: NextFunction) => {
    const order = await orderModel.create(data);
    return order;
};

//get all orders
export const getAllOrderService = async (res: Response) => {
    const orders = await orderModel.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        orders
    });
};