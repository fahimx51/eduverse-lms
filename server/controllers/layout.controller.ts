import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import layoutModel from "../models/layout.model";
import ErrorHandler from "../utils/ErrorHandler";
import uploadOnCloudinary from "../utils/cloudinary";
import { v2 as cloudinary } from 'cloudinary'

export const createLayout = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.body;

            const isTypeExist = await layoutModel.findOne({ type });
            if (isTypeExist) {
                return next(new ErrorHandler(`${type} already exist`, 400))
            }

            if (type === "Banner") {

                const image = req.file;

                if (!image) {
                    return next(new ErrorHandler("Please provide an Banner image", 400))
                }

                const uploaded = await uploadOnCloudinary(image.buffer, image.mimetype, 'eduverse/layout');

                const { title, subTitle } = req.body;

                await layoutModel.create({
                    banner: {
                        type,
                        image: {
                            public_id: uploaded?.public_id,
                            url: uploaded?.url
                        }, title, subTitle
                    }
                });
            }

            if (type === 'FAQ') {
                const { faq } = req.body;
                await layoutModel.create({
                    type,
                    faq
                });
            }

            if (type === "Categories") {
                const { categories } = req.body;
                await layoutModel.create({
                    type,
                    categories
                });
            }


            res.status(200).json({
                success: true,
                message: "Layout created successfully"
            });
        }
        catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    });

//edit layout
export const editLayout = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.body;

            if (type === "Banner") {

                const image = req.file;

                if (!image) {
                    return next(new ErrorHandler("Please provide an Banner image", 400))
                }

                const uploaded = await uploadOnCloudinary(image.buffer, image.mimetype, 'eduverse/layout');

                const { title, subTitle } = req.body;


                const bannerType = await layoutModel.findOne({ type });

                if (!bannerType) {
                    return next(new ErrorHandler("Banner not found", 404))
                }

                //delete previous banner image
                if (bannerType?.banner?.image?.public_id) {
                    await cloudinary.uploader.destroy(bannerType.banner.image.public_id);
                }

                await bannerType.updateOne({
                    banner: {
                        type,
                        image: {
                            public_id: uploaded?.public_id,
                            url: uploaded?.url
                        }, title, subTitle
                    }
                });
            }

            if (type === 'FAQ') {
                const { faq } = req.body;
                const faqType = await layoutModel.findOne({ type });

                if (!faqType) {
                    return next(new ErrorHandler("FAQ not found", 404))
                }

                await faqType.updateOne({
                    type,
                    faq
                });
            }

            if (type === "Categories") {
                const { categories } = req.body;
                const categoriesType = await layoutModel.findOne({ type });

                if (!categoriesType) {
                    return next(new ErrorHandler("Categories not found", 404));
                }

                await categoriesType.updateOne({
                    type,
                    categories
                });
            }


            res.status(200).json({
                success: true,
                message: "Layout updated successfully"
            });
        }
        catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    });

//get layout by type
export const getLayout = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.body;
            const layout = await layoutModel.findOne({ type });
            if (!layout) {
                return next(new ErrorHandler(`${type} not found`, 404))
            }
            res.status(200).json({
                success: true,
                layout
            });
        }
        catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    });