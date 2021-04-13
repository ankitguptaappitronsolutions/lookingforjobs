import {Router} from "express";
import * as userRoute from '../../controller/users/userController';


const indexRoute = Router();

indexRoute.post("/registration",userRoute.register);
indexRoute.post("/forgotPassword", userRoute.forgotPassword)
indexRoute.get("/resetpassword/:id/:token", userRoute.resetPassword)

export default indexRoute;