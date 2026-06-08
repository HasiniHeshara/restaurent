import "./Menu.css";
import Nav from "../../components/Nav/Nav";

// Make sure your PDFs are in the public folder
// e.g., public/pdfs/beverages.pdf, public/pdfs/foods.pdf, public/pdfs/desserts.pdf

const Menu = () => {
  const categories = [
    {
      name: "Beverages",
      icon: "🍷",
      description: "Fresh drinks & beverages",
      pdf: "/pdfs/beverages.pdf",
    },
    {
      name: "Foods",
      icon: "🍽️",
      description: "Delicious main meals",
      pdf: "/pdfs/foods.pdf",
    },
    {
      name: "Desserts",
      icon: "🍨",
      description: "Sweet treats & desserts",
      pdf: "/pdfs/desserts.pdf",
    },
  ];

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, "_blank"); // opens PDF in new tab
  };

  return (
    <>
      <Nav />

      <div className="menu-container">
        <h2 className="menu-title">Menu Categories</h2>

        <div className="menu-card-container">
          {categories.map((category, index) => (
            <div
              key={index}
              className="menu-card"
              onClick={() => openPDF(category.pdf)}
              style={{ cursor: "pointer" }}
            >
              <span className="menu-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
