const UserData = require('../models/userDataModel')

const updateListsOpen = async (req, res) => {

    const {_id, open} = req.body

    try {
        await UserData.updateOne({ _id: parseInt(_id) }, { $set: {open: open}})
        res.status(201).json({ message: 'List open update was successful' })

    } catch(err) {
        console.log(err)
        res.status(400).json({ message: 'List open update failed' })
    }
}

module.exports = updateListsOpen