const express = require("express");
const app = express();
const cors = require("cors");
const itemRouter = require("./routes/itemRouter");
const userRouter = require("./routes/userRouter");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/item", itemRouter);
app.use("/user", userRouter);

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on http://localhost:5000/"));
