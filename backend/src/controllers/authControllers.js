const prisma = require("../config/db");
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

const signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ message: "User with this email or phone already exists" });
    }

   

    const hashPassword = await bcrypt.hash(password, 10);

    const users = await prisma.user.create({
      data: {
        name:name,
        email:email,
        phone:phone,
        passwordHash: hashPassword,
        role:role
      }
    });

    if (users) {
      res.status(201).json({
        message: "User registered successfully",
        users: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          phone: users.phone
        },
        token: generateToken(users)
      });
    } else {
      res.status(400).json({ message: "Invalid users data" });
    }
  // console.log(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const users = await prisma.user.findUnique({
      where: { email }
    });

    //  const pass = await bcrypt.hash("123456789",10)
    //  const hash = "$2b$10$vXh2WkvXO5cQ94xrY8BNT.soXz6gom9nLFzrTUVYSTIHpx3j93fRG"

    //  const comp = await bcrypt.compare(pass, hash)

    //  console.log({
    //   pass,
    //   hash,
    //   comp
    //  })


    // console.log({users})
    
    // console.log(await bcrypt.compare(password, users.passwordHash))

    if (users && (await bcrypt.compare(password, users.passwordHash))) {
      res.json({
        message: "Login successful",
        users: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          phone: users.phone
        },
        token: generateToken(users)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };