import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/AddCrop";

function App() {
  // Current page
  const [page, setPage] = useState("home");

  // Registration data
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    village: "",
    district: "",
    state: "",
    language: "en",
  });

  // Crop data
  const [cropData, setCropData] = useState({
    cropName: "",
    plantingDate: "",
    fieldSize: "",
  });
  const [crops, setCrops] = useState([]);

  // Registration input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Registration submit
  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.password ||
      !formData.village ||
      !formData.district ||
      !formData.state
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    alert("Registration successful!");

    console.log("Farmer Details:", formData);

    setPage("login");
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();

    setPage("dashboard");
  };

  // Crop input change
  const handleCropChange = (e) => {
    setCropData({
      ...cropData,
      [e.target.name]: e.target.value,
    });
  };

  // Add crop
  const handleAddCrop = (e) => {
    e.preventDefault();

    if (!cropData.cropName || !cropData.plantingDate) {
      alert("Please select crop name and planting date.");
      return;
    }

    alert("Crop added successfully!");

    console.log("Crop Details:", cropData);
    setCrops([...crops, cropData]);

    setPage("dashboard");
  };

  // HOME
  if (page === "home") {
    return <Home setPage={setPage} />;
  }

  // LOGIN
  if (page === "login") {
    return (
      <Login
        setPage={setPage}
        handleLogin={handleLogin}
      />
    );
  }

  // REGISTER
  if (page === "register") {
    return (
      <Register
        setPage={setPage}
        formData={formData}
        handleChange={handleChange}
        handleRegister={handleRegister}
      />
    );
  }

  // DASHBOARD
  if (page === "dashboard") {
    return (
  <Dashboard
    setPage={setPage}
    crops={crops}
  />
  );
  }

  // ADD CROP
  if (page === "addCrop") {
    return (
      <AddCrop
        setPage={setPage}
        cropData={cropData}
        handleCropChange={handleCropChange}
        handleAddCrop={handleAddCrop}
      />
    );
  }

  // Default page
  return <Home setPage={setPage} />;
}

export default App;