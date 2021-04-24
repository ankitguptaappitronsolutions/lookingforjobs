import { Request, Response } from "express";
import con from "../../../db";

export const addExperience = async (req: Request, res: Response) => {
  const experience = {
    user_id: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    start_date: req.body.startDate,
    end_date: req.body.endDate || null,
    currently_working: req.body.currentlyWorking,
  };

  con.query(
    "INSERT INTO tron_experiences SET ?",
    [experience],
    function (error, data) {
      if (!error) {
        if (data.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            data: null,
            messgae: "experience added successfully",
          });
        } else {
          res.status(400).json({
            status: "failed",
            data: null,
            messgae: "experience not added successfully",
          });
        }
      } else {
        res.status(400).json({
          status: "failed",
          data: null,
          messgae: "error in query",
        });
      }
    }
  );

  //getting information for privacy policy, terms and conditions and cookie policy
};

export const deleteExperience = async (req: Request, res: Response) => {
  const experienceId = req.params.id;
  con.query(
    "DELETE FROM tron_experiences WHERE id = ?",
    [experienceId],
    (error, result) => {
      if (!error) {
        if (result.affectedRows > 0) {
          console.log(result);

          res.status(200).json({
            status: "success",
            data: result,
            messgae: "experience deleted successfully",
          });
        } else {
          res.status(400).json({
            status: "failed",
            data: null,
            messgae: "experience not deleted successfully",
          });
        }
      } else {
        res.status(400).json({
          status: "failed",
          data: null,
          messgae: "error in query",
        });
      }
    }
  );
};

export const updateExperience = (req: Request, res: Response) => {
  const experienceId = req.params.id;

  const user = {
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    currently_working: req.body.currentlyWorking,
  };

  con.query(
    "UPDATE tron_experiences SET  title = ? , description = ?, city = ?, start_date = ?, end_date = ?, currently_working = ?  WHERE id = ? ",
    [
      user.title,
      user.description,
      user.city,
      user.start_date,
      user.end_date,
      user.currently_working,
      experienceId,
    ],
    function (error, data) {
      if (!error) {
        if (data.affectedRows > 0) {
          console.log(data);

          res.status(200).json({
            status: "success",
            data: data,
            messgae: "experience updated successfully",
          });
        } else {
          res.status(400).json({
            status: "failed",
            data: null,
            messgae: "experience updation failed",
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

export const getAllExperience = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  con.query(
    "Select * from tron_experiences where user_id = ?",
    [userId],
    function (error, data) {
      if (!error) {
         
        if (data.length > 0) {
          return res.status(200).json({
            status: "success",
            data,
            message: "List of experience details",
          });
        } else {
          return res.status(404).json({
            status: "failed",
            data: null,
            message: "No experience exist with the user",
          });
        }
      } else {
        console.log(error);
        res.status(400).json({
          status: "failed",
          data: null,
          message: "Query with bugs",
        });
      }
    }
  );
};
