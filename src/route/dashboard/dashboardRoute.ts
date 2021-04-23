import {Router} from "express";
import * as dashboardRoute from '../../controller/dashboard/dashboardController';


const indexRoute = Router();

indexRoute.get("/category",dashboardRoute.category);
indexRoute.get("/latestJob",dashboardRoute.latestJob);
indexRoute.get("/featuredJob",dashboardRoute.featuredJob);


export default indexRoute;