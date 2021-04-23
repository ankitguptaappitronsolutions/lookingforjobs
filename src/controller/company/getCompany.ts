import { Request, Response } from "express";
import con from "../../../db";

export const getCompanyDetail = async (req: Request, res: Response) => {
  const companyId = req.params.id;
  con.query(
    "Select * from tron_companies where id = ?",
    [companyId],
    function (error, data) {
      if (!error) {
        if (data.length > 0) {
          return res.status(200).json({
            status: "success",
            data,
            message: "Company detail found succesfully",
          });
        } else {
          return res
            .status(404)
            .json({
              status: "failed",
              data: null,
              message: "company resource not available",
            });
        }
      } else {
        return res.status(400).json({
          status: "success",
          data,
          message: "Company detail found succesfully",
        });
      }
    }
  );
};
