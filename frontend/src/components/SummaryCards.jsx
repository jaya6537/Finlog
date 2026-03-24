export default function SummaryCards({ totals }) {
  const cards = [
    { label: "Today", value: totals?.today || 0 },
    { label: "This Week", value: totals?.week || 0 },
    { label: "This Month", value: totals?.month || 0 },
  ];

  return (
    <section className="cards-grid">
      {cards.map((card) => (
        <article key={card.label} className="card">
          <p className="muted">{card.label}</p>
          <h3>${Number(card.value).toFixed(2)}</h3>
        </article>
      ))}
    </section>
  );
}
