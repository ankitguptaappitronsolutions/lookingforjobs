import {Router} from "express";
import userRoute from "../route/users/userRoute";
import jobPostRoute from "../route/job/jobRoute";
// import companyRoute from "../route/company/companyRoute";
import resumeRoute from "../route/resume/resumeRoute";
import pagesRoute from "../route/users/pages";
import  profileRoute from "../route/users/profileRoute";


const indexRoute = Router();
indexRoute.use("/user",userRoute);
indexRoute.use("/job",jobPostRoute);
// indexRoute.use("/company",companyRoute);
resumeRoute.use("/resume",resumeRoute);
indexRoute.use("/pages",pagesRoute);
indexRoute.use("/jobs",jobPostRoute);
indexRoute.use("/profile",profileRoute);



export default indexRoute;

