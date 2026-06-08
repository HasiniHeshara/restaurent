import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./Order.css";

const Order = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkout, setCheckout] = useState({
    customerName: "",
    phone: "",
    address: "",
    orderType: "Pickup",
    paymentMethod: "Cash"
  });

  useEffect(() => {
    fetch("http://localhost:5000/menu-items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addToCart = (item) => {
    const exist = cart.find((i) => i._id === item._id);

    if (exist) {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

 const placeOrder = async () => {
  if (!checkout.customerName || !checkout.phone) {
    alert("Please fill required details");
    return;
  }

  const orderData = {
    customerName: checkout.customerName,
    phone: checkout.phone,
    address: checkout.address,
    orderType: checkout.orderType,
    paymentMethod: checkout.paymentMethod,
    items: cart,
    totalPrice: total
  };

  await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  alert("Order placed successfully!");
  setCart([]);
  setShowCheckout(false);
};

  return (
    <>
      <Nav />

      <div className="order-page">
        <h2 className="order-title">Order Your Food 🍽️</h2>

        {/* MENU ITEMS */}
        <div className="menu-grid">
          {items.map((item) => (
            <div key={item._id} className="menu-card">
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price}</p>
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="cart-section">
          <h3>Your Cart 🛒</h3>

          {cart.length === 0 && <p>No items added yet.</p>}

          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
              />
              <div>
                <h4>{item.name}</h4>
                <p>Rs. {item.price} × {item.qty}</p>
              </div>
              <button onClick={() => removeFromCart(item._id)}>❌</button>
            </div>
          ))}

          <h2>Total: Rs. {total}</h2>

          {cart.length > 0 && (
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
              Checkout
            </button>
          )}
        </div>

        {/* CHECKOUT FORM */}
        {showCheckout && (
          <div className="checkout-form">
            <h3>Checkout</h3>

            <input
              placeholder="Name"
              value={checkout.customerName}
              onChange={(e) =>
                setCheckout({ ...checkout, customerName: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={checkout.phone}
              onChange={(e) =>
                setCheckout({ ...checkout, phone: e.target.value })
              }
            />

            <select
              value={checkout.orderType}
              onChange={(e) =>
                setCheckout({ ...checkout, orderType: e.target.value })
              }
            >
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </select>

            {checkout.orderType === "Delivery" && (
              <input
                placeholder="Delivery Address"
                value={checkout.address}
                onChange={(e) =>
                  setCheckout({ ...checkout, address: e.target.value })
                }
              />
            )}

            <select
              value={checkout.paymentMethod}
              onChange={(e) =>
                setCheckout({ ...checkout, paymentMethod: e.target.value })
              }
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>

            <button onClick={placeOrder}>Confirm Order</button>
            <button onClick={() => setShowCheckout(false)}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
