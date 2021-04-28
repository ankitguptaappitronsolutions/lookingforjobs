import {Router} from "express";
import * as userController from '../../controller/users/userController';
import {mixingData} from '../../controller/users/staticPages';
import * as experience from '../../controller/users/experience';


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


const userRoute = Router();

userRoute.post("/registration",userController.register);
userRoute.post("/login",userController.login);
userRoute.post("/forgotPassword", userController.forgotPassword)
userRoute.get("/resetpassword/:id/:token", userController.resetPassword)

//experience
userRoute.post("/addexperience", experience.addExperience);
userRoute.delete("/deleteexperience/:id", experience.deleteExperience);
userRoute.patch("/updatedexperience/:id", experience.updateExperience);
userRoute.get("/getAllexperience/:userId", experience.getAllExperience);


export default userRoute;



