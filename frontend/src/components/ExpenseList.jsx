export default function ExpenseList({ expenses, filters, setFilters, onDelete }) {
  const visible = expenses
    .filter((item) =>
      filters.categoryId ? item.category?._id === filters.categoryId : true
    )
    .filter((item) => {
      const text = `${item.note || ""} ${item.category?.name || ""}`.toLowerCase();
      return text.includes(filters.search.toLowerCase());
    })
    .sort((a, b) =>
      filters.sortBy === "amount"
        ? b.amount - a.amount
        : new Date(b.spentAt).getTime() - new Date(a.spentAt).getTime()
    );

  return (
    <section className="card">
      <div className="row">
        <h3>Recent Expenses</h3>
        <input
          placeholder="Search"
          value={filters.search}
          onChange={(event) => setFilters({ ...filters, search: event.target.value })}
        />
      </div>
      <div className="row">
        <select
          value={filters.categoryId}
          onChange={(event) => setFilters({ ...filters, categoryId: event.target.value })}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(expenses.map((e) => e.category?._id)))
            .filter(Boolean)
            .map((id) => {
              const category = expenses.find((e) => e.category?._id === id)?.category;
              return (
                <option key={id} value={id}>
                  {category?.name}
                </option>
              );
            })}
        </select>
        <select
          value={filters.sortBy}
          onChange={(event) => setFilters({ ...filters, sortBy: event.target.value })}
        >
          <option value="latest">Latest</option>
          <option value="amount">Amount</option>
        </select>
      </div>
      <ul className="list">
        {visible.map((item) => (
          <li key={item._id} className="list-item">
            <div>
              <strong>${item.amount.toFixed(2)}</strong>
              <p className="muted">{item.category?.name || "Unknown"}</p>
              {item.note && <p>{item.note}</p>}
            </div>
            <button className="danger" onClick={() => onDelete(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
