
import express from 'express';

/*
CORS (Cross-Origin Resource Sharing) is a security mechanism that allows web browsers to make requests to a different domain, protocol, or port than the one serving the current web page. 
*/
import cors from 'cors';
/*
dotenv is a utility that loads environment variables from a .env file into your application's runtime environment. It's commonly used to manage configuration settings and sensitive data like API keys, database credentials, and other secrets.
*/

import dotenv from 'dotenv';
//this is unknown 
import cookieParser from 'cookie-parser';
/* 
morgan does automatic logging instead of doing it manually  
*/
import morgan from 'morgan';
/*What is Helmet?
Helmet is a security middleware that sets various HTTP headers to protect your Express app from common web vulnerabilities. It's like putting a security helmet on your server */
import helmet from 'helmet';

import connectDB from './config/connectDB.js';

import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import OrderRouter from './routes/order.route.js';
import addressRouter from './routes/address.route.js'
import uploadRouter from './routes/upload.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js'; 
dotenv.config();
const app = express()
app.use(express.json());//app.use(express.json()) is middleware that tells your Express.js server how to handle JSON data sent in HTTP request bodies.
//without the above line handeling json data is difficult 
/*
app.use(express.urlencoded({ extended: true })) is middleware that parses form data sent from HTML forms or certain API requests.
The Problem It Solves
When someone submits an HTML form or sends form-encoded data, it arrives at your server in a special format called "URL-encoded" or "form-encoded". Without this middleware, your server can't read that form data.
*/
app.use(express.urlencoded({ extended: true })); 
/*
cors() - Enables Cross-Origin Resource Sharing
credentials: true - Allows cookies and auth headers to be sent
origin: process.env.FRONTEND_URL - Only allows requests from your specific frontend URL
credentials: true — This allows the server to accept requests that include credentials such as cookies, authorization headers, or TLS client certificates. This is necessary if your frontend needs to send or receive cookies or authentication tokens from the backend.*/
/*
origin: process.env.FRONTEND_URL — This restricts which origins are allowed to access the server. Only requests coming from the URL specified in the FRONTEND_URL environment variable will be permitted. This helps prevent unauthorized domains from making requests to your backend
*/
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL||"http://localhost:5173"
}));
//this is left
app.use(cookieParser());
app.use(morgan());
/*using Helmet.js for security but disabling one specific protection to allow cross-origin resource loading.
What is Helmet?
Helmet is a security middleware that sets various HTTP headers to protect your Express app from common web vulnerabilities. It's like putting a security helmet on your server. */
app.use(helmet({
   crossOriginResourcePolicy:false
}));
//if port 8080 is not avai lable, use some different port this is taken care by process.env.PORT
const PORT = process.env.PORT||8080
//checking if the server is running fine
app.get('/', (request, response) => {
    //server to client 
    response.json({
        "messege": "Hello from the server " + PORT,
    })
});

app.use('/api/user',userRouter); // because of this line every route will start with /api/user
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory',subCategoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',OrderRouter);
connectDB().then(() => {
       app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);})
});

