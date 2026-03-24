import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "tag",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
