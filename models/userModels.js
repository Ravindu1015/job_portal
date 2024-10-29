import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// JWT creation method
userSchema.methods.createJWT = function () {
  return JWT.sign(
    { userid: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "1d" } // Fallback to 1 day if env not set
  );
};

export default mongoose.model("User", userSchema);
