import {Router} from "express";
import * as employerRoute from '../../controller/employer/employerController';


const indexRoute = Router();

indexRoute.get("/myJobs/:userId",employerRoute.myJobs);
indexRoute.get("/pendingJob/:userId",employerRoute.pendingJobs);
indexRoute.get("/hiddenJob/:userId",employerRoute.hiddenJobs);
indexRoute.get("/expireJob/:userId",employerRoute.expireJobs);
indexRoute.get("/applyUser/:job_id",employerRoute.applyUser);

export default indexRoute;