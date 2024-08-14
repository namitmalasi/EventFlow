const express = require("express");
const { connectMongoDB } = require("./config/db-config");

const app = express();
require("dotenv").config();

connectMongoDB();
const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
