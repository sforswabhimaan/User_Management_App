import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>User Management App</h1>
        <nav>
          <Link to="/">🏠 Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;