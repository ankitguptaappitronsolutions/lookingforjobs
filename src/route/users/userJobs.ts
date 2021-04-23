import {Router} from "express";
import * as resumeRoute from '../../controller/resume/resumeController';

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
const fileFilter = (req: any,file: any,cb: any) => {
    if(
        file.mimetype ===  "image/pdf"  ||
        file.mimetype === "image/png"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/jpg" ||
       file.mimetype ===  "image/docx "){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const uploadStorage = multer({storage: storage, fileFilter:fileFilter});

const indexRoute = Router();

indexRoute.post("/resumeupload/single", uploadStorage.single("file"),resumeRoute.uploadResume );


export default indexRoute;