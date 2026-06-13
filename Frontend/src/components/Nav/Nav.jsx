import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getCustomer } from "../../lib/utils";
import Button from "../ui/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/orders", label: "Orders" },
  { to: "/reservationpage", label: "Reservations", match: ["/reservationpage", "/reservations"] },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const customer = getCustomer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (link) =>
    link.match
      ? link.match.includes(location.pathname)
      : location.pathname === link.to;

  const handleLogout = () => {
    localStorage.removeItem("customer");
    alert("Logged out successfully");
    navigate("/");
  };

  const isHome = location.pathname === "/" || location.pathname === "/mainhome";
  const solidNav = !isHome || scrolled;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidNav ? "glass-nav shadow-2xl shadow-black/20 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center w-11 h-11 border border-gold-500/50 rounded-lg font-heading text-sm font-bold text-gold-500 tracking-wider"
          >
            GF
          </motion.span>
          <span className="hidden sm:flex flex-col">
            <span className="font-heading text-xl font-semibold text-cream-50 leading-tight group-hover:text-gold-400 transition-colors">
              The Golden Fork
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-gold-500/80 font-medium">
              Fine Dining
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                  isActive(link) ? "text-gold-400" : "text-cream-50/70 hover:text-cream-50"
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px bg-gold-500"
                  />
                )}
              </Link>
            </li>
          ))}

          {customer ? (
            <>
              <li>
                <Link
                  to="/customer/reservations"
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                    location.pathname === "/customer/reservations"
                      ? "text-gold-400"
                      : "text-cream-50/70 hover:text-cream-50"
                  }`}
                >
                  My Bookings
                </Link>
              </li>
              <li className="ml-2">
                <Button variant="ghost" onClick={handleLogout} className="!py-2 !px-5 !text-xs">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="ml-2">
                <Button to="/customer/customerLogin" variant="ghost" className="!py-2 !px-5 !text-xs">
                  Login
                </Button>
              </li>
              <li>
                <Button to="/customer/customerRegister" className="!py-2 !px-5 !text-xs">
                  Register
                </Button>
              </li>
            </>
          )}
        </ul>

        <button
          className="lg:hidden p-2 text-gold-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-gold-500/10 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block py-3 text-sm font-semibold tracking-wider uppercase ${
                      isActive(link) ? "text-gold-400" : "text-cream-50/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-4 flex flex-col gap-2">
                {customer ? (
                  <>
                    <Button to="/customer/reservations" variant="outline" className="w-full">
                      My Bookings
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button to="/customer/customerLogin" variant="ghost" className="w-full">
                      Login
                    </Button>
                    <Button to="/customer/customerRegister" className="w-full">
                      Register
                    </Button>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
