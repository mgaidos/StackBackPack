const UserData = require('../models/userDataModel')



const updateCategoryName = async (req, res) => {
    const { idOfSelectedList, clickedCategory, newCategoryName } = req.body
    console.log(idOfSelectedList)
    console.log(clickedCategory)
    //console.log(newCategoryName)

    //console.log(await UserData.findById(idOfSelectedList))
try {
    await UserData.updateOne(
        { _id: idOfSelectedList },
        { $set: { 'listCategories.$[elem].categoryName': newCategoryName } },
        {
            arrayFilters: [
                { 'elem._id': clickedCategory }
            ]
        }
    )

    res.status(201).json({ message: 'Category name update was successful' })

} catch(err) {
    console.log(err)
        res.status(400).json({ message: 'Category name update failed' })
}
    

}

module.exports = updateCategoryName