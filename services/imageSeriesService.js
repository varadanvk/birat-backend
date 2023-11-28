const User = require("../models/User");
const ImageSeries = require("../models/ImageSeries");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getImageSeries: async (req, res) => {
    let { id } = req.params;
    let u = await ImageSeries.find({ project_study: id });
    res.apiSuccess(u);
  },

  getImageSeriesById: async (req, res) => {
    let { _id } = req.body;
    let u = await ImageSeries.findById(_id);
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No ImageSeries found");
  },

  createImageSeries: async (req, res) => {
    let { name, description, projectStudy, modality } = req.body;
    if (!name) return res.apiError("Name is required");
    let u = await ImageSeries.findOne({ name, project_study: projectStudy });
    if (u) {
      return res.apiError(`Image Series name with ${name} already exist!`);
    } else {
      u = await ImageSeries.create({
        name,
        description,
        modality,
        project_study: projectStudy,
      });
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
  },

  updateImageSeries: async (req, res) => {
    let { name, _id } = req.body;
    let u = await User.updateOne({ _id }, { $set: { name } });
    if (u) {
      let data = {
        ...u,
      };
      return res.apiSuccess(data);
    }
    return res.apiError("No Image Series found");
  },

  deleteImageSeries: async (req, res) => {
    let { _id } = req.body;
    let u = await ImageSeries.findOne({ name: name });
    if (u) {
      await User.deleteOne({ _id });
      return res.apiSuccess(null);
    }
    return res.apiError("No Image Series found");
  },
};
