import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

export default function SectionHeader({ label, title, subtitle, dark = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      {label && (
        <span
          className={`inline-block text-[11px] font-semibold tracking-[0.28em] uppercase mb-4 ${
            dark ? "text-gold-400" : "text-gold-600"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-4xl md:text-5xl font-semibold mb-4 ${
          dark ? "text-cream-50" : "text-burgundy-500"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-14 h-0.5 mx-auto mb-5 ${
          dark ? "bg-gold-400/60" : "bg-gold-500"
        }`}
      />
      {subtitle && (
        <p className={`text-base leading-relaxed ${dark ? "text-cream-100/70" : "text-charcoal-900/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
