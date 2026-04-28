require('dotenv').config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegexPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;

}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: 'Please enter a valid email address'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: String
        }
    ],
}, { timestamps: true });

//Hash password before saving user
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//sign access token
userSchema.methods.SignAccessToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', { expiresIn: '5m' });
}

//sign refresh token
userSchema.methods.SignRefreshToken = function (): string {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', { expiresIn: '7d' });
}

//Compare user entered password with hashed password in database
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;