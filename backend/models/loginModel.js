
const mongoose = require('mongoose')

//const Schema = mongoose.Schema

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

const LoginUser = mongoose.model("LoginUser", loginSchema)

module.exports = LoginUser