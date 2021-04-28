import {  Request, Response } from "express";
import con from "../../../db";

export const mixingData = async (req: Request, res: Response) => {
  const language = req.body.translation_language;

  let data: any = {};

  //getting information for privacy policy, terms and conditions and cookie policy
  const sql = "SELECT * FROM tron_pages where  translation_lang = ?";
  con.query(sql, [language], function (error, result) {
    if (!error) {
      (data.privacy_policy = result[0]),
        (data.terms_and_conditions = result[1]),
        (data.cookie_polciy = result[2]),
        //getting information for privacy FAQ
        con.query(
          "SELECT * FROM tron_faq_entries where  translation_lang = ?",
          [language],
          function (error, result1) {
            if (!error) {
              data.faq = result1;

              //  pages.set("faq", result1);
              // console.log(result1);
              // res.status(200).json({
              //   result1
              // })
              //getting information for contact details
              con.query(
                "SELECT * FROM tron_options WHERE option_id IN ('23', '24', '25', '26', '27', '28','29', 143);",
                function (error, result2) {
                  if (!error) {
                    const contactDetails = {
                      address: result2[0],
                      phone: result2[1],
                      email: result2[2],
                      latitude: result2[3],
                      longitude: result2[4],
                      footer_text: result2[5],
                      copyright_text: result2[6],
                      site_url: result2[7],
                    };
                    data.contactDetails = contactDetails;

                    //getting information for social links
                    con.query(
                      "SELECT * FROM tron_options WHERE option_id IN ('30', '31', '32', '33');",
                      function (error, socialLinks) {
                        if (!error) {
                          const socialLink = {
                            facebook_link: socialLinks[0],
                            twitter_link: socialLinks[1],
                            googleplus_link: socialLinks[2],
                            youtube_link: socialLinks[3],
                          };
                          data.socialLinks = socialLink;

                          con.query("SELECT * FROM ")

                          res.status(200).json({
                            status: "200",
                            data,
                            message: "succesfully sent the data",
                          });
                        } else {
                          console.log(error);
                          return res.status(400).json({
                            status: "failed",
                            data: null,
                            message:
                              "There is an error in fetching socialLinks",
                          });
                        }
                      }
                    );
                  } else {
                    console.log(error);
                    return res.status(400).json({
                      status: "failed",
                      data: null,
                      message: "There is an error in fetching CONTACT DETAILS",
                    });
                  }
                }
              );
            } else {
              console.log(error);
              return res.status(400).json({
                status: "failed",
                data: null,
                message: "There is an error in fetching FAQ",
              });
            }
          }
        );
    } else {
      console.log(error);
      return res.status(400).json({
        status: "failed",
        data: null,
        message:
          "There is an error in fetching privacy policy, terms and conditions and cookie policy",
      });
    }
  });
};

export const forceAppUpdate = async (req: Request, res: Response) => {
  const sql = "select * from tron_app_update ORDER BY id DESC LIMIT 1 ";
  con.query(sql, function(error, data){
    if(!error){

      if(data.length > 0) {
        return res.status(200).json({
          status:"success",
          data:data[0],
          message:"App update details"
        });
      }
      return res.status(404).json({
        status:"failed",
        data,
        message:"App update details  not found"
      });
    }
    else {
      return res.status(400).json({
        status:"failed",
        data,
        message:"Resource not found"
      });
    }
  })
}