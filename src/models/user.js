const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const Task = require("./tasks");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    },
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Invalid password: cannot contain 'password");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Virtual property = relation between 2 entities (this is just for mongoose, not stored in the database)
userSchema.virtual("tasks", {
  ref: "Tasks",
  localField: "_id",
  foreignField: "owner",
});

// Instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "whtyughvbikfc");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Model method
userSchema.statics.findByCredentials = async (email, pw) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcyrpt.compare(pw, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Middleware
// Hash the plain text pw before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcyrpt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre("remove", async function (req, res, next) {
  const user = this;
  await Task.deleteMany({
    owner: user._id,
  });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
