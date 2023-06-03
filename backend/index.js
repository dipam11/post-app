const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postRoutes);

mongoose
  .connect(
    `mongodb+srv://dipamjp99:post-app-01@cluster0.jnaqyy5.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Error connecting to the database", error));
