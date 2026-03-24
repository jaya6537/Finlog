import { useState } from "react";

export default function ExpenseForm({ categories, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amount || !category) return;
    await onSubmit({
      amount: Number(amount),
      category,
      note,
      spentAt: new Date().toISOString(),
    });
    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h3>Add Expense</h3>
      <input
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">Select Category</option>
        {categories.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="submit">Save Expense</button>
    </form>
  );
}
