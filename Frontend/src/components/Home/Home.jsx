import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import PageBackground from "../ui/PageBackground";
import heroImage from "../../assets/hero.jpg";
import { fadeUp, heroStagger, staggerContainer, viewportOnce } from "../../lib/motion";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Menu",
    desc: "Browse curated meals, drinks, and desserts crafted by our chefs.",
    to: "/menu",
    cta: "View Menu",
  },
  {
    icon: ShoppingBag,
    title: "Orders",
    desc: "Place orders online and track your delivery or pickup status.",
    to: "/orders",
    cta: "Order Now",
  },
  {
    icon: CalendarDays,
    title: "Reservations",
    desc: "Book your table in seconds for an unforgettable evening.",
    to: "/reservationpage",
    cta: "Reserve Table",
  },
  {
    icon: Star,
    title: "Reviews",
    desc: "Share your experience and discover what guests love most.",
    to: "/reviews",
    cta: "Read Reviews",
  },
];

const testimonials = [
  {
    quote:
      "Amazing atmosphere and delicious food. The service was excellent and the reservation process was very easy.",
    name: "Sarah Perera",
    rating: 5,
  },
  {
    quote:
      "One of the best dining experiences I've had. Highly recommend the chef's special dishes.",
    name: "Nimal Fernando",
    rating: 5,
  },
  {
    quote:
      "Beautiful interior, friendly staff, and great food. Definitely coming back again.",
    name: "Amanda Silva",
    rating: 4,
  },
];

const stats = [
  { value: "4.9", label: "Guest Rating" },
  { value: "50+", label: "Signature Dishes" },
  { value: "6", label: "Years of Excellence" },
  { value: "12k+", label: "Happy Guests" },
];

export default function Home() {
  return (
    <div className="bg-charcoal-950">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/60 to-charcoal-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/30 to-transparent" />

        {/* Corner accents */}
        <div className="absolute top-28 left-8 w-16 h-16 border-t-2 border-l-2 border-gold-500/40 hidden md:block" />
        <div className="absolute bottom-16 right-8 w-16 h-16 border-b-2 border-r-2 border-gold-500/40 hidden md:block" />

        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block mb-6 px-5 py-2 rounded-full border border-gold-500/30 bg-charcoal-950/40 backdrop-blur-sm text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-400"
          >
            Est. 2020 · Colombo
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-cream-50 leading-[1.1] text-balance mb-6"
          >
            A Symphony of Flavor in Every Golden Bite
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gold-300/90 text-sm sm:text-base tracking-[0.2em] uppercase mb-10"
          >
            Savor the Moment · Taste the Love
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/reservationpage">Reserve Your Table</Button>
            <Button to="/menu" variant="ghost">
              Explore Menu
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent"
        />
      </section>

      {/* Stats bar */}
      <section className="relative bg-charcoal-950 border-y border-gold-500/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-semibold text-gold-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-cream-100/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <PageBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            label="Discover"
            title="Welcome to Our Restaurant"
            subtitle="Order delicious food, reserve tables, and share your experience with us."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group glass-card rounded-2xl p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-500/10 text-gold-600 mb-5 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-colors duration-300">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-heading text-2xl text-burgundy-500 mb-3">{feature.title}</h3>
                <p className="text-sm text-charcoal-900/60 leading-relaxed mb-6">{feature.desc}</p>
                <Link
                  to={feature.to}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-600 hover:text-gold-500 transition-colors group/link"
                >
                  {feature.cta}
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 lg:py-32 bg-cream-100/50 overflow-hidden">
        <PageBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader label="Testimonials" title="What Our Guests Say" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 relative"
              >
                <Quote size={32} className="text-gold-500/30 mb-4" />
                <p className="text-charcoal-900/70 italic leading-relaxed mb-6 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-gold-500/10 pt-5">
                  <p className="font-semibold text-burgundy-500 text-sm">{t.name}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? "text-gold-500 fill-gold-500" : "text-gold-500/20"}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-24 lg:py-32 dark-gradient overflow-hidden">
        <PageBackground variant="dark" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <SectionHeader
            dark
            label="Heritage"
            title="Our Story"
            subtitle="Born from a passion for the art of the pour and the precision of the palate."
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-cream-100/65 leading-[1.9] text-base"
          >
            The Golden Fork was envisioned as a sanctuary where time slows down and senses awaken.
            Within these walls—clothed in deep charcoal and wine-red velvet—we blend the rich heritage
            of Sri Lankan hospitality with a global standard of culinary excellence. From sun-ripened
            citrus to sophisticated signature cocktails, every ingredient is chosen with intention.
            We are a destination for the connoisseur, a retreat for the weary, and a celebration of
            life&apos;s most elegant moments.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 gold-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-charcoal-950 mb-4">
            Ready for an Unforgettable Evening?
          </h2>
          <p className="text-charcoal-950/70 mb-8">
            Reserve your table today and let us craft an experience worth remembering.
          </p>
          <Button to="/reservationpage" variant="dark">
            Book a Table
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
