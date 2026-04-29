import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
    user: object;
    comment: string;
    commentReplies: IComment[];
}

interface IReview extends Document {
    user: object;
    rating: number;
    comment: string;
    commentReplies: IComment[];
}

interface ILink extends Document {
    title: string;
    url: string;
}

interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestions: string;
    questions: IComment[];
}

interface ICourse extends Document {
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: IReview[];
    courseData: ICourseData[];
    instructor: object;
    ratings?: number;
    purchased?: number;
}

const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
});

const linkSchema = new Schema<ILink>({
    title: String,
    url: String
});

const commentSchema = new Schema<IComment>({
    user: Object,
    comment: String,
    commentReplies: [Object]
});

const courseDataSchema = new Schema<ICourseData>({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestions: String,
    questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: [true, 'Please enter course name']
    },
    description: {
        type: String,
        required: [true, 'Please enter course description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter course price']
    },
    estimatedPrice: Number,
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    tags: {
        type: String,
        required: [true, 'Please enter course tags']
    },
    level: {
        type: String,
        required: [true, 'Please enter course level']
    },
    demoUrl: {
        type: String,
        required: [true, 'Please enter course demo url']
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    instructor: Object,
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const courseModel = mongoose.model<ICourse>('Course', courseSchema);

export default courseModel;