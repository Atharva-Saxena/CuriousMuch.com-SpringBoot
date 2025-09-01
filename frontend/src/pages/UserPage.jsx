
import React, { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "" });
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch all users
  const fetchUsers = () => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ id: "", name: "" });
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  // Start editing
  const startEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, name: editName }),
    });
    setEditId(null);
    setEditName("");
    fetchUsers();
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
          <li key={u.id} className="border-b py-2 flex justify-between items-center">
            {editId === u.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 w-full">
                <input
                  className="border px-2 py-1 rounded w-2/4"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
                <button className="bg-green-600 text-white px-2 py-1 rounded" type="submit">Save</button>
                <button className="bg-gray-300 px-2 py-1 rounded" type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span>{u.id}: {u.name}</span>
                <div className="flex gap-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => startEdit(u.id, u.name)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(u.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

