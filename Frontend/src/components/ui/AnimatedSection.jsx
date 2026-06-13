import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

export default function AnimatedSection({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
