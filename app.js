const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/usssss", {
      timeout: 5000,
    });
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching users from dummyjson:", err.message || err);
    res.status(500).json({ message: "Failed to fetch users from dummyjson.com" });
  }
});

app.get("/health", (req, res) => {
  res.send("Server is up ✅");
});

module.exports = app;
