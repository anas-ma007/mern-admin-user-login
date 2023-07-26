const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require('cors');
const connectDB = require("./Config/db");
const { errorHandler } = require("./Middlewares/errorMiddleware");
const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use(cors())

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./Routes/userRoutes"));

app.use("/admin", require("./Routes/adminRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port ${port}`));
