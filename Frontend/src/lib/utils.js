export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getCustomer() {
  try {
    const stored = localStorage.getItem("customer");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
