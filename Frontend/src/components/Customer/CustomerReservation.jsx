import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerReservation.css";

function CustomerReservations() {

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/reservations/customer/${customer._id}`
      );

      setReservations(res.data);

    } catch (error) {
      console.log(error);
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

            {reservations.map((reservation) => (

              <tr key={reservation._id}>

                <td>{reservation.tableNumber}</td>

                <td>{reservation.date}</td>

                <td>{reservation.time}</td>

                <td>
                  {reservation.numberOfGuests}
                </td>

                <td>

                  <span
                    className={`status-badge ${
                      reservation.status
                    }`}
                  >
                    {reservation.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerReservations;