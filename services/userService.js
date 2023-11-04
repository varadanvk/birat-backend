const User = require("../models/User");
const jwt = require("jwt-simple");
const secret = process.env.JWT_SECRET;
const sha256 = require("sha256");

module.exports = {
  getUser: async (req, res) => {
    let user = await User.findOne({ _id: req.user.userId });
    if (user) {
      return res.apiSuccess(user);
    }
    return res.apiError("No user found", 404);
  },

  profile: async (req, res) => {
    let user = await User.findOne({ _id: req.user.userId });
    res.apiSuccess(user);
  },

  registerUser: async (req, res) => {
    let { email, password, fullName, university, department, lab } = req.body;
    if (!email) return res.apiError("Email Id is required", 400);
    if (!fullName) return res.apiError("Name is required", 400);
    if (!university) return res.apiError("University is required", 400);
    if (!lab) return res.apiError("Lab is required", 400);
    if (!department) return res.apiError("Department is required", 400);
    if (!password) return res.apiError("Password is required", 400);

    let user = await User.findOne({ email: email });
    if (user) {
      return res.apiError("Email is already registered!", 400);
    } else {
      password = sha256(password);
      otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      user = await User.create({
        email,
        password,
        name: fullName,
        isVerified: false,
        otp,
        university,
        department,
        lab,
      });
      let data = {
        name: user.name,
        token: jwt.encode(
          { userId: user.id.toString(), time: new Date().getTime() },
          secret
        ),
      };
      return res.apiSuccess(data, "User signed up successfully!");
    }
  },

  loginUser: async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      password = sha256(password);
      if (user.password == password) {
        let data = {
          name: user.name,
          token: jwt.encode(
            { userId: user.id.toString(), time: new Date().getTime() },
            secret
          ),
        };
        req.app.get("eventEmitter").emit("login", "Test event emitter");
        return res.apiSuccess(data, "User login successfully!");
      }
      return res.apiError("Email or password is incorrect", 404);
    }
    return res.apiError("Email or password is incorrect", 404);
  },

  verifyEmail: async (req, res) => {
    let { otp } = req.body;
    let user = await User.findOne({ _id: req.user.userId });
    if (user) {
      if (user.otp == otp) {
        user.otp = "";
        user.isVerified = true;
        user.save();
        return res.apiSuccess(user, "Email verified successfully!");
      }
      return res.apiError("OTP doesn't match", 404);
    }
    return res.apiError("Email or password is incorrect", 404);
  },
};
