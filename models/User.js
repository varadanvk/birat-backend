var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, default: "" },
  university: { type: String, default: "" },
  department: { type: String, default: "" },
  lab: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

userSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("User", userSchema);
