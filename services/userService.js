const User = require("../models/User");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  profile: async (req, res) => {
    let u = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(u);
  },

  registerUser: async (req, res) => {
    let { email, password, fullName, university, department, lab } = req.body;
    if (!email) return res.apiError("Email Id is required");
    if (!fullName) return res.apiError("Name is required");
    if (!university) return res.apiError("University is required");
    if (!lab) return res.apiError("Lab is required");
    if (!department) return res.apiError("Department is required");
    if (!password) return res.apiError("Password is required");

    if (!password || password.trim().length == 0)
      return res.apiError("Password is required");
    let u = await User.findOne({ email: email });
    if (u) {
      return res.apiError("This Email Id is already registered!");
    } else {
      password = sha256(password);
      u = await User.create({
        email,
        password,
        name: fullName,
        university,
        department,
        lab,
      });
      let data = {
        name: u.name,
        token: jwt.encode(
          { userId: u.id.toString(), time: new Date().getTime() },
          secret
        ),
      };
      return res.apiSuccess(data);
    }
  },

  loginUser: async (req, res) => {
    let { emailId, password } = req.body;
    let u = await User.findOne({ emailId: emailId });
    if (u) {
      password = sha256(password);
      if (u.password == password) {
        let data = {
          name: u.name,
          token: jwt.encode(
            { userId: u.id.toString(), time: new Date().getTime() },
            secret
          ),
        };
        req.app.get("eventEmitter").emit("login", "Test event emitter");
        return res.apiSuccess(data);
      }
      return res.apiError("Invalid Password");
    }
    return res.apiError("Invalid Email Id");
  },
};
