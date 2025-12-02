const express = require("express")
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors')
dotenv.config();
// const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// const connectMongo = require("./config/mongo");

const app = express();
app.use(express.json());

// setting up cors 
// change local host dekh ke 
app.use(cors({
  origin: 'https://freight-share.vercel.app/',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("FreightShare Backend Running");
});

const PORT = process.env.PORT || 8000

app.listen(PORT, async() => {
  console.log(`server is listening at ${PORT}`)
  // await connectMongo();
})

module.exports = app;