const SupportTicket = require("../models/SupportTicket");

// Create a new support ticket
const createTicket = async (req, res) => {
  try {
    const { subject, message, attachmentName, attachmentUrl } = req.body;
    if (!subject || !message) {
      return res
        .status(400)
        .json({ message: "Subject and message are required" });
    }

    const ticket = new SupportTicket({
      userId: req.user.id,
      subject,
      message,
      attachmentName: attachmentName || null,
      attachmentUrl: attachmentUrl || null,
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket created", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tickets for current user (or all tickets if admin)
const getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user && req.user.role === "admin") {
      tickets = await SupportTicket.find().sort({ createdAt: -1 }).lean();
    } else {
      tickets = await SupportTicket.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .lean();
    }
    res.json({ tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single ticket by id (only owner or admin)
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await SupportTicket.findById(id).lean();
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (req.user.role !== "admin" && ticket.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({ ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a response to a ticket (support or user)
const addResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, from } = req.body; // from: 'user' or 'support'
    if (!message) return res.status(400).json({ message: "Message required" });

    const ticket = await SupportTicket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (req.user.role !== "admin" && ticket.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    ticket.responses.push({
      from: from || (req.user.role === "admin" ? "support" : "user"),
      message,
    });
    // if the responder is support, optionally change status
    if (req.user.role === "admin") ticket.status = "Pending";
    await ticket.save();

    res.json({ message: "Response added", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Close ticket
const closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await SupportTicket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (req.user.role !== "admin" && ticket.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    ticket.status = "Closed";
    await ticket.save();
    res.json({ message: "Ticket closed", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  addResponse,
  closeTicket,
};
