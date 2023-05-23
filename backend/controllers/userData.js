const UserData = require('../models/userDataModel')
const CategoriesSchema = require('../models/userDataModel')
const ItemsSchema = require('../models/userDataModel')

const userData = async (req, res) => {
    const { _id, user, listName, shareUrl, open } = req.body
    
    //Creating new list

    try {

        if(!listName) {
           return res.status(400).json({message: 'Insert name of list!'})
        }

        const newUserData = new UserData({
            _id,
            user,
            listName,
            shareUrl,
            open
        })

        await newUserData.save()

        res.status(201).json({ message: 'Data saved!!' })

    } catch(err) {
        console.log(err)
    }
}

module.exports = userData