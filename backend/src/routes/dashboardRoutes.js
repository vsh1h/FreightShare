const express = require("express");
const router = express.Router();

const {
  getDriverStats,
  getAvailableLoads,
  acceptLoad,
  getActiveLoads,
  getCompletedLoads,
  updateDriverLocation,
  getDriverLocation,
} = require("../controllers/dashboardControllers");

router.get("/stats", getDriverStats);
router.get("/loads/available", getAvailableLoads);
router.post("/loads/accept", acceptLoad);
router.get("/loads/active", getActiveLoads);
router.get("/loads/completed", getCompletedLoads);
router.post("/location/update", updateDriverLocation);
router.get("/location", getDriverLocation);

module.exports = router;
