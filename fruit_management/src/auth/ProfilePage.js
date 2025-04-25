import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/profile.css";

axios.defaults.baseURL = "http://localhost:3000";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const currentUser = user || JSON.parse(localStorage.getItem("currentUser"));
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    name: currentUser?.name || "",
    address: currentUser?.address || "",
    dob: currentUser?.dob || "",
    gender: currentUser?.gender || "Khác",
    role: currentUser?.role || "user",
  });
  const [userId] = useState(currentUser?.id || currentUser?.userid);

  useEffect(() => {
    if (!userId) {
      console.error("Không có ID người dùng.");
      return;
    }

    axios.get(`/users/${userId}`)
      .then(res => {
        const data = res.data;
        setForm(prev => ({
          ...prev,
          name: data.name || "",
          address: data.address || "",
          dob: data.dob || "",
          gender: data.gender || "Khác",
          role: data.role || "user"
        }));
      })
      .catch(err => console.error("Lỗi khi lấy dữ liệu người dùng:", err));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!userId) {
      alert("Không tìm thấy ID người dùng.");
      return;
    }

    const updatePayload = {
      name: form.name || "",
      address: form.address || "",
      dob: form.dob || "",
      gender: form.gender || "Khác",
      role: form.role || "user"
    };

    axios.patch(`/users/${userId}`, updatePayload)
      .then(() => {
        alert("Cập nhật thành công 🎉");
        const updatedUser = { ...currentUser, ...updatePayload };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        window.location.reload();
      })
      .catch(err => {
        console.error("Lỗi cập nhật:", err.response?.data || err.message || err);
        alert("Có lỗi khi cập nhật! Mở console (F12) để xem chi tiết.");
      });
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3 className="profile-title">Hồ sơ người dùng</h3>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Tên người dùng:</label>
            <input value={form.username} readOnly className="profile-input" />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input value={form.email} readOnly className="profile-input" />
          </div>
          <div className="profile-field">
            <label>Họ và tên:</label>
            <input name="name" value={form.name} readOnly={!editMode} onChange={handleChange} className="profile-input" />
          </div>
          <div className="profile-field">
            <label>Địa chỉ:</label>
            <input name="address" value={form.address} readOnly={!editMode} onChange={handleChange} className="profile-input" />
          </div>
          <div className="profile-field">
            <label>Ngày sinh:</label>
            <input type="date" name="dob" value={form.dob} readOnly={!editMode} onChange={handleChange} className="profile-input" />
          </div>
          <div className="profile-field">
            <label>Giới tính:</label>
            <select name="gender" value={form.gender} disabled={!editMode} onChange={handleChange} className="profile-input">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Vai trò:</label>
            <input value={form.role} readOnly className="profile-input" />
          </div>
        </div>
        <div className="profile-actions">
          {!editMode ? (
            <button className="button-edit" onClick={() => setEditMode(true)}>Chỉnh sửa hồ sơ</button>
          ) : (
            <button className="button-save" onClick={handleUpdate}>Cập nhật hồ sơ</button>
          )}
          <button className="button-logout" onClick={handleLogout}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
