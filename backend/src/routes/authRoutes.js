const express = require("express");
const { signup, login } = require("../controllers/authControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

router.get("/profile", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}`, user: req.user })
})

router.get("/admin", protect, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "Hello Admin!" })
})

module.exports = router;