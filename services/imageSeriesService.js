const User = require("../models/User");
const ImageSeries = require("../models/ImageSeries");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getImageSeries: async (req, res) => {
    if (!req.user) return res.apiError("Unauthorized access", 401);

    let { id } = req.params;
    let u = await ImageSeries.find({
      project_study: id,
      owner: req.user.userId,
    });
    res.apiSuccess(u);
  },

  getImageSeriesById: async (req, res) => {
    if (!req.user) return res.apiError("Unauthorized access", 401);

    let { _id } = req.body;
    let u = await ImageSeries.findOne({ _id, owner: req.user.userId });
    if (u) {
      return res.apiSuccess(u);
    }
    return res.apiError("No ImageSeries found", 404);
  },

  createImageSeries: async (req, res) => {
    if (!req.user) return res.apiError("Unauthorized access", 401);

    let { name, description, projectStudy, modality, subject } = req.body;
    if (!name) return res.apiError("Name is required");

    let u = await ImageSeries.findOne({
      name,
      project_study: projectStudy,
      owner: req.user.userId,
    });
    if (u) {
      return res.apiError(`Image Series name with ${name} already exists!`);
    } else {
      u = await ImageSeries.create({
        name,
        description,
        modality,
        project_study: projectStudy,
        subject,
        owner: req.user.userId, // Assuming each ImageSeries has an owner field
      });
      let data = { ...u };
      return res.apiSuccess(data);
    }
  },

  updateImageSeries: async (req, res) => {
    if (!req.user) return res.apiError("Unauthorized access", 401);

    let { name, _id } = req.body;
    let documentExists = await ImageSeries.findOne({
      _id,
      owner: req.user.userId,
    });

    if (!documentExists) {
      return res.apiError("No Image Series found", 404);
    } else {
      let u = await ImageSeries.updateOne(
        { _id, owner: req.user.userId },
        { $set: { name } }
      );
      if (u) {
        let data = { ...u, name };
        return res.apiSuccess(data);
      }
    }
  },

  deleteImageSeries: async (req, res) => {
    if (!req.user) return res.apiError("Unauthorized access", 401);

    let { _id } = req.body;
    let u = await ImageSeries.findOne({ _id, owner: req.user.userId });
    if (u) {
      await ImageSeries.deleteOne({ _id });
      return res.apiSuccess(null);
    }
    return res.apiError("No Image Series found", 404);
  },
};
