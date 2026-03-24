import Expense from "../models/Expense.js";

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return startOfDay(new Date(d.setDate(diff)));
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const getDashboardStats = async (_req, res, next) => {
  try {
    const now = new Date();
    const dayStart = startOfDay(now);
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);

    const [todayAgg, weekAgg, monthAgg, monthlyByCategory] = await Promise.all([
      Expense.aggregate([{ $match: { spentAt: { $gte: dayStart } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Expense.aggregate([{ $match: { spentAt: { $gte: weekStart } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Expense.aggregate([{ $match: { spentAt: { $gte: monthStart } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Expense.aggregate([
        { $match: { spentAt: { $gte: monthStart } } },
        { $group: { _id: "$category", amount: { $sum: "$amount" } } },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        { $project: { _id: 0, categoryId: "$category._id", name: "$category.name", icon: "$category.icon", amount: 1 } },
        { $sort: { amount: -1 } },
      ]),
    ]);

    res.json({
      totals: {
        today: todayAgg[0]?.total || 0,
        week: weekAgg[0]?.total || 0,
        month: monthAgg[0]?.total || 0,
      },
      monthlyByCategory,
    });
  } catch (error) {
    next(error);
  }
};
