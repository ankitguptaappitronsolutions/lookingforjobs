import { Request, Response } from "express";
import con from "../../../db";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/config.env" });



export const myJobs = async (req: Request, res: Response) => {
const userId = req.params.userId;

  con.query(
    "Select * from  tron_product where status = 'active' and hide = '0' and user_id = "+userId,
    function (error, data) {
        if(!error){
            if(data.length > 0){
                return res.status(200).json({
                    status:"success",
                    data,
                    total: data.length,
                    message:"user job list"
                })
            }
            else {
                return res
                .status(404)
                .json({ status: "failed",
                         data:null,
                        message: "Job  resource not available" });
            }
        }
        else {
            return res.status(400).json({
                status:"success",
                data,
                message:"user job list"
            })
        }
    })


}

export const pendingJobs = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  
    con.query(
      "Select * from  tron_product where status = 'pending' and user_id = "+userId,
      function (error, data) {
          if(!error){
              if(data.length > 0){
                  return res.status(200).json({
                      status:"success",
                      data,
                      total: data.length,
                      message:"user pending job list"
                  })
              }
              else {
                  return res
                  .status(404)
                  .json({ status: "failed",
                           data:null,
                          message: "Job  resource not available" });
              }
          }
          else {
              return res.status(400).json({
                  status:"success",
                  data,
                  message:"user pending job list"
              })
          }
      })
  
  
  }

  export const hiddenJobs = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    
      con.query(
        "Select * from  tron_product where hide = '1' and user_id = "+userId,
        function (error, data) {
            if(!error){
                if(data.length > 0){
                    return res.status(200).json({
                        status:"success",
                        data,
                        total: data.length,
                        message:"user hidden job list"
                    })
                }
                else {
                    return res
                    .status(404)
                    .json({ status: "failed",
                             data:null,
                            message: "Job  resource not available" });
                }
            }
            else {
                return res.status(400).json({
                    status:"success",
                    data,
                    message:"user hidden job list"
                })
            }
        })
    
    
    }

    export const expireJobs = async (req: Request, res: Response) => {
      const userId = req.params.userId;
      
        con.query(
          "Select * from  tron_product where status = 'expire' and user_id = "+userId,
          function (error, data) {
              if(!error){
                  if(data.length > 0){
                      return res.status(200).json({
                          status:"success",
                          data,
                          total: data.length,
                          message:"user hidden job list"
                      })
                  }
                  else {
                      return res
                      .status(404)
                      .json({ status: "failed",
                               data:null,
                              message: "Job  resource not available" });
                  }
              }
              else {
                  return res.status(400).json({
                      status:"success",
                      data,
                      message:"user hidden job list"
                  })
              }
          })
      
      
      }

      export const applyUser = async (req: Request, res: Response) => {
        const job_id = req.params.job_id;
        
          con.query(
            "select t1.`id`, t1.`user_id`, t1.`job_id`, t1.`resume_id`, t1.`message`,  t2.filename, t3.username, t3.user_type, t3.email, t3.name, t3.tagline, t3.description, t3.dob, t3.salary_min, t3.salary_max from tron_user_applied as t1 INNER join tron_resumes as t2 on t1.resume_id = t2.id  INNER join tron_user as t3 on t2.user_id = t3.id and job_id = "+job_id,
            function (error, data) {
                
                if(!error){
                    if(data.length > 0){
                        return res.status(200).json({
                            status:"success",
                            data,
                            total: data.length,
                            message:"user hidden job list"
                        })
                    }
                    else {
                        return res
                        .status(404)
                        .json({ status: "failed",
                                 data:null,
                                message: "Job  resource not available" });
                    }
                }
                else {
                    return res.status(400).json({
                        status:"success",
                        data,
                        message:"user hidden job list"
                    })
                }
            })
        
        
        }

