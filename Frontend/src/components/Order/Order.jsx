import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ShoppingBag, X } from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import SectionHeader from "../ui/SectionHeader";
import PageBackground from "../ui/PageBackground";
import Button from "../ui/Button";
import FormInput, { FormSelect } from "../ui/FormInput";
import { API_URL } from "../../api";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

export default function Order() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkout, setCheckout] = useState({
    customerName: "",
    phone: "",
    address: "",
    orderType: "Pickup",
    paymentMethod: "Cash",
  });

  useEffect(() => {
    fetch(`${API_URL}/menu-items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => alert("Failed to load menu items"));
  }, []);

  const addToCart = (item) => {
    const exist = cart.find((i) => i._id === item._id);
    if (exist) {
      setCart(cart.map((i) => (i._id === item._id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item._id !== id));

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  const placeOrder = async () => {
    if (!checkout.customerName || !checkout.phone) {
      alert("Please fill required details");
      return;
    }
    if (cart.length === 0) {
      alert("Please add items to cart");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkout,
          address: checkout.orderType === "Delivery" ? checkout.address : "",
          items: cart.map((item) => ({
            name: item.name,
            price: Number(item.price),
            qty: item.qty,
            image: item.image,
          })),
          totalPrice: total,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to place order");
      }

      alert("Order placed successfully!");
      setCart([]);
      setShowCheckout(false);
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <Nav />

      <main className="relative pt-28 pb-20 overflow-hidden">
        <PageBackground />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            label="Order"
            title="Order Your Food"
            subtitle="Select from our menu and we'll have it ready for you."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            {items.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/400x300?text=Dish"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl text-burgundy-500 mb-1">{item.name}</h3>
                  <p className="text-gold-600 font-semibold mb-4">Rs. {item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-semibold tracking-wider uppercase hover:bg-gold-400 transition-colors"
                  >
                    <Plus size={14} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag size={22} className="text-gold-600" />
              <h3 className="font-heading text-2xl text-burgundy-500">Your Cart</h3>
              {cart.length > 0 && (
                <span className="ml-auto text-xs font-semibold bg-gold-500/15 text-gold-600 px-3 py-1 rounded-full">
                  {cart.reduce((s, i) => s + i.qty, 0)} items
                </span>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="text-charcoal-900/40 text-sm text-center py-8">No items added yet.</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 pb-4 border-b border-gold-500/10">
                      <img
                        src={item.image || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-charcoal-900/50">
                          Rs. {item.price} × {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-charcoal-900/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-charcoal-900/50 uppercase tracking-wider">Total</span>
                  <span className="font-heading text-2xl text-burgundy-500">Rs. {total}</span>
                </div>

                <Button onClick={() => setShowCheckout(true)} className="w-full">
                  Proceed to Checkout
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </main>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-cream-50 rounded-2xl p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 p-2 text-charcoal-900/30 hover:text-charcoal-900 transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-heading text-3xl text-burgundy-500 mb-6 text-center">Checkout</h3>

              <div className="space-y-4">
                <FormInput
                  placeholder="Full Name"
                  value={checkout.customerName}
                  onChange={(e) => setCheckout({ ...checkout, customerName: e.target.value })}
                />
                <FormInput
                  placeholder="Phone Number"
                  value={checkout.phone}
                  onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })}
                />
                <FormSelect
                  value={checkout.orderType}
                  onChange={(e) => setCheckout({ ...checkout, orderType: e.target.value })}
                >
                  <option value="Pickup">Pickup</option>
                  <option value="Delivery">Delivery</option>
                </FormSelect>
                {checkout.orderType === "Delivery" && (
                  <FormInput
                    placeholder="Delivery Address"
                    value={checkout.address}
                    onChange={(e) => setCheckout({ ...checkout, address: e.target.value })}
                  />
                )}
                <FormSelect
                  value={checkout.paymentMethod}
                  onChange={(e) => setCheckout({ ...checkout, paymentMethod: e.target.value })}
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </FormSelect>

                <div className="flex gap-3 pt-2">
                  <Button onClick={placeOrder} className="flex-1">
                    Confirm Order
                  </Button>
                  <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
