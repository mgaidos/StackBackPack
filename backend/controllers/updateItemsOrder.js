const UserData = require('../models/userDataModel')

const updateItemsOrder = async (req, res) => {
    const { idOfSelectedList, clickedCategory, newOrder } = req.body
    console.log("list " + idOfSelectedList)
    console.log("Category: " + clickedCategory)
    //console.log(newOrder)

    console.log('Updatuju order items')

    try {

        await UserData.updateMany(
            { _id: idOfSelectedList },
            { $set: { 'listCategories.$[elem].items': newOrder } },
            {
                arrayFilters: [
                    { 'elem._id': clickedCategory }
                ]
            }
        )

        res.status(201).json({ message: 'Items order update was successful' })

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Items order update failed' })
    }

}

module.exports = updateItemsOrder