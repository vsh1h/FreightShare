const express = require("express")
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors')
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

// setting up cors 
// change local host dekh ke 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})

module.exports = app;