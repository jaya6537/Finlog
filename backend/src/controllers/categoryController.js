import Category from "../models/Category.js";
import Expense from "../models/Expense.js";

const defaultCategories = [
  { name: "Food", icon: "utensils" },
  { name: "Transport", icon: "car" },
  { name: "Shopping", icon: "bag" },
  { name: "Bills", icon: "file-text" },
  { name: "Other", icon: "more-horizontal" },
];

export const seedDefaultCategories = async () => {
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(defaultCategories);
  }
};

export const getCategories = async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, icon } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const category = await Category.create({ name, icon });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Expense.deleteMany({ category: id });
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category and related expenses deleted." });
  } catch (error) {
    next(error);
  }
};
