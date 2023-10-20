var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  name: { type: String, default: "" },
  classification: { type: String, default: "" },
});

subjectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

subjectSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

subjectSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Subject", subjectSchema);
