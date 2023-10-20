const User = require("../models/User");
const Project = require("../models/Project");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getProjects: async (req, res) => {
    let u = await Project.find();
    res.apiSuccess(u);
  },

  getProjectById: async (req, res) => {
    let { _id } = req.body;
    let u = await Project.findById(_id);
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No project found");
  },

  createProject: async (req, res) => {
    let { name } = req.body;
    if (!name) return res.apiError("Name is required");
    let u = await await Project.findOne({ name: name });
    if (u) {
      return res.apiError(`Project name with ${name} already exist!`);
    } else {
      u = await Project.create({ name });
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
  },

  updateProject: async (req, res) => {
    let { name, _id } = req.body;
    let u = await User.updateOne({ _id }, { $set: { name } });
    if (u) {
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
    return res.apiError("No project found");
  },

  deleteProject: async (req, res) => {
    let { _id } = req.body;
    let u = await await Project.findOne({ name: name });
    if (u) {
      await User.deleteOne({ _id });
      return res.apiSuccess(null);
    }
    return res.apiError("No project found");
  },
};
