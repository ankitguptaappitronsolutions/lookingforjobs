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


const port = process.env.PORT || 4300;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

