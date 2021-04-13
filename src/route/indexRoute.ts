import {Router} from "express";
import userRoute from "../route/users/userRoute";

const indexRoute = Router();

indexRoute.use("/user",userRoute);

export default indexRoute;

