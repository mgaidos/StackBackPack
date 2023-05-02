require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()


app.use(cors())
app.use(express.json())

mongoose
    .connect('mongodb+srv://MartinGaidos:martingaidos@cluster0.vyanvms.mongodb.net/SBPUsers', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Could not connect to MongoDB... ", error))

app.use("/", require("./routes/router"))

let port = process.env.PORT
if (port == null || port == "") {
  port = 8000
}

app.listen(port, () => {
    console.log("Server is running on port 8000")
    
})