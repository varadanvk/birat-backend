const User = require("../models/User");
const Subject = require("../models/Subject");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");
const ProjectStudy = require("../models/ProjectStudy");

function checkAuth(req, res, next) {
  if (!req.user) return res.apiError("Unauthorized access", 401);
  next();
}

module.exports = {
  getSubjects: async (req, res) => {
    // Authorization check
    checkAuth(req, res, next);

    let { id } = req.params;
    let subjects = await Subject.find({ project: id, owner: req.user.userId });
    res.apiSuccess(subjects);
  },

  getSubjectById: async (req, res) => {
    // Authorization check
    checkAuth(req, res, next);

    let { _id } = req.body;
    let subject = await Subject.findOne({ _id, owner: req.user.userId });
    if (subject) {
      return res.apiSuccess(subject);
    }
    return res.apiError("No subject found", 404);
  },

  createSubject: async (req, res) => {
    // Authorization check
    checkAuth(req, res, next);

    let { name, description, project } = req.body;
    if (!name) return res.apiError("Name is required");
    let existingSubject = await Subject.findOne({
      name,
      project,
      owner: req.user.userId,
    });
    if (existingSubject) {
      return res.apiError(`Subject with name ${name} already exists!`);
    } else {
      let newSubject = await Subject.create({
        name,
        description,
        project,
        owner: req.user.userId,
      });
      return res.apiSuccess(newSubject);
    }
  },

  updateSubject: async (req, res) => {
    // Authorization check
    checkAuth(req, res, next);

    let { name, _id } = req.body;
    let updateResult = await Subject.updateOne(
      { _id, owner: req.user.userId },
      { $set: { name } }
    );
    if (updateResult.nModified === 0) {
      return res.apiError("No subject found or no changes made", 404);
    }
    let updatedSubject = await Subject.findOne({ _id, owner: req.user.userId });
    return res.apiSuccess(updatedSubject);
  },

  deleteSubject: async (req, res) => {
    // Authorization check
    checkAuth(req, res, next);

    let { _id } = req.body;
    let subject = await Subject.findOne({ _id, owner: req.user.userId });
    if (subject) {
      await Subject.deleteOne({ _id });
      return res.apiSuccess({ message: "Subject deleted successfully" });
    }
    return res.apiError("No subject found", 404);
  },
};
