const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const users = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        passwordHash: hashPassword,
        role: role,
      },
    });

    if (users) {
      res.status(201).json({
        message: "User registered successfully",
        users: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          phone: users.phone,
        },
        token: generateToken(users),
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
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const users = await prisma.user.findUnique({
      where: { email },
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
          phone: users.phone,
        },
        token: generateToken(users),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const oauthComplete = async (req, res) => {
  try {
    const { email, name, phone, role } = req.body;

    if (!email || !name || !phone || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists by email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // User exists - check if they have the same role
      if (user.role !== role) {
        return res.status(400).json({
          message: "Email already registered with a different role",
          existingRole: user.role,
        });
      }

      // Check if phone number is being used by another user
      const phoneExists = await prisma.user.findFirst({
        where: {
          phone: phone,
          NOT: {
            id: user.id,
          },
        },
      });

      if (phoneExists) {
        return res
          .status(400)
          .json({ message: "Phone number already in use by another account" });
      }

      // Update phone number if it's different
      if (user.phone !== phone) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { phone: phone },
        });
      }

      // Return existing user with token
      return res.status(200).json({
        message: "Login successful",
        users: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token: generateToken(user),
        isNewUser: false,
      });
    }

    // User doesn't exist - create new user with OAuth
    // Check if phone number is already taken
    const phoneExists = await prisma.user.findUnique({
      where: { phone },
    });

    if (phoneExists) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // Create new user without password (OAuth user)
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        passwordHash: "", // OAuth users don't have password
        role: role,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      users: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
      token: generateToken(newUser),
      isNewUser: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // User exists, return user data with token
      res.json({
        exists: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token: generateToken(user),
      });
    } else {
      // User doesn't exist
      res.json({
        exists: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, oauthComplete, checkUser };
