import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function CustomerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/customers/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "customer",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

      navigate("/reservationpage");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Customer Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <Link to="/customer/customerRegister">
          Register
        </Link>
      </p>
    </div>
  );
}

export default CustomerLogin;