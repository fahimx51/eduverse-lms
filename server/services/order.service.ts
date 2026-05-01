import { NextFunction } from "express";
import orderModel from "../models/order.model";

export const newOrder = async (data: any, next: NextFunction) => {
    const order = await orderModel.create(data);
    return order;
};