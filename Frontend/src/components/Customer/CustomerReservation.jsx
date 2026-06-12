import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api";
import "./CustomerReservation.css";

function CustomerReservations() {
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem("customer"));
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!customer?._id) {
      alert("Please login first");
      navigate("/customer/customerLogin");
      return;
    }

    fetchReservations(customer._id);
  }, []);

  const fetchReservations = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/reservations/customer/${customerId}`);
      setReservations(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reservations");
    }
  };

  return (
    <div className="customer-res-page">
      <div className="customer-res-container">
        <h2>My Reservations</h2>

        <table className="customer-res-table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.tableNumber}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.numberOfGuests}</td>
                  <td>
                    <span className={`status-badge ${reservation.status}`}>
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerReservations;
