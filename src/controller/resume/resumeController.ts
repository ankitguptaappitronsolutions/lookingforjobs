import { Request, Response } from "express";
import con from "../../../db";
import * as dotenv from "dotenv";

var slug = require('slug');


dotenv.config({ path: __dirname + "/config.env" });



export const addResume = async (req: Request, res: Response) => {
  const job = {
    status: req.body.status,
    company_id: req.body.company_id,
    user_id: req.body.user_id,
    product_type: req.body.product_type,
    product_name: req.body.product_name,
    slug: slug((req.body.product_name), '-'),
    description: req.body.description,
    category: req.body.category,
    sub_category: req.body.sub_category,
    salary_min: req.body.salary_min,
    salary_max: req.body.salary_max,
    salary_type: req.body.salary_type,
    negotiable: req.body.negotiable,
    phone: req.body.phone,
    hide_phone: req.body.hide_phone,
    application_url: req.body.application_url,
    location: req.body.location,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    latlong: req.body.latlong,
    tag: req.body.tag

  };
  
  
  const sql = con.query(
    "INSERT INTO tron_product SET ?", [job], function (error, results) {
      if (results) {
        results.webUrl = "https://lookingforjob.co/job/"+results.insertId;
        return res.status(200).json({
          status: "success",
          data: results,
          message: "Job post Successfully..",
        });
      } else {

        res.status(400).json({

          status: "404",
          data: null,
          messgae: "Post a job Failed",
        });
      }
    }
  );

}
export const viewjob = async (req: Request, res: Response) => {
  
  const sql = con.query(
    "SELECT * FROM tron_product where id = ?",[req.params.id], function (error, results) {
      if (results) {
       
        return res.status(200).json({
          status: "success",
          data: results,
          message: "Job Listing",
        });
      } else {

        res.status(400).json({

          status: "404",
          data: null,
          messgae: "Failed to fetch job listing.",
        });
      }
    }
  );

}
