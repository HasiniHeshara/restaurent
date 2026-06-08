import { Link } from "react-router-dom";
import "./Home.css";
import Nav from "../Nav/Nav";
import heroImage from "../../assets/hero.jpg";


const Home = () => {
  return (
    <>
      <Nav />

      {/* HERO IMAGE SECTION */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay">
            <h1>A Symphony of Flavor in Every Golden Bite.</h1>
            <p>Savor the Moment. Taste the Love.</p>
          </div>
        </div>


      {/* MAIN CONTENT */}
      <div className="home-container">
        <h2 className="home-title">Welcome to Our Restaurant</h2>
        <p className="home-subtitle">
          Order delicious food, reserve tables, and share your experience with us.
        </p>

        <div className="card-container">
          <div className="home-card">
            <h3>📋 Menu</h3>
            <p>Browse meals, drinks, and desserts.</p>
            <Link to="/menu" className="home-btn">View Menu</Link>
          </div>

          <div className="home-card">
            <h3>🧾 Orders</h3>
            <p>Place orders and track order status.</p>
            <Link to="/orders" className="home-btn">View Orders</Link>
          </div>

          <div className="home-card">
            <h3>📅 Reservations</h3>
            <p>Book tables easily and quickly.</p>
            <Link to="/reservations" className="home-btn">Reserve Table</Link>
          </div>

          <div className="home-card">
            <h3>⭐ Reviews</h3>
            <p>Rate food and share feedback.</p>
            <Link to="/reviews" className="home-btn">View Reviews</Link>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Born from a passion for the art of the pour and the precision of the palate, The Golden Fork was envisioned as a sanctuary where time slows down and senses awaken. Our journey began with a simple philosophy: 
          that every drink should tell a story and every guest should feel like the protagonist of the evening. Within these walls—clothed in 
          deep charcoal and wine-red velvet—we blend the rich heritage of Sri Lankan 
          hospitality with a global standard of mixology. From the sun-ripened citrus in our fresh-pressed juices to the sophisticated complexity of our signature espresso martinis, every ingredient is chosen with intention. 
          We are more than just a lounge; we are a destination for the 
          connoisseur, a retreat for the weary, and a celebration of life’s most elegant moments, one glass at a time.
        </p>
      </div>

      {/* FOOTER */}


      <footer className="footer">
        <div className="admin-footer">
            <Link to="/admin/login" className="admin-link">
              Admin Login
            </Link>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p>📞 +94 77 123 4567</p>
          <p>✉️ contact@restaurant.com</p>
        </div>

        <div>
          <h4>Location</h4>
          <p>📍 Colombo, Sri Lanka</p>
          <p>Open: 10.00 AM – 10.00 PM</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
