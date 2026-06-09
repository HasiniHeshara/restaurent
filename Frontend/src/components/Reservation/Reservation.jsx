import { useState } from "react";
import axios from "axios";
import "./Reservation.css";

function ReservationPage() {
  const customer = JSON.parse(
  localStorage.getItem("customer")
);

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

  if (!customer) {
  alert("Please login first");
  window.location.href =
    "/customer/customerLogin";
  return;
}

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:5000/reservations",
      formData
    );

    alert("Reservation created successfully!");

  } catch (error) {

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }

  }
};

 return (
  
  <div className="reservation-page">
    <div className="reservation-container">

      <h1>Reserve a Table</h1>

      <div className="customer-info-box">
        <strong>Customer:</strong> {customer.name}
      </div>

      <form
        className="reservation-form"
        onSubmit={handleSubmit}
      >

        <input
          type="number"
          name="tableNumber"
          placeholder="Table Number"
          value={formData.tableNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="numberOfGuests"
          placeholder="Number Of Guests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="reserve-btn"
        >
          Reserve Table
        </button>

      </form>

    </div>
  </div>
);
}

export default ReservationPage;