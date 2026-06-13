import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

export default function Footer() {
  return (
    <footer className="relative dark-gradient text-cream-50 overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-12"
      >
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-10 h-10 border border-gold-500/40 rounded-lg font-heading text-sm font-bold text-gold-500">
              GF
            </span>
            <span className="font-heading text-2xl font-semibold">The Golden Fork</span>
          </div>
          <p className="text-cream-100/60 text-sm leading-relaxed mb-4">
            An elegant dining experience in the heart of Colombo. Where every meal becomes a memory.
          </p>
          <Link
            to="/admin/login"
            className="text-xs tracking-widest uppercase text-cream-100/30 hover:text-gold-400 transition-colors"
          >
            Admin Login
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h4 className="font-heading text-xl text-gold-400 mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-cream-100/60">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gold-500 shrink-0" />
              +94 77 123 4567
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gold-500 shrink-0" />
              contact@restaurant.com
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-gold-500 shrink-0" />
              10:00 AM – 10:00 PM
            </li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h4 className="font-heading text-xl text-gold-400 mb-5">Location</h4>
          <p className="flex items-start gap-3 text-sm text-cream-100/60">
            <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" />
            Colombo, Sri Lanka
          </p>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-white/5 py-6 text-center text-xs text-cream-100/30 tracking-wider">
        © {new Date().getFullYear()} The Golden Fork. All rights reserved.
      </div>
    </footer>
  );
}
