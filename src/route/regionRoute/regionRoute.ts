import {Router} from "express";
import * as regionSelector from '../../controller/staticData/regionSelector';

const regionRoute = Router();
regionRoute.get("/getallcity", regionSelector.getAllCity);
regionRoute.post("/getcountrycity/:countrycode", regionSelector.getCountryCity);
regionRoute.get("/getcountry", regionSelector.getCountry);


export default regionRoute;