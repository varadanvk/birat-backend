const User = require("../models/User");
const Subject = require("../models/Subject");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getSubjects: async (req, res) => {
    let subjects = await Subject.find();
    res.apiSuccess(subjects);
  },

  getSubjectById: async (req, res) => {
    let { _id } = req.body;
    let subject = await Subject.findById(_id);
    if (subject) {
      return res.apiSuccess(subject);
    }
    return res.apiError("No subject found");
  },

  createSubject: async (req, res) => {
    let { name } = req.body;
    if (!name) return res.apiError("Name is required");
    let existingSubject = await Subject.findOne({ name: name });
    if (existingSubject) {
      return res.apiError(`Subject with name ${name} already exists!`);
    } else {
      let newSubject = await Subject.create({ name });
      return res.apiSuccess(newSubject);
    }
  },

  updateSubject: async (req, res) => {
    let { name, _id } = req.body;
    let updateResult = await Subject.updateOne({ _id }, { $set: { name } });
    if (updateResult.nModified === 0) {
      return res.apiError("No subject found or no changes made");
    }
    let updatedSubject = await Subject.findById(_id);
    return res.apiSuccess(updatedSubject);
  },

  deleteSubject: async (req, res) => {
    let { _id } = req.body;
    let subject = await Subject.findById(_id);
    if (subject) {
      await Subject.deleteOne({ _id });
      return res.apiSuccess({ message: "Subject deleted successfully" });
    }
    return res.apiError("No subject found");
  },
};
