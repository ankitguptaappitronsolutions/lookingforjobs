import {Router} from "express";
import * as jobPostRoute from '../../controller/jobs/jobController';


const indexRoute = Router();

indexRoute.post("/jobPost",jobPostRoute.jobPost);
indexRoute.get("/viewjob/:id",jobPostRoute.viewjob);

indexRoute.get("/getalljobs", jobPostRoute.getAllJobs);
indexRoute.patch("/hidejobpost/:id/:hide", jobPostRoute.hideUnhideJob);
indexRoute.get("/getalluserappliedjobs/:userId", jobPostRoute.appliedJobs);


export default indexRoute;