import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      minlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "work location required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);