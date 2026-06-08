// AdminReservations.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/reservations"
      );
      setReservations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/reservations/${id}/status`,
      { status }
    );

    fetchReservations();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2>Reservations</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>
                {reservation.customer?.name}
              </td>
              <td>{reservation.tableNumber}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.numberOfGuests}</td>
              <td>{reservation.status}</td>

                    <td>
                    <button
                        onClick={() =>
                        updateStatus(
                            reservation._id,
                            "Confirmed"
                        )
                        }
                    >
                        Confirm
                    </button>

                    <button
                        onClick={() =>
                        updateStatus(
                            reservation._id,
                            "Cancelled"
                        )
                        }
                    >
                        Cancel
                    </button>
                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    );
}

export default AdminReservations;