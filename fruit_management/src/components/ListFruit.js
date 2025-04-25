import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3002/fruits";

const ListFruit = () => {
  const [fruits, setFruits] = useState([]);
  const [form, setForm] = useState({
    name: "",
    family: "",
    order: "",
    genus: "",
    nutritions: {
      calories: "",
      fat: "",
      sugar: "",
      carbohydrates: "",
      protein: "",
    },
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = () => {
    axios
      .get(API_URL)
      .then((res) => setFruits(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh sách trái cây:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["calories", "fat", "sugar", "carbohydrates", "protein"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        nutritions: {
          ...prev.nutritions,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fruitData = {
      name: form.name,
      family: form.family,
      order: form.order,
      genus: form.genus,
      nutritions: {
        calories: parseFloat(form.nutritions.calories),
        fat: parseFloat(form.nutritions.fat),
        sugar: parseFloat(form.nutritions.sugar),
        carbohydrates: parseFloat(form.nutritions.carbohydrates),
        protein: parseFloat(form.nutritions.protein),
      },
    };

    if (editingId) {
      axios
        .put(`${API_URL}/${editingId}`, { id: editingId, ...fruitData })
        .then(() => {
          fetchFruits();
          resetForm();
        });
    } else {
      axios.post(API_URL, fruitData).then(() => {
        fetchFruits();
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      family: "",
      order: "",
      genus: "",
      nutritions: {
        calories: "",
        fat: "",
        sugar: "",
        carbohydrates: "",
        protein: "",
      },
    });
    setEditingId(null);
  };

  const handleEdit = (fruit) => {
    setForm({
      name: fruit.name,
      family: fruit.family,
      order: fruit.order,
      genus: fruit.genus,
      nutritions: {
        calories: fruit.nutritions.calories,
        fat: fruit.nutritions.fat,
        sugar: fruit.nutritions.sugar,
        carbohydrates: fruit.nutritions.carbohydrates,
        protein: fruit.nutritions.protein,
      },
    });
    setEditingId(fruit.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      axios.delete(`${API_URL}/${id}`).then(() => fetchFruits());
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/fruits/${id}`);
  };

  const addToFavourites = (fruit) => {
    const userId = JSON.parse(localStorage.getItem("currentUser"))?.userid;
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm yêu thích!");
      return;
    }
  
    const saved = localStorage.getItem(`favouriteFruits_${userId}`);
    const parsed = saved ? JSON.parse(saved) : [];
  
    const exists = parsed.find((f) => f.id === fruit.id);
    if (!exists) {
      const updated = [...parsed, fruit];
      localStorage.setItem(`favouriteFruits_${userId}`, JSON.stringify(updated));
      alert("Đã thêm vào yêu thích! ❤️");
    } else {
      alert("Trái cây này đã có trong danh sách yêu thích");
    }
  };
  
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Danh sách trái cây</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>{editingId ? " Sửa trái cây" : " Thêm trái cây"}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <input name="name" placeholder="Tên" value={form.name} onChange={handleInputChange} required />
          <input name="family" placeholder="Family" value={form.family} onChange={handleInputChange} />
          <input name="order" placeholder="Order" value={form.order} onChange={handleInputChange} />
          <input name="genus" placeholder="Genus" value={form.genus} onChange={handleInputChange} />
          <input name="calories" placeholder="Calories" value={form.nutritions.calories} onChange={handleInputChange} />
          <input name="fat" placeholder="Fat" value={form.nutritions.fat} onChange={handleInputChange} />
          <input name="sugar" placeholder="Sugar" value={form.nutritions.sugar} onChange={handleInputChange} />
          <input name="carbohydrates" placeholder="Carbohydrates" value={form.nutritions.carbohydrates} onChange={handleInputChange} />
          <input name="protein" placeholder="Protein" value={form.nutritions.protein} onChange={handleInputChange} />
          <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ background: "gray", color: "#fff" }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <h3 style={{ cursor: "pointer" }} onClick={() => handleViewDetail(fruit.id)}>
              {fruit.name}
            </h3>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={() => handleEdit(fruit)} style={{ marginRight: "0.5rem" }}>Sửa</button>
              <button onClick={() => handleDelete(fruit.id)} style={{ marginRight: "0.5rem" }}>Xoá</button>
              <button onClick={() => addToFavourites(fruit)} style={{ color: "red" }}> ❤️ </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFruit;
