
const UserData = require('../models/userDataModel')

const updateListName = async (req, res) => {
    const {_id, newName, shareUrl} = req.body

    try {

        console.log(_id)
        console.log(newName)

        await UserData.updateOne({ _id: parseInt(_id) }, { $set: {listName: newName} , shareUrl: shareUrl })
        res.status(201).json({ message: 'List name update was successful' })

    } catch(err) {
        console.log(err)
        res.status(400).json({ message: 'List name update failed' })
    }
}

module.exports = updateListName