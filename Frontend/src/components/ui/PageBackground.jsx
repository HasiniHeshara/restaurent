import { motion } from "framer-motion";

export default function PageBackground({ variant = "light" }) {
  if (variant === "dark") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 dark-gradient opacity-100" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-3xl"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100/50 to-cream-200/80" />
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-500/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-burgundy-500/6 blur-3xl"
      />
    </div>
  );
}
