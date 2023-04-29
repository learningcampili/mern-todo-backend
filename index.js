require("dotenv/config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./database/mongo");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes/index"));

app.get("*", (req, res) => {
  res.send("404 - not found");
});

// tiene que ser el último
app.use(errorHandler);

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Api running on http://localhost:${PORT}`);
  });
});
