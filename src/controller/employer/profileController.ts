import { Request, Response } from "express";
import con from "../../../db";
import moment from "moment";

export const getProfile = async (req: Request, res: Response) => {
  const id = req.params.id;

  con.query(
    "Select * from tron_user where id = ?",
    [id],
    function (error, result) {
      if (!error) {
        if (result.length > 0) {
          result[0].password_hash = null;
          console.log(result[0]);
          const data = result[0];
          return res.status(200).json({
            status: "success",
            data,
            message: "user profile details",
          });
        } else {
          return res.status(404).json({
            status: "failed",
            data: null,
            message: "No user exist with this profile id",
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

// not working
export const updateProfile = (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);

  const user = {
    name: req.body.name || null,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone || null,
    image: req.body.image || null,
    city: req.body.city || null,
    country: req.body.country || null,
    tagline: req.body.tagline || null,
    category: req.body.category || null,
    subcategory: req.body.subcategory || null,
    salary_max: req.body.salary_max || 0,
    salary_min: req.body.salary_min || 0,
    dob: req.body.dob || null,
    facebook: req.body.facebook || null,
    twitter: req.body.twitter || null,
    instagram: req.body.instagram || null,
    linkedin: req.body.linkedin || null,
    youtube: req.body.youtube || null,
    website: req.body.website || null,
    description: req.body.description || null,
    userId: req.params.id,
  };

  con.query(
    "UPDATE tron_user SET  name = ? , email = ?, username = ?, phone = ?, image = ?, city = ? ,country = ?, tagline = ?, category = ?, subcategory = ?, salary_max = ?, salary_min = ?, dob = ?, facebook = ? ,twitter = ?, instagram = ?, linkedin = ? , youtube = ?, website = ? ,description = ?   WHERE id = ? ",
    [
      user.name,
      user.email,
      user.username,
      user.phone,
      user.image,
      user.city,
      user.country,
      user.tagline,
      user.category,
      user.subcategory,
      user.salary_max,
      user.salary_min,
      user.dob,
      user.facebook,
      user.twitter,
      user.instagram,
      user.linkedin,
      user.youtube,
      user.website,
      user.description,
      userId,
    ],
    function (error, data) {
      if (!error) {
        if (data.affectedRows > 0) {
          res.status(200).json({
            status: "sucess",
            data: null,
            message: "Profile Updated succesfully",
          });
        } else {
          res.status(401).json({
            status: "failed",
            data: null,
            message: "Failed to update profile",
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

export const updateProfilePhoto = (req: Request, res: Response) => {
  if (req.file === undefined) {
    return res.status(404).json({ message: "Please upload a file first" });
  }
  const id = req.params.id;
  try {
    con.query(
      "UPDATE tron_user SET image = ? WHERE id = ? ",
      [req.file.filename, id],
      function (error, data) {
       

        if (data.affectedRows > 0) {
          return res.status(201).json({
            status: "success",
            data:null,
            message: "Please uploaded successfully",
          });
        } else {
          return res.status(400).json({ message: "Image uploading error" });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
