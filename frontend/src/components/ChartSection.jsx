import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

export default function ChartSection({ data }) {
  if (!data?.length) {
    return (
      <section className="card">
        <h3>Monthly Category Breakdown</h3>
        <p className="muted">No expenses for this month yet.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h3>Monthly Category Breakdown</h3>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="amount" nameKey="name" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
