const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/router.js"));

app.listen(4000);