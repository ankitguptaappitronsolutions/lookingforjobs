import {Router} from "express";
import * as companyRoute from '../../controller/company/companyController';


const indexRoute = Router();

indexRoute.post("/addCompany",companyRoute.addCompany);


export default indexRoute;