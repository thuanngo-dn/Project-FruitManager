import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Evaluate from "../components/Evaluate";

const DetailFruit = () => {
  const { id } = useParams();
  const [fruit, setFruit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3002/fruits/${id}`)
      .then((res) => setFruit(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết trái cây:", err);
        navigate("/listfruit");
      });
  }, [id, navigate]);

  if (!fruit) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Chi tiết trái cây: {fruit.name}</h2>

      <p><strong>Family:</strong> {fruit.family}</p>
      <p><strong>Order:</strong> {fruit.order}</p>
      <p><strong>Genus:</strong> {fruit.genus}</p>

      <h3 style={{ marginTop: "1rem" }}>Thông tin dinh dưỡng:</h3>
      <ul>
        <li><strong>Calories:</strong> {fruit.nutritions.calories}</li>
        <li><strong>Fat:</strong> {fruit.nutritions.fat}</li>
        <li><strong>Sugar:</strong> {fruit.nutritions.sugar}</li>
        <li><strong>Carbohydrates:</strong> {fruit.nutritions.carbohydrates}</li>
        <li><strong>Protein:</strong> {fruit.nutritions.protein}</li>
      </ul>

      <hr />
      <Evaluate fruitId={id} />

      <button
        onClick={() => navigate("/listfruit")}
        style={buttonStyle}
      >
        ← Quay lại danh sách
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default DetailFruit;
