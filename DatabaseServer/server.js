const express = require("express");
const bodyParser = require("body-parser");
const { mongoUrl } = require("./keys");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
const Data = require("./models/Data");

require("./models/User");
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahh");
});

mongoose.connection.on("error", (err) => {
  console.log("this is error", err);
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("hello");
});
// Remove or adjust this route
app.post("/connect", (req, res) => {
  const { host, username, password, port, database } = req.body;
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000, // Set a higher timeout (e.g., 30000 milliseconds)
  });

  res.json({ message: "Connected to MongoDB" });
});

app.post("/submittedData", async (req, res) => {
  const submittedData = req.body;

  try {
    const newData = new Data(submittedData);
    await newData.save();
    res.json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});
app.listen(port, () => {
  console.log("server running" + port);
});
