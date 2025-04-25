
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Evaluate = ({ fruitId }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: currentUser?.username || "",
    comment: "",
    rating: 5,
  });

  const userId = currentUser?.userid;

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`reviews-${fruitId}-${userId}`);
      if (saved) {
        setReviews(JSON.parse(saved));
      }
    }
  }, [fruitId, userId]);

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = { ...reviewForm, date: new Date().toLocaleString() };
    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(`reviews-${fruitId}-${userId}`, JSON.stringify(updated));
    setReviewForm({ name: currentUser?.username || "", comment: "", rating: 5 });
  };

  return (
    <div>
      <h3>Đánh giá sản phẩm </h3>
      <form onSubmit={handleSubmitReview} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          value={reviewForm.name}
          readOnly
          style={{ ...inputStyle, backgroundColor: "#e9ecef", cursor: "not-allowed" }}
        />
        <textarea
          name="comment"
          placeholder="Nội dung đánh giá"
          value={reviewForm.comment}
          onChange={handleChange}
          required
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <select
          name="rating"
          value={reviewForm.rating}
          onChange={handleChange}
          style={inputStyle}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <button type="submit" style={buttonStyle}>
          Gửi đánh giá
        </button>
      </form>

      {reviews.length > 0 && (
        <div>
          <h4>📋 Danh sách đánh giá:</h4>
          <ul style={{ paddingLeft: "1rem" }}>
            {reviews.map((r, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <strong>{r.name}</strong> – {r.rating}⭐<br />
                <em>{r.comment}</em><br />
                <small>{r.date}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  marginBottom: "0.75rem",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Evaluate;