import {Router} from "express";
import * as jobPostRoute from '../../controller/jobs/jobController';


const indexRoute = Router();

indexRoute.post("/jobPost",jobPostRoute.jobPost);
indexRoute.get("/viewjob/:id",jobPostRoute.viewjob);


export default indexRoute;