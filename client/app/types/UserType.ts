export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    avatar?: {
        public_id: string;
        url: string;
    };
    courses: string[]; // Currently an empty array []
    createdAt: string;
    updatedAt: string;
    __v: number;
    // password is in the log, but usually you shouldn't include it in frontend types
}