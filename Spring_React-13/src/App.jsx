import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar'; 
import './App.css'
import AddEmployees from './components/AddEmployees';
import Employee from './components/Employee';   

function App() {
  
   const [searchResult, setSearchResult] = useState(null);

  return (  
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddEmployees/>}/>
        <Route path="/employee" element={<Employee/>}/>
      </Routes>
    </Router>
  );
}

export default App;
