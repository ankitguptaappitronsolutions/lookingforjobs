import express from 'express';
import mysql from "mysql";
const app = express();
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

 const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});
con.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

export default con;
