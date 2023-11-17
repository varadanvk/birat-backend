var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  return res.json({ d: "Working Upload API" });
});

const asyncHandler = require("express-async-handler");
const UploadService = require("../services/uploadService");
const upload = require("../middlewares/multerFileUpload");

router.post(
  "/file",
  upload.single("file"),
  asyncHandler((req, res, next) => {
    return UploadService.uploadFile(req, res);
  })
);

router.post(
  "/image",
  asyncHandler((req, res, next) => {})
);

module.exports = router;
