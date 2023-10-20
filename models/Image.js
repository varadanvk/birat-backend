var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageFileSchema = new Schema({
  image_series: { type: Schema.Types.ObjectId, ref: "ImageSeries" },
  name: { type: String, default: "" },
});

imageFileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

imageFileSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

imageFileSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Image", imageFileSchema);
