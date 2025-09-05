import express from "express"
import uploads from "../utills/multer.js"
import {uploadMedia} from "../utills/cloudinary.js"

const router =express.Router()
router.route('/upload-video').post(uploads.single("file"),async(req,res)=>{
    try {
        const result=await uploadMedia(req.file.path)
        res.status(200).json({
            success:true,
            message:"file upload successfully",
            data:result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error in upload file"})
        
    }
})
export default router;