import 'dotenv/config';
import { app } from './app';
import { initSocketServer } from './socket';
import connectDB from './utils/db';
import { v2 as cloudinary } from 'cloudinary'
import http from "http"

const server = http.createServer(app);

initSocketServer(server);

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_SECRET_KEY as string
});


//create server
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});