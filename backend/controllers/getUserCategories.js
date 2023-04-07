const UserDataModel = require('../models/userDataModel')
const UserModel = require('../models/userModel')

const getUserCategories = async (req, res) => {
    const userId = req.params.id

    try {
        console.log("toto je id: " + userId)

        const { _id } = await UserModel.findOne({ _id: userId })
        console.log("a idecko jee: " + _id)

        if (_id) {
            UserDataModel.aggregate([
                {
                    $lookup: {
                        from
                    }
                }
            ])
        }
    } catch(err) {
        console.log(err)
    }

}

module.exports = getUserCategories