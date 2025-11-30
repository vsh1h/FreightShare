// src/controllers/dashboardControllers.js

const prisma = require("../config/db");
const DriverLocation = require("../models/DriverLocation");


exports.getDriverStats = async (req, res) => {
  try {
    const driverId = Number(req.query.driverId);

    const totalTrips = await prisma.shipment.count({
      where: { carrierId: driverId }
    });

    const completedTrips = await prisma.shipment.count({
      where: { carrierId: driverId, status: "DELIVERED" }
    });

    const activeTrips = await prisma.shipment.count({
      where: {
        carrierId: driverId,
        status: { in: ["ACCEPTED", "IN_TRANSIT"] }
      }
    });

    res.json({
      totalTrips,
      completedTrips,
      activeTrips
    });

  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getAvailableLoads = async (req, res) => {
  try {
    const loads = await prisma.shipment.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    res.json(loads);

  } catch (err) {
    console.error("Available Load Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.acceptLoad = async (req, res) => {
  try {
    const { driverId, shipmentId } = req.body;

    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId }
    });

    if (!shipment || shipment.status !== "PENDING") {
      return res.status(400).json({ error: "Load already taken" });
    }

    const accepted = await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        carrierId: driverId,
        status: "ACCEPTED",
        acceptedAt: new Date(),
      },
    });

    res.json({ message: "Load accepted", shipment: accepted });

  } catch (err) {
    console.error("Accept Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getActiveLoads = async (req, res) => {
  try {
    const driverId = Number(req.query.driverId);

    const loads = await prisma.shipment.findMany({
      where: {
        carrierId: driverId,
        status: { in: ["ACCEPTED", "IN_TRANSIT"] },
      },
    });

    res.json(loads);

  } catch (err) {
    console.error("Active Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getCompletedLoads = async (req, res) => {
  try {
    const driverId = Number(req.query.driverId);

    const loads = await prisma.shipment.findMany({
      where: { carrierId: driverId, status: "DELIVERED" },
      orderBy: { completedAt: "desc" },
    });

    res.json(loads);

  } catch (err) {
    console.error("Completed Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.updateDriverLocation = async (req, res) => {
  try {
    const { driverId, lat, lng } = req.body;

    const location = await DriverLocation.findOneAndUpdate(
      { driverId },
      { lat, lng, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(location);

  } catch (err) {
    console.error("Location Update Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getDriverLocation = async (req, res) => {
  try {
    const driverId = Number(req.query.driverId);

    const location = await DriverLocation.findOne({ driverId });

    res.json(location);

  } catch (err) {
    console.error("Location Fetch Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
