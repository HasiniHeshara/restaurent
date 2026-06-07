import MenuItem from "../models/menuitemModel.js";


// Create Menu Item
export const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all Menu Items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("category", "name");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemsByCategory = async (req, res) => {
  const { category } = req.params;
  const items = await MenuItem.find({ category });
  res.json(items);
};

export const addMenuItem = async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
};

// Get Menu Item by ID
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate("category", "name");
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMenuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
