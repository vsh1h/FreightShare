const mongoose = require("mongoose");

const driverLocationSchema = new mongoose.Schema({
  driverId: { type: Number, required: true },
  lat: Number,
  lng: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DriverLocation", driverLocationSchema);