var express = require("express");
const app = express();

const userRoute = require("./user");
const publicRoute = require("./public");
// const uploadRoute = require("./upload");
const projectRoute = require("./project");

app.use("/user", userRoute);
app.use("/public", publicRoute);
// app.use("/upload", uploadRoute);
app.use("/project", projectRoute);

module.exports = app;
