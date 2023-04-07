
const User = require('../models/userModel')
const validateRegistration = require('../validation/regValidation')




const register = async (req, res) => {
    const { username, email, password } = req.body
    //joi validation
    const { error } = validateRegistration(req.body)

    try {
        if (error) {
            res.status(401).send(error.details[0].message);
            return
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({ message: 'This email is already registered' })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save()

        res.status(201).json({ message: 'Registration was successful' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Unexpected error' })

    }

}

module.exports = register