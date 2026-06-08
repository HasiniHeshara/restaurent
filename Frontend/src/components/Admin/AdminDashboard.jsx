import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-card-container">

           <div className="admin-card" onClick={() => navigate("/admin/customers")}>
          <h3>👥 Customers</h3>
          <p>View registered customers</p>
        </div>



        <div className="admin-card" onClick={() => navigate("/admin/menu")}>
          <h3>🍽️ Manage Menu</h3>
          <p>Add, update, or delete menu items</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/orders")}>
          <h3>🧾 Orders</h3>
          <p>View and manage customer orders</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/reservations")}>
          <h3>📅 Reservations</h3>
          <p>Manage table reservations</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/reviews")}>
          <h3>⭐ Reviews</h3>
          <p>Read customer feedback</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
