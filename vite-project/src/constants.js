export const baseURL = {
    sweep:
      process.env.NODE_ENV === "production"
        ? "https://sweep-backend.discovery.cs.vt.edu"
        : "http://localhost:5002",
  };