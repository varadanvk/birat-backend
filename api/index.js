var express = require("express");
const app = express();

const userRoute = require("./user");
const publicRoute = require("./public");
const uploadRoute = require("./upload");
const projectRoute = require("./project");
const projectStudyRoute = require("./projectStudy");
const imageSeriesRoute = require("./imageSeries");

app.use("/user", userRoute);
app.use("/public", publicRoute);
app.use("/upload", uploadRoute);
app.use("/image-series", imageSeriesRoute);
app.use("/project-study", projectStudyRoute);

app.use("/project", projectRoute);

module.exports = app;
