var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageSeriesSchema = new Schema({
  project_study: { type: Schema.Types.ObjectId, ref: "ProjectStudy" },
  // subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  name: { type: String, default: "" },
  date_created: { type: Date, default: Date.now },
  modality: { type: String, default: "" },
  description: { type: String, default: "" },
});

imageSeriesSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

imageSeriesSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

imageSeriesSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("ImageSeries", imageSeriesSchema);
