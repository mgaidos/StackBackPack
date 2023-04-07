
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const validateLogin = require('../validation/logValidation')

const login = async (req, res) => {
  const { email, password } = req.body

  const { error } = validateLogin(req.body)

  try {

    if (error) {
      res.status(401).send(error.details[0].message);
      return
    }
    // Zkontrolujte, zda se e-mailová adresa shoduje s e-mailem v databázi

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Zkontrolujte, zda se hesla shodují
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("nic")
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    console.log(JSON.stringify(user._id))

    // Vytvoříme JWT token s ID uživatele jako payload
    const userId = { userId: user._id }
    //                               payload
    const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken)

    /*
    //middleware
    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null) return res.sendStatus(401)
  
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
        if(err) return res.sendStatus(403)
        req.userId = userId
        next()
      })
    }
  
   
  
    authenticateToken(req, res)
  
   */
    return res.status(201).json({ token: accessToken, userId, message: 'Login successful' })

  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Unexpected error' })
  }

}

module.exports = login