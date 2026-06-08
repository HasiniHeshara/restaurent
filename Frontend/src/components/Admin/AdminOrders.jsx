import { useEffect, useState } from "react";
import "./AdminOrder.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="admin-orders-page">
      <h2>Order Details</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Order Type</th>
              <th>Payment</th>
              <th>Ordered Items</th>
              <th>Total (Rs)</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>
                  {order.orderType === "Delivery"
                    ? order.address
                    : "Pickup"}
                </td>
                <td>{order.orderType}</td>
                <td>{order.paymentMethod}</td>

                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} × {item.qty}
                    </div>
                  ))}
                </td>

                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
