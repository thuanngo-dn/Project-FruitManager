import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm trái cây..."
        style={{
          padding: "0.5rem",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "0.5rem",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#17a2b8",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default Search;
