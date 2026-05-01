import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INotification extends Document {
    title: string,
    message: string,
    status: string,
    user: string,
};

const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    message: {
        type: String,
        required: [true, 'Please enter message']
    },
    status: {
        type: String,
        required: [true, 'Please enter status'],
        default: 'unread'
    }
}, { timestamps: true });

const notificationModel: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema);

export default notificationModel;