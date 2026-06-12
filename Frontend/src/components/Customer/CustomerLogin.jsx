import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api";
import "./Customer.css";

function CustomerLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/customers/login`, loginData);

      localStorage.setItem("customer", JSON.stringify(response.data));

      alert("Login Successful!");
      navigate("/reservationpage");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="customer-page">
      <div className="customer-container">
        <h2>Customer Login</h2>

        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="customer-btn">
            Login
          </button>
        </form>

        <p className="customer-footer">
          Don&apos;t have an account?
          <Link to="/customer/customerRegister">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerLogin;
