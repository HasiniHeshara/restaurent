export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};
