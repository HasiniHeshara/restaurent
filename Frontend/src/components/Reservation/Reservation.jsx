import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import PageBackground from "../ui/PageBackground";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { API_URL } from "../../api";
import { getCustomer } from "../../lib/utils";
import { fadeUp } from "../../lib/motion";

export default function ReservationPage() {
  const navigate = useNavigate();
  const customer = getCustomer();

  const [formData, setFormData] = useState({
    customer: customer?._id || "",
    tableNumber: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?._id) {
      alert("Please login first");
      navigate("/customer/customerLogin");
      return;
    }

    try {
      await axios.post(`${API_URL}/reservations`, {
        ...formData,
        customer: customer._id,
        tableNumber: Number(formData.tableNumber),
        numberOfGuests: Number(formData.numberOfGuests),
      });

      alert("Reservation created successfully!");
      navigate("/customer/reservations");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <Nav />

      <main className="relative min-h-[calc(100vh-80px)] pt-28 pb-20 flex items-center justify-center overflow-hidden">
        <PageBackground />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative w-full max-w-lg mx-4 glass-card rounded-2xl p-8 md:p-10"
        >
          {!customer?._id ? (
            <div className="text-center">
              <CalendarDays size={40} className="mx-auto text-gold-500 mb-4" />
              <h1 className="font-heading text-3xl text-burgundy-500 mb-3">Sign In Required</h1>
              <p className="text-sm text-charcoal-900/50 mb-8">
                Please log in to reserve a table at The Golden Fork.
              </p>
              <Button to="/customer/customerLogin">Go to Login</Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-600">
                  Reservations
                </span>
                <h1 className="font-heading text-4xl text-burgundy-500 mt-2">Reserve a Table</h1>
                <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-3" />
              </div>

              <div className="mb-6 px-4 py-3 rounded-xl bg-gold-500/8 border border-gold-500/15 text-sm">
                <span className="text-charcoal-900/50">Guest: </span>
                <span className="font-semibold text-burgundy-500">{customer.name}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  type="number"
                  name="tableNumber"
                  placeholder="Table Number"
                  value={formData.tableNumber}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  type="number"
                  name="numberOfGuests"
                  placeholder="Number of Guests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  required
                />

                <Button type="submit" className="w-full mt-2">
                  <CalendarDays size={16} />
                  Reserve Table
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
