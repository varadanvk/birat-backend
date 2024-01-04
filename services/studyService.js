const User = require("../models/User");
const ProjectStudy = require("../models/ProjectStudy");
const Scan = require("../models/ImageSeries");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getProjectStudy: async (req, res) => {
    let { id } = req.params;
    let u = await ProjectStudy.find({ project: id, owner: req.user.userId });
    res.apiSuccess(u);
  },

  getProjectStudyById: async (req, res) => {
    let { id } = req.params;
    let u = await ProjectStudy.findOne({ _id: id, owner: req.user.userId });
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No ProjectStudy found", 404);
  },

  createProjectStudy: async (req, res) => {
    let { name, description, project, subject } = req.body;
    if (!name) return res.apiError("Name is required");

    let u = await ProjectStudy.findOne({
      name,
      project,
      owner: req.user.userId,
    });
    if (u) {
      return res.apiError(`Project Study name with ${name} already exists!`);
    } else {
      u = await ProjectStudy.create({
        name,
        description,
        project,
        subject,
        owner: req.user.userId,
      });
      let data = { ...u };
      return res.apiSuccess(data);
    }
  },

  updateProjectStudy: async (req, res) => {
    let { name, _id } = req.body;
    let documentExists = await ProjectStudy.findOne({
      _id,
      owner: req.user.userId,
    });

    if (!documentExists) {
      return res.apiError("No Project Study found", 404);
    } else {
      let u = await ProjectStudy.updateOne(
        { _id, owner: req.user.userId },
        { $set: { name } }
      );
      if (u) {
        let data = { ...u, name };
        return res.apiSuccess(data);
      }
    }
  },

  deleteProjectStudy: async (req, res) => {
    let { id } = req.params;
    let studyFound = await ProjectStudy.findOne({
      _id: id,
      owner: req.user.userId,
    });
    if (!studyFound) {
      return res.apiError("No Project Study found", 404);
    } else {
      let scansFound = await Scan.find({ project_study: id });
      if (scansFound) {
        await Scan.deleteMany({ project_study: id });
      }
      await ProjectStudy.deleteOne({ _id: id });
      return res.apiSuccess("Project Study deleted successfully");
    }
  },
};
