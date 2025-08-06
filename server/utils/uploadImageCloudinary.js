/*
Cloudinary is a cloud-based media management platform that handles images, videos, and other media files for web and mobile applications. Here's what it does:
Core Functions
Media Storage & Delivery

Stores your images and videos in the cloud
Delivers them through a global CDN (Content Delivery Network) for fast loading worldwide
Automatically optimizes file sizes and formats based on the user's device and browser */

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadImageCloudinary =async (image)=>{
    try{
          /*Scenario 1: If image.buffer exists

Uses the existing buffer directly
This happens when image is already a Node.js Buffer or has a .buffer property

Scenario 2: If image.buffer is undefined/null

Calls image.arrayBuffer() to get an ArrayBuffer
Converts that ArrayBuffer to a Node.js Buffer using Buffer.from()
This happens when image is a File, Blob, or Response object from the browser */
 
    const buffer =image.buffer||Buffer.from(await image.arrayBuffer())
    
     const uploadImage =await new Promise((resolve,reject)=>{
   cloudinary.uploader.upload_stream({folder:"blinkeyit"
    ,resource_type:"auto"
   },(error,uploadResult)=>{
    return resolve(uploadResult)
   }).end(buffer)
    })
    return uploadImage
}catch(error){
throw error;    
}

}
export default uploadImageCloudinary