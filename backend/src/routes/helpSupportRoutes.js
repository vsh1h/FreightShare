const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createTicket,
  getTickets,
  getTicketById,
  addResponse,
  closeTicket,
} = require("../controllers/helpSupportControllers");

// All routes require authentication
router.post("/tickets", protect, createTicket);
router.get("/tickets", protect, getTickets);
router.get("/tickets/:id", protect, getTicketById);
router.post("/tickets/:id/responses", protect, addResponse);
router.post("/tickets/:id/close", protect, closeTicket);

module.exports = router;
