const User = require("../models/User");
const ProjectStudy = require("../models/ProjectStudy");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getProjectStudy: async (req, res) => {
    let { id } = req.params;
    let u = await ProjectStudy.find({ project: id });
    res.apiSuccess(u);
  },

  getProjectStudyById: async (req, res) => {
    let { id } = req.params;
    let u = await ProjectStudy.findById(id);
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No ProjectStudy found");
  },

  createProjectStudy: async (req, res) => {
    let { name, description, project, subject } = req.body;
    if (!name) return res.apiError("Name is required");
    let u = await await ProjectStudy.findOne({ name, project });
    if (u) {
      return res.apiError(`Project Study name with ${name} already exist!`);
    } else {
      u = await ProjectStudy.create({ name, description, project, subject });
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
  },

  updateProjectStudy: async (req, res) => {
    let { name, _id } = req.body;
    let u = await ProjectStudy.updateOne({ _id }, { $set: { name } });
    if (u) {
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
    return res.apiError("No Project Study found");
  },

  deleteProjectStudy: async (req, res) => {
    let { _id } = req.body;
    let u = await await ProjectStudy.findOne({ name: name });
    if (u) {
      await User.deleteOne({ _id });
      return res.apiSuccess(null);
    }
    return res.apiError("No Project Study found");
  },
};
