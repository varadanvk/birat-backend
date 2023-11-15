var express = require("express");
var router = express.Router();

const asyncHandler = require("express-async-handler");
const SubjectService = require("../services/subjectService");

// Create a new subject
router.post(
  "/",
  asyncHandler((req, res, next) => {
    return SubjectService.createSubject(req, res);
  })
);

// Update an existing subject
router.put(
  "/",
  asyncHandler((req, res, next) => {
    return SubjectService.updateSubject(req, res);
  })
);

// Retrieve all subjects
router.get(
  "/",
  asyncHandler((req, res, next) => {
    return SubjectService.getSubjects(req, res);
  })
);

// Retrieve a single subject by ID
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return SubjectService.getSubjectById(req, res);
  })
);

module.exports = router;
