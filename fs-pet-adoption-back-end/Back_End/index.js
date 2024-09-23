const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const UsersRoutes = require("./Routes/users");
const PetsRoutes = require("./Routes/Pets");
const AdminRoutes = require("../Back_End/Routes/admin");

const app = express();
const PORT = 5000;

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:test@cluster0.kigzv7g.mongodb.net/?retryWrites=true&w=majority");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("combined"));

app.use("/users", UsersRoutes);
app.use("/pets", PetsRoutes);
app.use("/admin", AdminRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message, errorType: err.type || "" });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
