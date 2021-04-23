import { Request, Response } from "express";
import bcrypt from "bcrypt";
import con from "../../../db";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/config.env" });

export const register = async (req: Request, res: Response) => {

  if (
    req.body.user_type &&
    req.body.name &&
    req.body.email &&
    req.body.username &&
    req.body.password
  ) {
    con.query(
      "SELECT * FROM tron_user where username = ?",
      [req.body.username],
      function (err, result) {
        if (result.length) {
          return res.status(400).json({
            status: "failed",
            data: null,
            message: "username is already registered",
          });
        }

        con.query(
          "SELECT * FROM tron_user where email = ?",
          [req.body.email],
          function (err, result) {
            if (err) throw err;

            if (result.length) {
              return res.status(400).json({
                status: "failed",
                data: null,
                message: "email is already registered",
              });
            } else {
              const saltRounds = 10;
              const myPlaintextPassword = req.body.password;

              bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                  const user = {
                    username: req.body.username,
                    user_type: req.body.user_type,
                    name: req.body.name,
                    email: req.body.email,
                    password_hash: hash,
                  };
                  console.log(user);

                  con.query(
                    "INSERT INTO tron_user SET ?",
                    [user],
                    function (error, results) {
                      if (result) {
                        res.status(201).json({
                          status: "success",
                          data: results,
                          message: "user succesfully registered",
                        });
                        var transporter = nodemailer.createTransport({
                          service: "gmail",
                          auth: {
                            user: "apitestingkaro@gmail.com",
                            pass: "apitestingkaro@321",
                          },
                        });

                        const token = { token: "sfnasjfaskl" };
                        var mailOptions = {
                          from: "003robingupta@gmail.com",
                          to: req.body.email,
                          subject: "WELCOME TO LOOKING FOR JOBS",
                          text:
                            "Hello " +
                            req.body.name +
                            ",\n\n" +
                            "Please verify your account by clicking the link: \nhttp://" +
                            req.headers.host +
                            "/confirmation/" +
                            user.email +
                            "/" +
                            token.token +
                            "\n\nThank You!\n",
                        };

                        transporter.sendMail(
                          mailOptions,
                          function (error, info) {
                            if (error) {
                              console.log(error);
                            } else {
                              return console.log("mail sent");
                            }
                          }
                        );
                      } else {
                        res.status(401).json({
                          status: "fail",
                          data: null,
                          message: "User registration Failed ",
                        });
                      }
                    }
                  );
                });
              });
            }
          }
        );
      }
    );
  } else {
    res.status(404).json({
      status: "failed",
      data: null,
      message: "Please fill all the required field",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  if (email) {
    con.query(
      "SELECT * FROM tron_user where email = ?",
      [email],
      function (err, result) {
        if (!result.length) {
          res.status(400).json({
            status: "failed",
            data: null,
            message: "Email does not exist",
          });
        } else {
          // if email exist in database
          const id = result[0].id;
          const password_hash = result[0].password_hash;
          const email = req.body.email;
          const JWT_SECRET = "ATHEBIGSECRET";
          const SECRET = JWT_SECRET + password_hash;

          const payload = {
            email: email,
            id: id,
          };
          const token = jwt.sign(payload, SECRET, { expiresIn: "15m" });

          const link = `http://127.0.0.1:4300/api/v1/user/resetpassword/${id}/${token}`;

          console.log(link);

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "apitestingkaro@gmail.com",
              pass: "apitestingkaro@321",
            },
          });

          var mailOptions = {
            from: "003robingupta@gmail.com",
            to: req.body.email,
            subject: "RESET PASSWORD",
            text: link,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              const resetPassword = {
                userId: id,
                token: token,
              };
              con.query(
                "INSERT INTO tron_forgot_passsword SET ?",
                [resetPassword],
                function (error, results) {
                  if (result) {
                    return res.status(200).json({
                      status: "success",
                      data: null,
                      message: "Reset password link is been sent to your email",
                    });
                  } else {
                    res.status(400).json({
                      status: "404",
                      data: null,
                      messgae: "Not able to send the password token",
                    });
                  }
                }
              );
            }
          });
        }
      }
    );
  } else {
    res.status(404).json({
      status: "failed",
      data: null,
      message: "Enter email please",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { id, token } = req.params;

  con.query(
    "select * from tron_forgot_password where token ?",
    token,
    function (err, result) {
      if (result.length > 0) {
      }
    }
  );
};