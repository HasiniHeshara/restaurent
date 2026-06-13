import { motion } from "framer-motion";
import { Wine, UtensilsCrossed, IceCreamBowl, ArrowUpRight } from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import SectionHeader from "../ui/SectionHeader";
import PageBackground from "../ui/PageBackground";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

const categories = [
  {
    name: "Beverages",
    icon: Wine,
    description: "Curated wines, cocktails & fresh-pressed juices",
    pdf: "/pdfs/beverages.pdf",
    accent: "from-amber-500/10 to-gold-500/5",
  },
  {
    name: "Foods",
    icon: UtensilsCrossed,
    description: "Signature mains crafted with seasonal ingredients",
    pdf: "/pdfs/foods.pdf",
    accent: "from-burgundy-500/10 to-burgundy-500/5",
  },
  {
    name: "Desserts",
    icon: IceCreamBowl,
    description: "Artisan sweet finishes to complete your meal",
    pdf: "/pdfs/desserts.pdf",
    accent: "from-rose-500/10 to-gold-500/5",
  },
];

export default function Menu() {
  const openPDF = (pdfUrl) => window.open(pdfUrl, "_blank");

  return (
    <div className="bg-cream-50 min-h-screen">
      <Nav />

      <main className="relative pt-28 pb-20 overflow-hidden">
        <PageBackground />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            label="Explore"
            title="Menu Categories"
            subtitle="Select a category to view our full menu in detail."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openPDF(cat.pdf)}
                className={`group text-left glass-card rounded-2xl p-10 cursor-pointer bg-gradient-to-br ${cat.accent}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-500/10 text-gold-600 mb-6 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-colors duration-300">
                  <cat.icon size={26} />
                </div>
                <h3 className="font-heading text-3xl text-burgundy-500 mb-2">{cat.name}</h3>
                <p className="text-sm text-charcoal-900/55 leading-relaxed mb-6">{cat.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-600 group-hover:gap-3 transition-all">
                  View PDF
                  <ArrowUpRight size={14} />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
