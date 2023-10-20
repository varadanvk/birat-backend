var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");
const PublicService = require("../services/publicService");

router.post(
  "/",
  asyncHandler((req, res, next) => {
    return PublicService.allUsers(req, res);
  })
);
router.put(
  "/",
  asyncHandler((req, res, next) => {
    return PublicService.allUsers(req, res);
  })
);
router.get(
  "/",
  asyncHandler((req, res, next) => {
    return PublicService.allUsers(req, res);
  })
);
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return PublicService.allUsers(req, res);
  })
);

module.exports = router;
