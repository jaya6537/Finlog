import { useState } from "react";

export default function CategoryForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("tag");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    await onSubmit({ name, icon });
    setName("");
    setIcon("tag");
  };

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h3>Add Category</h3>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Icon text (e.g. car)"
        value={icon}
        onChange={(event) => setIcon(event.target.value)}
      />
      <button type="submit">Create Category</button>
    </form>
  );
}
