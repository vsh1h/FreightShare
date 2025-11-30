
const mongoose = require("mongoose");

async function connectMongo() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not set");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo error:", err);
  }
}

module.exports = connectMongo;
