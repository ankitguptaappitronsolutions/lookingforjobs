import { Request, Response } from "express";
import con from "../../../db";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/config.env" });



export const category = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    con.query(
        "Select * from  tron_catagory_main",
        function (error, data) {

            if (!error) {
                if (data.length > 0) {
                    return res.status(200).json({
                        status: "success",
                        data,
                        total: data.length,
                        message: "category list"
                    })
                }
                else {
                    return res
                        .status(404)
                        .json({
                            status: "failed",
                            data: null,
                            message: "category not available"
                        });
                }
            }
            else {
                return res.status(400).json({
                    status: "success",
                    data,
                    message: "category list"
                })
            }
        })


}

export const latestJob = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    con.query(
        "Select * from  tron_product where  status = 'active' order by id desc limit 0,10",
        function (error, data) {

            if (!error) {
                if (data.length > 0) {
                    return res.status(200).json({
                        status: "success",
                        data,
                        total: data.length,
                        message: "Latest job list"
                    })
                }
                else {
                    return res
                        .status(404)
                        .json({
                            status: "failed",
                            data: null,
                            message: "job not available"
                        });
                }
            }
            else {
                return res.status(400).json({
                    status: "success",
                    data,
                    message: "Latest job list"
                })
            }
        })


}

export const featuredJob = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    con.query(
        "Select * from  tron_product where featured = '1' and status = 'active' order by id desc limit 0,10",
        function (error, data) {

            if (!error) {
                if (data.length > 0) {
                    return res.status(200).json({
                        status: "success",
                        data,
                        total: data.length,
                        message: "Latest job list"
                    })
                }
                else {
                    return res
                        .status(404)
                        .json({
                            status: "failed",
                            data: null,
                            message: "job not available"
                        });
                }
            }
            else {
                return res.status(400).json({
                    status: "success",
                    data,
                    message: "Latest job list"
                })
            }
        })


}
