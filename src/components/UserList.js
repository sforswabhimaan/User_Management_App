import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        alert("User deleted (simulated)");
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch(() => alert("Delete failed"));
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <Link to="/create" className="btn">➕ Create User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link> - {user.email} - {user.phone}
            <Link to={`/edit/${user.id}`}>✏️ Edit</Link>
            <button onClick={() => handleDelete(user.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;