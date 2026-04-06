require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const healthRoutes = require("./routes/health");
const profileRoutes = require("./routes/profiles");
const countryRoutes = require("./routes/countries");
const equityRoutes = require("./routes/equities");
const watchlistRoutes = require("./routes/watchlist");
const themeRoutes = require("./routes/themes");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──
app.use(helmet());
app.use(cors({ origin: process.env.NODE_ENV === "production" ? true : "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

// ── API Routes ──
app.use("/api/health", healthRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/equities", equityRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/themes", themeRoutes);

// ── Serve React client in production ──
if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[GOH Server] Running on port ${PORT}`);
});
