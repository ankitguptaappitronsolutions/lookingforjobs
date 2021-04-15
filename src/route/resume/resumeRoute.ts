import {Router} from "express";
import * as resumeRoute from '../../controller/resume/resumeController';


const indexRoute = Router();

indexRoute.post("/addResume",resumeRoute.addResume);


export default indexRoute;