import { Router } from "express";
import auth from '../middleware/auth.js'
import uploadController from "../controllers/uploadImage.controller.js";
import upload from "../middleware/multer.js";
const uploadRouter=Router()
uploadRouter.post("/upload",auth,upload.single("image"),uploadController)
export default uploadRouter