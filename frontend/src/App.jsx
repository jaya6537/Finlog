import { useEffect, useState } from "react";
import apiClient from "./api/apiClient";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import CategoryForm from "./components/CategoryForm";
import ExpenseList from "./components/ExpenseList";
import ChartSection from "./components/ChartSection";

const appName = "Expense Nexus";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({ totals: { today: 0, week: 0, month: 0 }, monthlyByCategory: [] });
  const [filters, setFilters] = useState({ search: "", sortBy: "latest", categoryId: "" });

  const loadData = async () => {
    const [categoriesRes, expensesRes, statsRes] = await Promise.all([
      apiClient.get("/categories"),
      apiClient.get("/expenses"),
      apiClient.get("/stats/dashboard"),
    ]);
    setCategories(categoriesRes.data);
    setExpenses(expensesRes.data);
    setStats(statsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addExpense = async (payload) => {
    await apiClient.post("/expenses", payload);
    await loadData();
  };

  const deleteExpense = async (id) => {
    await apiClient.delete(`/expenses/${id}`);
    await loadData();
  };

  const addCategory = async (payload) => {
    await apiClient.post("/categories", payload);
    await loadData();
  };

  return (
    <main className="container">
      <header className="hero">
        <h1>{appName}</h1>
        <p>Modern MERN web edition of your expense tracker.</p>
      </header>
      <SummaryCards totals={stats.totals} />
      <section className="grid-2">
        <ExpenseForm categories={categories} onSubmit={addExpense} />
        <CategoryForm onSubmit={addCategory} />
      </section>
      <ChartSection data={stats.monthlyByCategory} />
      <ExpenseList expenses={expenses} filters={filters} setFilters={setFilters} onDelete={deleteExpense} />
    </main>
  );
}
