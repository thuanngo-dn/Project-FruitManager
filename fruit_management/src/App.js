import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ProfilePage from './auth/ProfilePage';
import ListFruit from './components/ListFruit';
import DetailFruit from './components/DetailFruit'; 
import Favourite from "./components/Favourite";
import ListFruitManager from "./admin/ListFruitManager"; 



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listfruit" element={<ListFruit />} />
          <Route path="/fruits/:id" element={<DetailFruit />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/admin/list-fruit" element={<ListFruitManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
