const UserData = require('../models/userDataModel')

const deleteCategory = async (req, res) => {

    const { removedCategoryId, idOfSelectedList } = req.body
    console.log(removedCategoryId)
    console.log(idOfSelectedList)
    try {
        await UserData.updateOne(
            {_id: idOfSelectedList},
            {$pull: { listCategories: { _id: removedCategoryId}}}
        )
        

        res.status(201).json({ message: `Category id: ${removedCategoryId} removed.` })
    } catch (err) {
        console.log(err)
    }

}

module.exports = deleteCategory