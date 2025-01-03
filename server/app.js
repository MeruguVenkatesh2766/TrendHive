const express = require("express");
const app = express();

// const cors = require("cors");

// import API
const categoryRouter = require("./controllers/category");
const productRouter = require("./controllers/product");
const userRouter = require("./controllers/user");
const orderRouter = require("./controllers/order");
const rootRouter = require("./controllers/root");

// middlewares & others
const middleware = require("./utils/middleware");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(middleware.requestLogger);

// routes
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api", rootRouter);

app.use(middleware.errorHandler);

module.exports = app;