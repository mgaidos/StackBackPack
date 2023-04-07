const UserData = require('../models/userDataModel')

const saveCategoryToDb = async (req, res)=> {
    const {savingCategory} = req.body
    const {_idOfList } = savingCategory
    
    try {
        const data = await UserData.findById({ _id: _idOfList })

        if(data) {
            
            await UserData.updateOne({_id: _idOfList, }, { $push: {listCategories: savingCategory} })



            res.status(201).json({message: 'Melo by to být ok'})
        } else {
            console.log('Nejaka chyba')
        }

    } catch(err) {
        console.log(err)
        res.status(400).json({ message: "Some error..." })
    }
}

module.exports = saveCategoryToDb