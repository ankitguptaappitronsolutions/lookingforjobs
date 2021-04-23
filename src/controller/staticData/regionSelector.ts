import {Request, Response} from 'express';
import con from '../../../db';

export const getCountry = async(req: Request, res: Response) => {

    con.query(
      "Select * from  tron_countries ",
      function (error, data) {
          if(!error){
              if(data.length > 0){
                  return res.status(200).json({
                      status:"success",
                      data,
                      message:"Country detail found succesfully"
                  })
              }
              else {
                  return res
                  .status(404)
                  .json({ status: "failed",
                           data:null,
                          message: "Country detail resource not available" });
              }
          }
          else {
              return res.status(400).json({
                  status:"success",
                  data,
                  message:"Country detail found succesfully"
              })
          }
      })
  }

  export const getAllCity = async(req: Request, res: Response) => {

    con.query(
      "Select * from  tron_cities ",
      function (error, data) {
          if(!error){
              if(data.length > 0){
                  return res.status(200).json({
                      status:"success",
                      data,
                      message:"city detail found succesfully"
                  })
              }
              else {
                  return res
                  .status(404)
                  .json({ status: "failed",
                           data:null,
                          message: "city detail resource not available" });
              }
          }
          else {
              return res.status(400).json({
                  status:"success",
                  data,
                  message:"City detail found succesfully"
              })
          }
      })
  }

  export const getCountryCity = async(req: Request, res: Response) => {
    const countryCode = req.params.countryCode;
    con.query(
      "Select * from  tron_cities where country_code = ?",[countryCode],
      function (error, data) {
          if(!error){
              if(data.length > 0){
                  return res.status(200).json({
                      status:"success",
                      data,
                      message:"List of country specific found succesfully"
                  })
              }
              else {
                  return res
                  .status(404)
                  .json({ status: "failed",
                           data:null,
                          message: "List of country specific city not available" });
              }
          }
          else {
              return res.status(400).json({
                  status:"success",
                  data,
                  message:"list of City details not found succesfully"
              })
          }
      })
  }