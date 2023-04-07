const UserData = require('../models/userDataModel')


const saveItemToDb = async (req, res) => {
    const {idOfList, idOfCategory, savingItem} = req.body

    try {
        console.log(idOfList)
        console.log(idOfCategory)
        console.log(savingItem)

        await UserData.updateOne({_id: idOfList}, {$push: { 'listCategories.$[elem].items': savingItem}}, {arrayFilters: [ {'elem._id': idOfCategory} ]})

        res.status(201).json( {message: 'list uložen'} )
    } catch(err) {
        console.log(err)
    }
}

 module.exports = saveItemToDb