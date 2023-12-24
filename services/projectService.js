const User = require("../models/User");
const Project = require("../models/Project");
const Study = require("../models/ProjectStudy");
const Scan = require("../models/ImageSeries");
const Image = require("../models/Image");
const Subject = require("../models/Subject");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getProjects: async (req, res) => {
    let u = await Project.find();
    res.apiSuccess(u);
  },

  getProjectById: async (req, res) => {
    let { id } = req.params;
    let u = await Project.findById(id);
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No project found", 404);
  },

  createProject: async (req, res) => {
    let { name, description } = req.body;
    if (!name) return res.apiError("Name is required");
    let u = await await Project.findOne({ name: name });
    if (u) {
      return res.apiError(`Project name with ${name} already exist!`);
    } else {
      u = await Project.create({ name, description });
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
  },

  updateProject: async (req, res) => {
    let { name, description } = req.body;
    let uniqueName = await Project.findOne({ name: name });
    let id = req.params.id;
    let documentExists = await Project.findOne({ _id: id });

    if (!documentExists) {
      return res.apiError("No project found");
    }

    if (uniqueName) {
      return res.apiError(`Project with name ${name} already exists! `);
    } else {
      let u = await Project.updateOne(
        { _id: id },
        { $set: { name: name, description: description } }
      );
      if (u) {
        let data = {
          ...u,
          name,
          description,
        };
        return res.apiSuccess(data);
      }
    }
  },

  updateProjectStatus: async (req, res) => {
    let { status, id } = req.body;
    let u = await Project.updateOne({ _id: id }, { $set: { status } });
    if (u) {
      x;
      let data = {
        ...u,
        status,
        id,
      };
      return res.apiSuccess(data);
    }
    return res.apiError("No project found");
  },

  deleteProject: async (req, res) => {
    let id = req.params.id;
    //finds and deletes all studies, scans, images, and subjects associated with the project
    let projectFound = await Project.findById(id);
    if (projectFound) {
      let studyFound = await Study.find({ project: id });
      let subjectFound = await Subject.find({ project: id });
      if (subjectFound) {
        await Subject.deleteMany({ project: id });
      }
      if (studyFound) {
        let scanFound = await Scan.find({ study: studyFound._id });
        if (scanFound) {
          let imageFound = await Image.find({ scan: scanFound._id });
          if (imageFound) {
            await Image.deleteMany({ scan: scanFound._id });
          }
          await Scan.deleteMany({ study: studyFound._id });
        }
        await Study.deleteMany({ project: id });
      }
      await Project.deleteOne({ _id: id });
      return res.apiSuccess(u);
    }
    return res.apiError("No project found");
  },
};
