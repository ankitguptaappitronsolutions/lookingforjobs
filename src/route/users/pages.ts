import {Router} from "express";

import * as staticPages from '../../controller/users/staticPages';

const pagesRoute = Router();

pagesRoute.post("/mixingData", staticPages.mixingData);
pagesRoute.get("/appupdate", staticPages.forceAppUpdate);

export default pagesRoute;