const UserData = require('../models/userDataModel')

const deleteItem = async (req, res) => {
    const { idOfSelectedList, idOfCategory, removedItemId } = req.body

    console.log(req.body)

    try {
        await UserData.updateOne({ _id: idOfSelectedList },
            { $pull: { 'listCategories.$[elem].items': { _id: removedItemId } } },
            { arrayFilters: [{ 'elem._id': idOfCategory }] })

        res.status(201).json({ message: "Item odstraněn" })
    } catch (err) {
        console.log(err)
    }



}

module.exports = deleteItem