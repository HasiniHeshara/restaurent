import { useEffect, useState } from "react";
import { API_URL } from "../../api";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/menu-items`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load menu items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const submitItem = async () => {
    if (!form.name || !form.category || !form.price) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/menu-items/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/menu-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm({ name: "", category: "", price: "", image: "" });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error(error);
      alert("Failed to save menu item");
    }
  };

  const editItem = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      category: item.category || "",
      price: item.price || "",
      image: item.image || "",
    });
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await fetch(`${API_URL}/menu-items/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      console.error(error);
      alert("Failed to delete menu item");
    }
  };

  return (
    <div className="admin-menu-page">
      <div className="admin-menu-container">
        <h2>Admin – Menu Management</h2>

        <div className="admin-form">
          <input
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Category (Beverages / Foods)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <button className="admin-add-btn" onClick={submitItem}>
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (Rs)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => editItem(item)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteItem(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMenu;
