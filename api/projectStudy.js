var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");
const StudyService = require("../services/studyService");

router.post(
  "/",
  asyncHandler((req, res, next) => {
    return StudyService.createProjectStudy(req, res);
  })
);
router.put(
  "/",
  asyncHandler((req, res, next) => {
    return StudyService.updateProjectStudy(req, res);
  })
);
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return StudyService.getProjectStudy(req, res);
  })
);
router.get(
  "/by-id/:id",
  asyncHandler((req, res, next) => {
    return StudyService.getProjectStudyById(req, res);
  })
);
router.delete(
  "/:id",
  asyncHandler((req, res, next) => {
    return StudyService.deleteProjectStudy(req, res);
  })
);

module.exports = router;
