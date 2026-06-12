const fallbackApiUrl = "https://the-gloden-fork.onrender.com";

export const API_URL = (
  import.meta.env.VITE_API_URL || fallbackApiUrl
).replace(/\/$/, "");
