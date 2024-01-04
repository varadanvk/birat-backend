var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectStudySchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  subject: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  name: { type: String, default: "" },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  date_created: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

projectStudySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

projectStudySchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

projectStudySchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("ProjectStudy", projectStudySchema);
