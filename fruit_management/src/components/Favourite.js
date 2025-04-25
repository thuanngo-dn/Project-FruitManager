
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("currentUser"))?.userid;


  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`favouriteFruits_${userId}`);
      if (saved) {
        setFavourites(JSON.parse(saved));
      }
    }
  }, [userId]);

  const handleRemove = (id) => {
    const updated = favourites.filter(fruit => fruit.id !== id);
    setFavourites(updated);
    localStorage.setItem(`favouriteFruits_${userId}`, JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Trái cây yêu thích của bạn</h2>
      {favourites.length === 0 ? (
        <p>Bạn chưa yêu thích trái cây nào cả </p>
      ) : (
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {favourites.map((fruit, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0.5rem 0",
                padding: "0.75rem 1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span
                onClick={() => navigate(`/fruits/${fruit.id}`)}
                style={{ cursor: "pointer", flex: 1 }}
              >
                <strong>{fruit.name}</strong> – {fruit.family}
              </span>
              <button
                onClick={() => handleRemove(fruit.id)}
                style={{
                  marginLeft: "1rem",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourite;