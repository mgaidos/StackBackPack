const UserData = require('../models/userDataModel')

const deleteList = async (req, res) => {
    const { removedListId } = req.body
    console.log(req)

    try {
        await UserData.findByIdAndDelete(removedListId)
        res.status(200).json({ message: 'Item deleted' })
    } catch (err) {
        res.status(400).json({ message: 'Item cannot be deleted!' })
    }
}

module.exports = deleteList