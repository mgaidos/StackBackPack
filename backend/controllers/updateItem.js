const UserData = require('../models/userDataModel')

const updateItem = async (req, res) => {
    const { idOfSelectedList, idOfSelectedCategory, updatedItem } = req.body
    const updatedItemId = updatedItem[0]._id

    console.log('id listu: ' + idOfSelectedList)
    console.log('id kategorie: ' +idOfSelectedCategory)
    console.log('id itemu: ' + updatedItemId)
    

    
    try {
        await UserData.updateOne(
            { _id: idOfSelectedList },
            { $set: { 'listCategories.$[elemCat].items.$[elemItem]': updatedItem[0] } },
            { arrayFilters: [{ 'elemCat._id': idOfSelectedCategory }, { 'elemItem._id': updatedItemId }] }
        )

        res.status(201).json({ message: 'Item updated' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Item not updated' })
    }

}

module.exports = updateItem