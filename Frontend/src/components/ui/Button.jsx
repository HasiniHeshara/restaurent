import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-gold-500 text-charcoal-950 hover:bg-gold-400 shadow-lg shadow-gold-500/20",
  outline:
    "border border-gold-500/60 text-gold-600 hover:bg-gold-500 hover:text-charcoal-950",
  ghost:
    "border border-white/20 text-cream-50 hover:bg-white/10",
  dark:
    "bg-charcoal-950 text-cream-50 hover:bg-charcoal-800",
};

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors duration-300",
    variants[variant],
    className
  );

  if (to) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
