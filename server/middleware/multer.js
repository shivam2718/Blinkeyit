/*Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files through HTML forms.*/
import multer from  'multer'
/*multer.memoryStorage() creates a storage engine that stores files in memory (RAM)
Files are stored as Buffer objects in memory, not saved to disk
This is useful when you want to process files immediately or upload them to cloud services */
const storage =  multer.memoryStorage()

const upload = multer({
    storage: storage
})
export default upload