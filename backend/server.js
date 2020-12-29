const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const AuthRoutes = require("./routes/auth.routes");
require("./utils/initRedis");

dotenv.config();

connectDB();

const app = express();

// initialize middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// morgan logging
app.use(morgan("dev"));

// default route
app.get("/", async (req, res, next) => {
  res.send("Hello from express");
});

// api routes
app.use("/api/auth", AuthRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
