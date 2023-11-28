var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: { type: String, default: "" },
  date_created: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

projectSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

projectSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("Project", projectSchema);
