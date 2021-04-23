import { Request, Response } from "express";
import con from "../../../db";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/config.env" });

export const addCompany = async (req: Request, res: Response) => {
  const company = {
    user_id: req.body.user_id,
    name: req.body.name,
    //logo: req.body.logo,
    description: req.body.description,
    location: req.body.location,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    latlong: req.body.latlong,
    phone: req.body.phone,
    fax: req.body.fax,
    email: req.body.email,
    website: req.body.website,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    linkedin: req.body.linkedin,
    pinterest: req.body.pinterest,
    youtube: req.body.youtube,
    instagram: req.body.instagram,
    status: req.body.status,
  };

  const sql = con.query(
    "INSERT INTO tron_companies SET ?",
    [company],
    function (error, results) {
      if (!error) {
        if (results) {
          return res.status(200).json({
            status: "success",
            data: results,
            message: "company register Successfully..",
          });
        } else {
          return res.status(400).json({
            status: "404",
            data: null,
            messgae: "company register Failed",
          });
        }
      } else {
        return res.status(400).json({
          status: "failed",
          data: null,
          message: "Error in query..",
        });
      }
    }
  );
};
