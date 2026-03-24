import Expense from "../models/Expense.js";

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find()
      .populate("category", "name icon")
      .sort({ spentAt: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { amount, category, note, spentAt } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required." });
    }

    const expense = await Expense.create({ amount, category, note, spentAt });
    const populatedExpense = await expense.populate("category", "name icon");
    res.status(201).json(populatedExpense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expense deleted." });
  } catch (error) {
    next(error);
  }
};
