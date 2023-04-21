import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'



import axios from 'axios'

//config
import { USER_DASHBOARD_URL } from '../config.js'

//components
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardData from '../components/DashboardData'


//styles
import './Dashboard.scss'


const Dashboard = (props) => {


    const { setLoggedIn, isSharedList, listId } = props


    //states
    const [authenticated, setAuthenticated] = useState(true)


    const [lists, setLists] = useState([])
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [listsInDb, setListsInDb] = useState([])

    const [actualListNameValue, setActualListNameValue] = useState('')



    const [idOfSelectedList, setIdOfSelectedList] = useState(listId ? listId : '')
    const [idOfSelectedCategory, setIdOfSelectedCategory] = useState('')


    const [addingItems, setAddingItems] = useState(false)

    const [dashboardDataHeading, setDashboardDataHeading] = useState('')
    const [shareUrl, setShareUrl] = useState('')



    //params
    const { userId } = useParams()

    //console.log(userId)

    /* fetching users lists */
    useEffect(() => {

        //console.log(typeof idOfSelectedList)
        const accessToken = localStorage.getItem('token')
        //console.log(accessToken)


        if (!isSharedList) {
            axios.get(`${USER_DASHBOARD_URL}/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Custom-Header': 'fetchingUserLists',
                    'Authorization': accessToken

                }
            })
                .then(response => {
                    const data = response.data.result


                    setLists(
                        ...lists,
                        data
                    )
                    const cat = data.flatMap(list => list.listCategories.filter(obj => typeof obj === 'object'))

                    const items = data.flatMap(list => list.listCategories.filter(obj => typeof obj === 'object').flatMap(category => category.items.filter(obj => typeof obj === 'object')))



                    setCategories(cat)
                    setItems(items)
                    setListsInDb(data)
                    setLoggedIn(true)
                })
                .catch(err => {
                    console.log(err)
                    setAuthenticated(false)
                })
        } else {
            axios.get(`${USER_DASHBOARD_URL}/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Custom-Header': 'fetchingUserLists-shared',

                }
            })
                .then(response => {
                    const data = response.data.result

                    //console.log(data)
                    setLists(
                        ...lists,
                        data
                    )
                    const cat = data.flatMap(list => list.listCategories.filter(obj => typeof obj === 'object'))

                    const items = data.flatMap(list => list.listCategories.filter(obj => typeof obj === 'object').flatMap(category => category.items.filter(obj => typeof obj === 'object')))

                    const name = data.filter(list => list._id == listId)[0].listName



                    setActualListNameValue(name)
                    setDashboardDataHeading(name)

                    setCategories(cat)
                    setItems(items)
                    setListsInDb(data)
                    setLoggedIn(true)
                })
                .catch(err => {
                    console.log(err)
                    setAuthenticated(false)
                })
        }

    }, [])


    useEffect(() => {
        //console.log(idOfSelectedCategory)
    }, [idOfSelectedCategory])

    useEffect(() => {
        /*runs if items are added, does not run if items are removed */
        //console.log(items)
        if (addingItems) {
            const savingItem = items[items.length - 1]
            saveItemToDb(idOfSelectedList, idOfSelectedCategory, savingItem)
            setAddingItems(false)
        }
    }, [items])

    useEffect(() => {
        //console.log(categories)
    }, [categories])

    useEffect(() => {
        if (!isSharedList) {
            let url

            if (idOfSelectedList) {
                url = lists.filter(oneList => oneList._id == idOfSelectedList)[0].shareUrl
                //console.log(url)
                setShareUrl(url)
            }

            //console.log(idOfSelectedList)
        }

    }, [idOfSelectedList])




    const createNewCategory = (e) => {
        // //console.log(e.target.id)
        ////console.log(categories)

        const hasInitialCategory = categories.filter(category => category._idOfList === e.target.id)
        //console.log(hasInitialCategory)

        //When I click on list it creates the first category if it is not already created  

        if (e.target.name === 'new-list-input' && !hasInitialCategory.length) {

            setCategories(
                [...categories,
                {
                    _id: new Date().getTime(),
                    _idOfList: e.target.id,
                    categoryName: '',

                }
                ])

        }

        if (e.target.name === 'add-category-button') {
            // When I click on Add category button it creates a new category   
            setCategories(
                [...categories,
                {
                    _id: new Date().getTime(),
                    _idOfList: idOfSelectedList,
                    categoryName: '',

                }
                ])
        }


    }

    const createNewItem = (e) => {

        setItems(
            [...items,
            {
                _id: new Date().getTime(),
                _idOfCategory: e.target.id,
                _idOfList: idOfSelectedList,
                itemName: '',
                itemDescription: '',
                quantity: 0,
                weight: 0,
                unit: 'g'

            }
            ]
        )

        setAddingItems(true)
    }

    const handleClickOnAddCategory = (e) => {
        createNewCategory(e)
    }

    const handleClickOnAddItem = (e) => {
        setIdOfSelectedCategory(e.target.id)
        createNewItem(e)
    }

    const handleDeleteItemClick = (e) => {
        ////console.log("Deleting item...: " + e.target.id)
        const filteredItems = items.filter(item => item._id != e.target.id)
        ////console.log(typeof e.target.value)

        const removedItem = items.filter(item => item._id == e.target.id)
        // //console.log(typeof e.target.value)

        const idOfCategory = removedItem[0]._idOfCategory

        const removedItemId = e.target.id


        setItems(filteredItems)
        const accessToken = localStorage.getItem('token')

        axios.delete(`${USER_DASHBOARD_URL}/${userId}`, {

            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'deleteItem',
                'Authorization': accessToken
            },
            data: {
                idOfSelectedList: idOfSelectedList,
                idOfCategory: idOfCategory,
                removedItemId: removedItemId
            }
        })
            .then(response => {
                const data = response.data
                //console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleDeleteCategoryClick = (e) => {

        const filteredCategories = categories.filter(category => category._id != e.target.name)
        const filteredItems = items.filter(item => item._idOfCategory != e.target.name)

        const removedCategoryId = e.target.name
        ////console.log(e.target.name)
        const accessToken = localStorage.getItem('token')
        axios.delete(`${USER_DASHBOARD_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'deleteCategory',
                'Authorization': accessToken
            },
            data: {
                removedCategoryId: removedCategoryId,
                idOfSelectedList: idOfSelectedList
            }
        })
            .then(response => {
                const data = response
                ////console.log(data)

                setItems(filteredItems)
                setCategories(filteredCategories)
            })
            .catch(err => {
                console.log(err)
            })

    }



    const handleClickOnCategory = (id) => {
        setIdOfSelectedCategory(id)
    }

    const saveItemToDb = (idOfList, idOfCategory, savingItem) => {
        const accessToken = localStorage.getItem('token')
        axios.post(`${USER_DASHBOARD_URL}/${userId}`, {
            idOfList, idOfCategory, savingItem
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'newItem',
                'Authorization': accessToken
            }
        })

            .then(response => {
                const data = response.data
                ////console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }



    if (!authenticated) {
        //redirect
        return <Navigate replace to='/login' />
    } else {

        return (
            <motion.main
                className='dashboard'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
            >
                {!isSharedList ? <DashboardSidebar
                    lists={lists}
                    setLists={setLists}
                    listsInDb={listsInDb}
                    setDashboardDataHeading={setDashboardDataHeading}
                    setIdOfSelectedList={setIdOfSelectedList}
                    createNewCategory={createNewCategory}
                    actualListNameValue={actualListNameValue}
                    setActualListNameValue={setActualListNameValue}
                    userId={userId}
                /> : null}
                <DashboardData
                    dashboardDataHeading={dashboardDataHeading}
                    idOfSelectedList={idOfSelectedList}
                    handleClickOnAddItem={handleClickOnAddItem}
                    handleClickOnAddCategory={handleClickOnAddCategory}
                    categories={categories}
                    setCategories={setCategories}
                    handleDeleteItemClick={handleDeleteItemClick}
                    handleDeleteCategoryClick={handleDeleteCategoryClick}
                    handleClickOnCategory={handleClickOnCategory}
                    items={items}
                    setItems={setItems}
                    listsInDb={listsInDb}
                    idOfSelectedCategory={idOfSelectedCategory}
                    actualListNameValue={actualListNameValue}
                    lists={lists}
                    isSharedList={isSharedList}
                    shareUrl={shareUrl}


                />

            </motion.main>
        )

    }
}

export default Dashboard