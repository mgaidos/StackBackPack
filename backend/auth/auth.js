
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {

    console.log('jsem v auth')
    //console.log(req.headers['authorization'])
    const authHeader = req.headers['authorization']
    //console.log(authHeader)
    const token = authHeader
    console.log(token)
    
    if (!token) return res.status(401).json({ message: 'Authorization denied' })


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
        if (err) return res.sendStatus(403)
        req.userId = userId
        next()
    })
}

module.exports = authenticateToken