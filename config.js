const mongoose = require("mongoose");

// Connection of MongoDB
async function mongoConnection(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("mongo connected Successfully");
    })
    .catch((err) => {
      console.log("Error Returned ");
    });
}

module.exports = { mongoConnection };
