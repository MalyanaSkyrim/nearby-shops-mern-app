const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
const cors = require("cors");

connectDB();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(function(req, res, next) {
  res.set({
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  });

  next();
});

app.use(express.static(path.join(__dirname, "./public")));

const authRoutes = require("./routes/authRoutes");
const shopsRoutes = require("./routes/shopsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/shops", shopsRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
