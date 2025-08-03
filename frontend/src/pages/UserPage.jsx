import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "" });

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ id: "", name: "" });
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(setUsers);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Users</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          className="border px-2 py-1 rounded w-1/4"
          placeholder="ID"
          value={form.id}
          onChange={e => setForm({ ...form, id: e.target.value })}
          required
        />
        <input
          className="border px-2 py-1 rounded w-2/4"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <button
          className="bg-primary text-white px-4 py-1 rounded hover:bg-red-700"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul>
        {users.map(u => (
          <li key={u.id} className="border-b py-2 flex justify-between">
            <span>{u.id}: {u.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}