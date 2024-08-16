const express = require("express");
const cors = require("cors");
const { router } = require("./Router/router");
const { contact } = require("./Router/contact");
const { service } = require("./Router/service");
const { connectDB } = require("./Connection/Connect");
const { admin } = require("./Router/admin");

const app = express();
const port = 5000;
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, PATCH, HEAD",
  credentials: true,
};

// middleware to access data from the body
app.use(cors(corsOptions));
app.use(express.json());
// connection
connectDB(process.env.mongo_url);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/router", router);
app.use("/contact", contact);
app.use("/services", service);
app.use("/admin", admin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
