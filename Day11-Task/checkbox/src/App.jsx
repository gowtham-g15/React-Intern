import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });
                                              //23EC036 GOWTHAM G
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const roles = checked
          ? [...prev.roles, value]
          : prev.roles.filter((role) => role !== value);
        return { ...prev, roles };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login Data:", formData);
      alert("Logged In Successfully!");
    } else {
      console.log("Signup Data:", formData);
      alert("Signed Up Successfully!");
    }
    setFormData({ name: "", email: "", password: "", roles: [] });
  };

  return (
    <div className="app-container">
      <div className="form-box">
        <h2 className="form-title">{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit} className="form-content">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="form-input"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-input"
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="roles"
                value="ROLE_ADMIN"
                checked={formData.roles.includes("ROLE_ADMIN")}
                onChange={handleChange}
              />
              <span className="admin-label">Admin</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="ROLE_USER"
                checked={formData.roles.includes("ROLE_USER")}
                onChange={handleChange}
              />
              <span className="user-label">User</span>
            </label>
          </div>

          <button type="submit" className="form-button">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="switch-button">
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default App;
