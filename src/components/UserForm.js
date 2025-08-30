import React, { useState, useEffect } from "react";
import { createUser, getUser, updateUser } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((res) => setForm(res.data))
        .catch(() => setError("Failed to fetch user"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = id ? updateUser(id, form) : createUser(form);
    action
      .then(() => {
        alert(id ? "User updated!" : "User created!");
        navigate("/");
      })
      .catch(() => setError("Action failed"));
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Create User"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default UserForm;