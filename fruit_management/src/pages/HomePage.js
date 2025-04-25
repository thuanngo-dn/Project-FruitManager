import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import axios from "axios";

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [fruits, setFruits] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const userId = currentUser?.userid;
  const [favouriteFruits, setFavouriteFruits] = useState(() => {
    const saved = localStorage.getItem(`favouriteFruits_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    axios.get("http://localhost:3002/fruits")
      .then((res) => setFruits(res.data))
      .catch((err) => console.error("Lỗi khi tải danh sách trái cây:", err));
  }, []);

  const handleSearch = (keyword) => {
    const keywordLower = keyword.toLowerCase();
    const results = fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(keywordLower)
    );
    setSearchResults(results);
  };

  const toggleFavourite = (fruit) => {
    const exists = favouriteFruits.some(f => f.id === fruit.id);
    let updated;
    if (exists) {
      updated = favouriteFruits.filter(f => f.id !== fruit.id);
    } else {
      updated = [...favouriteFruits, fruit];
    }
    setFavouriteFruits(updated);
    localStorage.setItem(`favouriteFruits_${userId}`, JSON.stringify(updated));

  };

  const isFavourite = (fruitId) =>
    favouriteFruits.some(f => f.id === fruitId);

  if (!currentUser) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{
        position: "absolute", top: "1rem", right: "1rem",
        display: "flex", gap: "0.5rem"
      }}>
        <button onClick={() => navigate("/listfruit")} style={buttonStyle("#28a745")}>List Fruit</button>
        <button onClick={() => navigate("/favourite")} style={buttonStyle("#dc3545")}>❤️ Yêu thích</button>
        <button onClick={() => navigate("/profile")} style={buttonStyle("#007bff")}>Profile</button>
      </div>

      <h2>Chào mừng đến với thế giới trái cây </h2>

      <Search onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <div>
          <h4>Kết quả tìm kiếm:</h4>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            {searchResults.map(fruit => (
              <div
                key={fruit.id}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  position: "relative"
                }}
              >
                <div onClick={() => navigate(`/fruits/${fruit.id}`)} style={{ cursor: "pointer" }}>
                  <h4>{fruit.name}</h4>
                  <p><strong>Family:</strong> {fruit.family}</p>
                  <p><strong>Calories:</strong> {fruit.nutritions.calories}</p>
                </div>

                <span
                  onClick={() => toggleFavourite(fruit)}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: isFavourite(fruit.id) ? "red" : "white",
                    textShadow: isFavourite(fruit.id) ? "none" : "0 0 1px black",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  title={isFavourite(fruit.id) ? "Bỏ yêu thích" : "Thêm yêu thích"}
                >
                  ♥
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = (bgColor) => ({
  padding: "0.5rem 1rem",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
});

export default HomePage;
