import { Request, Response } from "express";
import con from "../../../db";
import * as dotenv from "dotenv";
import moment from "moment";

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

//what is job listing doing here
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
export const uploadResume =  async (req: Request, res: Response) => {
  if(req.file === undefined)
  {
    return res.status(404).json({ message: "Please upload a file first"})
  }
  
console.log(req.file);

const resumeData = {
  user_id: req.body.userId,
  name: req.body.name,
  filename: req.file.filename,
  created_at: moment().format('YYYY-MM-DD h:mm:ss'),
  updated_at: moment().format('YYYY-MM-DD h:mm:ss')
};

  try {
    con.query(
      "INSERT INTO tron_resumes SET ?",
      [resumeData],
      function (error, data) {
  console.log(error);
  
          if(data){
            return res.status(201).json({
              status:"success",
              data,
               message: "Please uploaded successfully"
              })
          }
          else{
              return res.status(400).json({ message: "Image uploading error"});
          }
        })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
};}
export const getAllUserResume = async (req: Request, res: Response) => {
  
  if(req.params.id){
    con.query(
      "SELECT * FROM tron_resumes where user_id = ?",[req.params.id], function (error, data) {
        if(!error){
          if (data.length > 0) {
            return res.status(200).json({
              status: "success",
              data,
              message: "Resume Listing",
            });
          } else {
    
            res.status(404).json({
              status: "failed",
              data: null,
              messgae: "Failed to fetch Resume listing.",
            });
          }
        }
        else{
          res.status(400).json({
            status: "failed",
            data: null,
            messgae: "Got some error in query",
          });
        }
      }
    );
  }
  else {
    res.status(401).json({
      status: "failed",
      data: null,
      messgae: "enter the userID",
    });
  }
 

}


