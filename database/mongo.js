const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;

  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("**** Connection to database is ready ****");
  } catch (error) {
    console.error("**** Fail Connection to Database ****");
  }
};

module.exports = dbConnect;
