import { Request, Response } from "express";

import con from "../../../db";
import * as dotenv from "dotenv";
var bodyParser = require("body-parser");

var slug = require('slug');

var runner = require("child_process");




dotenv.config({ path: __dirname + "/config.env" });



export const jobPost = async (req: Request, res: Response) => {
  const job = {
    status: req.body.status,
    company_id: req.body.company_id,
    user_id: req.body.user_id,
    product_type: req.body.product_type,
    product_name: req.body.product_name,
    slug: slug(req.body.product_name, "-"),
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
    tag: req.body.tag,
  };

  const sql = con.query(
    "INSERT INTO tron_product SET ?",
    [job],
    function (error, results) {
      if(!error){
        if (results) {
          results.webUrl = "https://lookingforjob.co/job/" + results.insertId;
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
      } else {
        return res.status(400).json({
          status: "failed",
          data: null,
          message: "Error in query ..",
        });
      }
    }
  );
};
export const viewjob = async (req: Request, res: Response) => {
  const sql = con.query(
    "SELECT * FROM tron_product where id = ?",
    [req.params.id],
    function (error, results) {
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
};

export const getAllJobs = async (req: Request, res: Response) => {
  var country = req.body.country;
  var cat = req.body.cat;
  var subcat = req.body.subcat;
  var placeid = req.body.placeid;
  var keywords = req.body.keywords;
  var sub_category = req.body.sub_category;
  var job_type = req.body.job_type;
  var salary_type = req.body.salary_type;

  var salary_min = req.body.salary_min;
  var salary_max = req.body.salary_max;
  
  
  
  var where='';
 
  if(country)
  {
    where = where +  " and country = "+`'${country}'`;
  }
  if(cat)
  {
    where = where +  " and category = "+`'${cat}'`;
  }
  if(placeid)
  {
    where = where +  " and city = "+`'${placeid}'`;
  }
  if(keywords)
  {
    where = where +  " and product_name = "+`'${keywords}'`;
  }
  if(sub_category)
  {
    where = where +  " and sub_category = "+`'${sub_category}'`;
  }
  if(job_type)
  {
    where = where +  " and product_type = "+`'${job_type}'`;
  }
  if(salary_type)
  {
    where = where +  " and salary_type = "+`'${salary_type}'`;
  }

  if(salary_min)
  {
    where = where +  " and salary_min = "+`'${salary_min}'`;
  }
  if(salary_max)
  {
    where = where +  " and salary_max = "+`'${salary_max}'`;
  }

  var phpScriptPath = "C:/wamp64/www/script.php";
  var argsString =  "123456";
runner.exec("php " + phpScriptPath + " " +argsString, function(err: any, phpResponse: any, stderr: any) {
 if(err) console.log(err); /* log error */
var pass = phpResponse;
console.log(pass);
});


  con.query("Select * from tron_product where status = 'active  '" +where , function (error, data) {

    if (!error) {
      if (data.length > 0) {
        return res.status(200).json({
          status: "success",
          data,
          total: data.length,
          message: "job List",
        });
      } else {
        return res
          .status(404)
          .json({
            status: "failed",
            data: null,
            message: "No Jobs Found.",
          });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        data,
        total: data.length,
        message: "No Jobs Found.",
      });
    }
  });
};

export const hideUnhideJob = (req: Request, res: Response) => {
  const { hide, id } = req.params;
  con.query(
    "UPDATE tron_product SET  hide = ? WHERE id = ? ",
    [hide, id],
    function (error, data) {
      if (!error) {
        if (data.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            data: null,
            messgae: "Post hidden successfully",
          });
        } else {
          res.status(400).json({
            status: "failed",
            data: null,
            messgae: "post hidden failed",
          });
        }
      } else {
        console.log(error);
        res.status(400).json({
          status: "failed",
          data: null,
          message: "error in query",
        });
      }
    }
  );
};
export const appliedJobs = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  con.query(
    "SELECT tron_product.product_name, tron_product.description, tron_product.location, tron_product.created_at ,tron_companies.name,tron_companies.logo, tron_product_type.title FROM tron_product INNER JOIN tron_user_applied ON tron_product.id = tron_user_applied.job_id JOIN tron_companies ON tron_product.company_id = tron_companies.id JOIN tron_product_type ON tron_product_type.id = tron_product.product_type WHERE tron_user_applied.user_id = ?",
    [userId],
    async function (error, data) {
      console.log(error);

      if (!error) {
        if (data.length > 0) {
          return res.status(200).json({
            status: "success",
            data,
            message: "List of applied jobs",
          });
        } else {
          return res.status(404).json({
            status: "failed",
            data: null,
            message: "jobs resource not available",
          });
        }
      } else {
        return res.status(400).json({
          status: "failed",
          data,
          message: "Error in query",
        });
      }
    }
  );
};

