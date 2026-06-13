import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Nav from "../Nav/Nav";
import Footer from "../layout/Footer";
import PageBackground from "../ui/PageBackground";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { API_URL } from "../../api";
import { fadeUp } from "../../lib/motion";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/customers/login`, loginData);
      localStorage.setItem("customer", JSON.stringify(response.data));
      alert("Login Successful!");
      navigate("/reservationpage");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Password");
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
          className="relative w-full max-w-md mx-4 glass-card rounded-2xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-500/10 text-gold-600 mb-4">
              <LogIn size={24} />
            </div>
            <h2 className="font-heading text-4xl text-burgundy-500">Welcome Back</h2>
            <p className="text-sm text-charcoal-900/50 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-charcoal-900/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/customer/customerRegister" className="text-gold-600 font-semibold hover:text-gold-500 transition-colors">
              Register
            </Link>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
