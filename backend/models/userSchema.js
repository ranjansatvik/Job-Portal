import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT token for auth
userSchema.methods.getJWTToken = function () {
  const jwtExpiresIn = process.env.JWT_EXPIRE;

  let expiresIn;
  if (!isNaN(jwtExpiresIn)) {
    expiresIn = parseInt(jwtExpiresIn, 10) / 1000; // Convert to seconds
  } else {
    expiresIn = jwtExpiresIn; // Assume it's a valid timespan string
  }

  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });
};

export const User = mongoose.model("User", userSchema);
