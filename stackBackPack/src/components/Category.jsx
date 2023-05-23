import React from 'react'

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Reorder } from "framer-motion"
import { debounce } from 'lodash-es'



//components
import Item from './Item'

//config
import { USER_DASHBOARD_URL } from '../config.js'

//styles
import './Category.scss'

const Category = (props) => {



    const {
        categoryId,
        idOfSelectedList,
        idOfSelectedCategory,
        handleClickOnAddItem,
        handleClickOnCategory,
        handleDeleteItemClick,
        handleDeleteCategoryClick,
        value,
        categories,
        setCategories,
        items,
        setItems,
        lists,
        listsInDb,
        sumWeights,
        sumPcs,
        totalUnit,
        isSharedList
    }
        = props

    const [actualCategoryNameValue, setActualCategoryNameValue] = useState('')


    const [totalCategoryWeight, setTotalCategoryWeight] = useState(0)
    const [totalPcsInCatgeory, setTotalPcsInCatgeory] = useState('')
    const [itemsOfOneCategory, setItemsOfOneCategory] = useState([])
    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(null)

    const updateTimeout = useRef(null)


    useEffect(() => {
        return () => {
            if (updateTimeout.current) {
                clearTimeout(updateTimeout.current)
            }
        }
    }, [])



    useEffect(() => {
        // console.log(itemsOfOneCategory)
    }, [itemsOfOneCategory])


    useEffect(() => {
        setActualCategoryNameValue(value)
    }, [])


    useEffect(() => {
        // console.log(items)
        sumWeights(categoryId, setTotalCategoryWeight)
        sumPcs(categoryId, setTotalPcsInCatgeory)
        setItemsOfOneCategory(items.filter(item => item._idOfCategory == categoryId))
    }, [items, totalUnit])

    const { userId } = useParams()

    const handleChange = (e) => {
        setActualCategoryNameValue(e.target.value)
        //   console.log(e.target.value)
    }

    const updateCategoryNameInDb = (idOfSelectedList, clickedCategory, newCategoryName) => {

        const accessToken = localStorage.getItem('token')
        axios.put(`${USER_DASHBOARD_URL}/${userId}`, {
            idOfSelectedList, clickedCategory, newCategoryName
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'updateCategoryName',
                'Authorization': accessToken
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

    const saveCategoryToDb = (savingCategory) => {

        const accessToken = localStorage.getItem('token')
        //console.log(savingCategory)
        axios.post(`${USER_DASHBOARD_URL}/${userId}`, {
            savingCategory
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'newCategory',
                'Authorization': accessToken
            },
        })
            .then(response => {
                const data = response.data
                // //console.log(data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleBlurCategory = async (e) => {
        // Onblur on the category name input saves the new category to the categories state and to the database or update category name . 
        const clickedCategory = categoryId

        const isInDb = listsInDb.flatMap(list => list.listCategories.filter(category => category._id === clickedCategory))

        const isSaved = categories.filter(category => category._id == clickedCategory)
        //console.log(isSaved[0].items)


        const newCategoryName = e.target.value

        if (e.target.value && isInDb.length) {
            //just update name
            //console.log('Is in Db')
            if (isInDb[0].categoryName === e.target.value) {
                return
            } else if (isInDb.length || !isSaved[0].items) {

                const updatedCategories = categories.map(category =>
                    category._id === clickedCategory ? { ...category, categoryName: newCategoryName } : category
                )

                setCategories(updatedCategories)
                updateCategoryNameInDb(idOfSelectedList, clickedCategory, newCategoryName)
                //console.log("updatating name")
            }

        } else if (e.target.value && !isInDb.length) {
            //console.log('it is not in Db')
            if (isSaved[0].categoryName && !isSaved[0].items) {
                const updatedCategories = categories.map(category =>
                    category._id === clickedCategory ? { ...category, categoryName: newCategoryName } : category
                )
                setCategories(updatedCategories)
                updateCategoryNameInDb(idOfSelectedList, clickedCategory, newCategoryName)
                //console.log("updating name")
            } else {
                const saveCategory = categories.map(category =>
                    category._id == clickedCategory ?
                        { ...category, categoryName: e.target.value }
                        :
                        category
                )
                setCategories(saveCategory)

                const savingCategory = categories.filter(category => category._id == clickedCategory)

                savingCategory[0].categoryName = e.target.value
                saveCategoryToDb(savingCategory[0])
            }


        }

    }



    const updateItemsOrder = (newOrder) => {

        //console.log(newOrder)
        //console.log("updating Db")
        //console.log("id category" + idOfSelectedCategory)

        const clickedCategory = categoryId

        const accessToken = localStorage.getItem('token')
        axios.put(`${USER_DASHBOARD_URL}/${userId}`, {
            idOfSelectedList, clickedCategory, newOrder
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'updateItemsOrder',
                'Authorization': accessToken
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

    const handleReorder = (newOrder) => {

        setItemsOfOneCategory(newOrder)



        if (updateTimeout.current) {
            clearTimeout(updateTimeout.current)
        }

        updateTimeout.current = setTimeout(() => {
            if (lastUpdateTimestamp === null || Date.now() - lastUpdateTimestamp >= 3000) {
                isSharedList ? '' : updateItemsOrder(newOrder)
                setLastUpdateTimestamp(Date.now())
            }

        }, 3000)
    }


    return <li className='category-wrapper' onClick={() => { handleClickOnCategory(categoryId) }} >
        <ul className='category-ul'>
            <li className='category-li-descriptions'>
                {
                    isSharedList
                        ?
                        <input onBlur={handleBlurCategory} onChange={handleChange} type="text" name='Category name' defaultValue={value} placeholder='Category name' readOnly />
                        :
                        <input onBlur={handleBlurCategory} onChange={handleChange} type="text" name='Category name' defaultValue={value} placeholder='Category name' />

                }

                <div className='qt-weight'>
                    <span className='wearable-help-span'></span>
                    <span className='qty-span-cell'>Qantity</span>
                    <span className='weight-span-cell'>Weight</span>
                    {isSharedList ? '' : <button className='delete-category-button' name={categoryId} onClick={handleDeleteCategoryClick}>X</button>}
                </div>
            </li>


            <Reorder.Group
                style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                }}
                axis='y'
                values={itemsOfOneCategory}
                onReorder={debounce((newOrder) => { handleReorder(newOrder) }, 0.200)

                }>
                {itemsOfOneCategory.map(item => {
                    return <Item
                        value={item}
                        id={item._id}
                        key={item._id}
                        itemName={item.itemName}
                        itemDescription={item.itemDescription}
                        quantity={item.quantity}
                        weight={item.weight}
                        unit={item.unit}
                        wearable={item.wearable}
                        eatable={item.eatable}
                        itemUrl={item.itemUrl}
                        handleDeleteItemClick={handleDeleteItemClick}
                        items={items}
                        setItems={setItems}
                        idOfSelectedList={idOfSelectedList}
                        idOfSelectedCategory={idOfSelectedCategory}
                        isSharedList={isSharedList}

                    />

                })}
            </Reorder.Group>


            <li className='category-total'>
                <div className='category-total-help-div'></div>
                <div className='category-total-wrapper-div'>
                    <span className='help-span'></span>
                    <div><span className='category-total-qty'>{totalPcsInCatgeory}</span></div>
                    <div className='category-total-weight'>
                        <span className='category-total-value'>{totalCategoryWeight % 1 === 0 ? totalCategoryWeight : totalCategoryWeight.toFixed(3)}</span>
                        <span className='category-total-unit'>{totalUnit}</span>
                    </div>
                    {isSharedList ? '' : <span className='category-total-help-span'></span>}
                </div>
            </li>
        </ul>

        {actualCategoryNameValue && !isSharedList ? <button id={categoryId} className='add-item-button' onClick={handleClickOnAddItem}>Add item</button> : ''}
    </li>


}

export default Category