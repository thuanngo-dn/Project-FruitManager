import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3002/fruits";

const ListFruitManager = () => {
  const [fruits, setFruits] = useState([]);
  const [form, setForm] = useState({
    name: "",
    family: "",
    order: "",
    genus: "",
    nutritions: {
      calories: 0,
      fat: 0,
      sugar: 0,
      carbohydrates: 0,
      protein: 0
    }
  });

  return (
    <div>
      <h2>Quản lý danh sách trái cây</h2>
    </div>
  );
};

export default ListFruitManager;
