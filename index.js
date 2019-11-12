const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/airbnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./models/room");
require("./models/user");

const roomRoutes = require("./routes/room");
//const userRoutes = require("./routes/user");

// Activer les routes
app.use(roomRoutes);
//app.use(userRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
