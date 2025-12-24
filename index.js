const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Increase event listeners limit
require("events").EventEmitter.defaultMaxListeners = 500;

// Middleware FIRST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root path
const __path = process.cwd();

// Try loading pair route safely
let pairRoute;
try {
  pairRoute = require("./pair");
  app.use("/code", pairRoute);
} catch (err) {
  console.error("pair.js load error:", err.message);
}

// Routes
app.get("/pair", (req, res) => {
  res.sendFile(path.join(__path, "pair.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__path, "main.html"));
});

// Fallback (avoid Application error)
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});

module.exports = app;
