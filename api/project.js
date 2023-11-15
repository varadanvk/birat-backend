var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");
const ProjectService = require("../services/publicService");

router.post(
  "/",
  asyncHandler((req, res, next) => {
    return ProjectService.createProject(req, res);
  })
);
router.put(
  "/",
  asyncHandler((req, res, next) => {
    return ProjectService.updateProject(req, res);
  })
);
router.get(
  "/",
  asyncHandler((req, res, next) => {
    return ProjectService.getProject(req, res);
  })
);
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return ProjectService.getProjectById(req, res);
  })
);

module.exports = router;
