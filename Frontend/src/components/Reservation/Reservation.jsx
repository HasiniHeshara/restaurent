import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api";
import "./Reservation.css";

function ReservationPage() {
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem("customer"));

  const [formData, setFormData] = useState({
    customer: customer?._id || "",
    tableNumber: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?._id) {
      alert("Please login first");
      navigate("/customer/customerLogin");
      return;
    }

    try {
      await axios.post(`${API_URL}/reservations`, {
        ...formData,
        customer: customer._id,
        tableNumber: Number(formData.tableNumber),
        numberOfGuests: Number(formData.numberOfGuests),
      });

      alert("Reservation created successfully!");
      navigate("/customer/reservations");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!customer?._id) {
    return (
      <div className="reservation-page">
        <div className="reservation-container">
          <h1>Please login first</h1>
          <button className="reserve-btn" onClick={() => navigate("/customer/customerLogin")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <h1>Reserve a Table</h1>

        <div className="customer-info-box">
          <strong>Customer:</strong> {customer.name}
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <input
            type="number"
            name="tableNumber"
            placeholder="Table Number"
            value={formData.tableNumber}
            onChange={handleChange}
            required
          />

          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <input type="time" name="time" value={formData.time} onChange={handleChange} required />

          <input
            type="number"
            name="numberOfGuests"
            placeholder="Number Of Guests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            required
          />

          <button type="submit" className="reserve-btn">
            Reserve Table
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationPage;
