import express from "express";
import con from "./db";

const app = express();
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/config.env" });
import routing from "./src/route/indexRoute";

app.use(
  express.json({
    limit: "15kb",
  })
);

app.use("/api/v1", routing);


app.use('*', (req, res, next) => {
 res.status(400).json({status:"failed", data: null, message:"undefine route"});
});

app.listen(4300, () => console.log(`Example app listening on port 4300!`));
