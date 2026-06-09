import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const handleLogout = () => {
    localStorage.removeItem("customer");

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        🍷🍴 The Golden Fork
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>

        <li>
          <Link to="/reservationpage">
            Reservations
          </Link>
        </li>

        {/* Show Login/Register if NOT logged in */}
        {!customer && (
          <>
            <li>
              <Link
                to="/customer/customerLogin"
                className="auth-btn"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/customer/customerRegister"
                className="auth-btn"
              >
                Register
              </Link>
            </li>
          </>
        )}

        {/*logout if logged in */}
        {customer && (
          <>
        
            <li>
              <Link to="/customer/reservations">
                My Reservations
              </Link>
            </li>
            
            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;