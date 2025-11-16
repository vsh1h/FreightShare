const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

dotenv.config();

const register = async (req, res) => {
  const {username,email,password}=req.body
  if (!username || !email || !password){
    return res.status(400).json({"message": "invalid user credentials"})
  }
  const uniqueMail = await prisma.user.findUnique({
    where :{
      email : email
    }
  })
  if (uniqueMail){
    return res.status(400).json({"message": "user with this email already exists"})
  }
  const hashPassword = await bcrypt.hash(password,10)
  const InsertData = await prisma.user.create({
    data:{
        "name": username,
        "email": email,
        "password": hashPassword
    }
  })
  return res.status(201).json({
    "message": "signup successful",
    "user":InsertData
  })
}

const login =  async (req, res) => {
  res.send("hello")
    try{
        const {username,email,password}=req.body
        if (!password || !email || !username || !role){
            return res.status(400).json({
                "error": "All fields are required"
            })
        }
        const user = await prisma.user.findUnique({
            where:{
                username,
                email
            }
        })
        if (!user){
            return res.status(400).json({ message: "Invalid credentials" })
        }
        if (user.role != role){
          return res.status(403).json({message :"Request denied for the role "})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch){
            return res.status(400).json({ message: "Wrong password" })
        }
        else{
            const token = generateToken(user)
            res.status(200).json({ message: "Login successful", token, user })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}

module.exports = { register, login };