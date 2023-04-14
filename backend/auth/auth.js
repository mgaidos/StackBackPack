
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {

    const customHeader = req.headers['custom-header']

    if (customHeader === 'fetchingUserLists-shared') {
        next()

    /*
        For request from url to share list
  
        if custom-header === 'fetchingUserLists-shared', authentication is skipped
    */
    } else {

        //consolole.log(req.headers['authorization'])

        const authHeader = req.headers['authorization']
        //console.log(authHeader)
        const token = authHeader
        //coe.log('jsem v auth')
        //consnsole.log(token)

        if (!token) return res.status(401).json({ message: 'Authorization denied' })


        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
            if (err) return res.sendStatus(403)
            req.userId = userId
            next()
        })

    }

}

module.exports = authenticateToken