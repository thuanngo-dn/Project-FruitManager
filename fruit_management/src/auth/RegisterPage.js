import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/login.css"; 

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return alert("Mật khẩu xác nhận không khớp!");
    }

    if (!form.email.endsWith("@gmail.com")) {
      return alert("Email phải kết thúc bằng @gmail.com");
    }

    const { data } = await axios.get("http://localhost:3000/users");
    const exists = data.find((u) => u.username === form.username);
    if (exists) return alert("Username đã tồn tại!");

    const newUserId = new Date().getTime().toString();

    await axios.post("http://localhost:3000/users", {
      userid: newUserId,
      username: form.username,
      email: form.email,
      password: form.password,
      role: "user",
    });

    alert("Đăng ký thành công!");
    navigate("/");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2>Đăng ký</h2>

        <input
          className="register-input"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="register-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Create password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <button type="submit" className="register-button">Đăng ký</button>

        <p className="register-switch-text">
          Đã có tài khoản?{' '}
          <span onClick={() => navigate("/")} className="register-link">
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;