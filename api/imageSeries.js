var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");
const ImageSeriesService = require("../services/imageSeriesService");

router.post(
  "/",
  asyncHandler((req, res, next) => {
    return ImageSeriesService.createImageSeries(req, res);
  })
);
router.put(
  "/",
  asyncHandler((req, res, next) => {
    return ImageSeriesService.updateImageSeries(req, res);
  })
);
router.get(
  "/",
  asyncHandler((req, res, next) => {
    return ImageSeriesService.getImageSeries(req, res);
  })
);
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return ImageSeriesService.getImageSeriesById(req, res);
  })
);

module.exports = router;
