import * as profile from "../../controller/users/profileController"
import {Router} from "express";



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
const uploadStorage = multer({storage: storage});


const profileRoute = Router();

profileRoute.get("/getProfile/:id", profile.getProfile);
profileRoute.patch("/updateProfile/:id", profile.updateProfile);
profileRoute.patch("/updateProfilePhoto/:id",uploadStorage.single("file"), profile.updateProfilePhoto);


export default profileRoute;