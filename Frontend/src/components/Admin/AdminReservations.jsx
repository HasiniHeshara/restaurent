import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import "./AdminReservations.css";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_URL}/reservations`);
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      alert("Failed to load reservations");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/reservations/${id}/status`, { status });
      fetchReservations();
      alert(`Reservation ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error(error);
      alert("Failed to update reservation");
    }
  };

  return (
    <div className="admin-reservations-page">
      <div className="admin-reservations-container">
        <h2 className="admin-reservations-title">Reservation Management</h2>

        <table className="reservation-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Table</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.customer?.name || "N/A"}</td>
                  <td>{reservation.tableNumber}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.numberOfGuests}</td>
                  <td>
                    <span className={`status-${reservation.status.toLowerCase()}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="confirm-btn"
                      onClick={() => updateStatus(reservation._id, "Confirmed")}
                    >
                      Confirm
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => updateStatus(reservation._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
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

export default AdminReservations;
