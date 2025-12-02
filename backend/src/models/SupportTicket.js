const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  attachmentName: { type: String, default: null },
  attachmentUrl: { type: String, default: null },
  status: {
    type: String,
    enum: ["Open", "Closed", "Pending"],
    default: "Open",
  },
  responses: [
    {
      from: { type: String }, // 'user' or 'support'
      message: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

supportTicketSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
