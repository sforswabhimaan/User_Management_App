import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser(id)
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to fetch user"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p>👤 {user.name}</p>
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
    </div>
  );
}

export default UserDetail;