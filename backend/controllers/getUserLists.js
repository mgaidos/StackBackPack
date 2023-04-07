const UserDataModel = require('../models/userDataModel')
const UserModel = require('../models/userModel')

const getUserLists = async (req, res) => {
    /* User id from url */
    const userId = req.params.id
    //console.log("PARAMETR Z URL: " + userId)
    //console.log("TYP PARAMETRU Z URL: " + typeof userId)
    try {

        /* Finds user data in the database using id from url */
        /*
        const userData = await UserDataModel.find({ _id: userId })
        console.log("pole: " + userData)
        */
        
        /* Finds a user in the database and returns their email */
        const { _id, email } = await UserModel.findOne({ _id: userId })
        console.log(_id)
        console.log(email)
        

        /* Joins data from the users and userdatas collections by user id into the oneUserData */

        if (_id) {
            
            console.log("email je: " + email)
            UserDataModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'oneUserData'
                    }
                },
                {
                    $match: {
                        'oneUserData._id': _id
                    }
                }
            ])
                /* Also the exec() method can be used */
                .then(result => {

                    if (!result.length) {
                        console.log(result)
                        res.status(400).json({ message: 'data not found' })
                        return
                    }
                    console.log(result)
                    res.status(201).json({ result })
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
                })

        } else {

            return res.status(400).json({ message: "Chyba" })

        }


    } catch (err) {
        console.log(err)
    }

}

module.exports = getUserLists