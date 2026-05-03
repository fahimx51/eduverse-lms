import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import layoutModel from "../models/layout.model";
import ErrorHandler from "../utils/ErrorHandler";
import uploadOnCloudinary from "../utils/cloudinary";

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
    }
);