const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv"); // Load environment variables
const appointmentRoutes = require("./routes/appointmentRoutes");
const fetchRoutes = require("./routes/fetchAppointmentRoutes"); // Fix name of route import
const adminRoutes = require("./routes/adminRoutes");

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// API routes
app.use("/appointments", appointmentRoutes); // Route for scheduling appointments
app.use("/fetch-appointments", fetchRoutes); // Fixed the naming issue here, it's fetch-appointments, not fatch
app.use("/admin", adminRoutes); // Admin route

// Serve React static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Serve the index.html for any route that isn't API-related (for React routing)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
