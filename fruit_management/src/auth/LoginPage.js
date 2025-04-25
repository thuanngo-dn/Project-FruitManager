import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../Style/login.css"; 

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const user = data.find(
        (u) =>
          u.username.trim() === form.username.trim() &&
          u.password === form.password
      );

      if (!user) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      login(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin/list-fruit");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Lỗi khi login:", err);
      alert("⚠️ Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Đăng nhập</button>

        <p className="login-switch-text">
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")} className="login-link">
            Đăng ký
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
