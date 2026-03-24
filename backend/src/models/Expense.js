import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    spentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
