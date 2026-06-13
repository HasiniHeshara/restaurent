import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import SectionHeader from "../ui/SectionHeader";
import PageBackground from "../ui/PageBackground";
import Button from "../ui/Button";
import { API_URL } from "../../api";
import { getCustomer } from "../../lib/utils";
import { fadeUp } from "../../lib/motion";

const statusStyles = {
  Pending: "bg-amber-500/15 text-amber-600",
  Confirmed: "bg-emerald-500/15 text-emerald-600",
  Cancelled: "bg-red-500/15 text-red-600",
};

export default function CustomerReservations() {
  const navigate = useNavigate();
  const customer = getCustomer();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!customer?._id) {
      alert("Please login first");
      navigate("/customer/customerLogin");
      return;
    }
    fetchReservations(customer._id);
  }, []);

  const fetchReservations = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/reservations/customer/${customerId}`);
      setReservations(res.data);
    } catch {
      alert("Failed to load reservations");
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <Nav />

      <main className="relative pt-28 pb-20 overflow-hidden">
        <PageBackground />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <SectionHeader label="Your Bookings" title="My Reservations" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {reservations.length === 0 ? (
              <div className="text-center py-16 px-6">
                <CalendarCheck size={40} className="mx-auto text-gold-500/40 mb-4" />
                <p className="text-charcoal-900/50 mb-6">No reservations found</p>
                <Button to="/reservationpage">Book a Table</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-charcoal-950 text-gold-400">
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Table</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Date</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Time</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Guests</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res, i) => (
                      <motion.tr
                        key={res._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-gold-500/10 hover:bg-cream-100/50 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium">{res.tableNumber}</td>
                        <td className="px-5 py-4 text-charcoal-900/70">{res.date}</td>
                        <td className="px-5 py-4 text-charcoal-900/70">{res.time}</td>
                        <td className="px-5 py-4 text-charcoal-900/70">{res.numberOfGuests}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
                              statusStyles[res.status] || "bg-gray-500/15 text-gray-600"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
