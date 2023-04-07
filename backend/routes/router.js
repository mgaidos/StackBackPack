const express = require('express')
const router = express.Router()

const register = require('../controllers/register')
const login = require('../controllers/login')
const userData = require('../controllers/userData')
const getUserLists = require('../controllers/getUserLists')
const updateListName = require('../controllers/updateListName')
const newCategory = require('../controllers/newCategory')
const deleteList = require('../controllers/deleteList')
const updateCategoryName = require('../controllers/updateCategoryName')
const deleteCategory = require('../controllers/deleteCategory')
const newItem = require('../controllers/newItem')
const deleteItem = require('../controllers/deleteItem')
const updateItem = require('../controllers/updateItem')

router.route('/register').post(register)

router.route('/login').post(login)



/* Handling many put requests to one url using custom header */
router.put('/dashboard/:id', (req, res) => {
    const customHeader = req.headers['custom-header']
    console.log(customHeader)

    if (customHeader === "updateCategoryName") {
        updateCategoryName(req, res)
    }

    if (customHeader === 'updateListName') {
        updateListName(req, res)
    }

    if (customHeader === 'updateItem') {
        updateItem(req, res)
    }
})

/* Handling many get requests to one url using custom header */

router.get('/dashboard/:id', (req, res) => {

    const customHeader = req.headers['custom-header']

    console.log(customHeader)

    if (customHeader === 'fetchingUserLists') {
        getUserLists(req, res)
    }
})

/* Handling many post requests to one url using custom header */
router.post('/dashboard/:id', (req, res) => {

    const customHeader = req.headers['custom-header']

    if (customHeader === 'newCategory') {
        newCategory(req, res)
    }

    if (customHeader === 'savingNewList') {
        userData(req, res)
    }

    if(customHeader === 'newItem') {
        newItem(req, res)
    }
})

/* Handling many delete requests to one url using custom header */

//router.route('/dashboard/:id').delete(deleteList)

router.delete('/dashboard/:id', (req, res)=> {
    const customHeader = req.headers['custom-header']
    console.log(req.headers)

    if(customHeader === 'deleteList') {
        deleteList(req, res)
    }

    if(customHeader === 'deleteCategory') {
        deleteCategory(req, res)
    }

    if(customHeader === 'deleteItem') {
        deleteItem(req, res)
    }
})

module.exports = router