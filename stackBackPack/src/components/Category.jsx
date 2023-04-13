import React from 'react'

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Reorder } from "framer-motion"
import { debounce, indexOf } from 'lodash-es'



//components
import Item from './Item'

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
        totalUnit
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
        console.log(itemsOfOneCategory)
    }, [itemsOfOneCategory])


    useEffect(() => {
        setActualCategoryNameValue(value)
    }, [])


    useEffect(() => {
        console.log(items)
        sumWeights(categoryId, setTotalCategoryWeight)
        sumPcs(categoryId, setTotalPcsInCatgeory)
        setItemsOfOneCategory(items.filter(item => item._idOfCategory == categoryId))
    }, [items, totalUnit])

    const { userId } = useParams()

    const handleChange = (e) => {
        setActualCategoryNameValue(e.target.value)
        console.log(e.target.value)
    }

    const updateCategoryNameInDb = (idOfSelectedList, clickedCategory, newCategoryName) => {

        const accessToken = localStorage.getItem('token')
        axios.put(`http://localhost:3000/dashboard/${userId}`, {
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
                console.log(data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    const saveCategoryToDb = (savingCategory) => {

        const accessToken = localStorage.getItem('token')
        console.log(savingCategory)
        axios.post(`http://localhost:3000/dashboard/${userId}`, {
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
                console.log(data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleBlurCategory = async (e) => {
        // Onblur on the category name input saves the new category to the categories state and to the database or update category name . 
        const clickedCategory = categoryId/* e.target.parentElement.parentElement.parentElement.children[1].id*/

        const isInDb = listsInDb.flatMap(list => list.listCategories.filter(category => category._id === clickedCategory))

        const isSaved = categories.filter(category => category._id == clickedCategory)
        console.log(isSaved[0].items)


        const newCategoryName = e.target.value

        if (e.target.value && isInDb.length) {
            //just update name
            console.log('Je v databázi')
            if (isInDb[0].categoryName === e.target.value) {
                console.log("Neudelam nic")
                return
            } else if (isInDb.length || !isSaved[0].items) {

                const updatedCategories = categories.map(category =>
                    category._id === clickedCategory ? { ...category, categoryName: newCategoryName } : category
                )

                setCategories(updatedCategories)
                updateCategoryNameInDb(idOfSelectedList, clickedCategory, newCategoryName)
                console.log("updatuju jmeno")
            }

        } else if (e.target.value && !isInDb.length) {
            console.log('není v databázi')
            if (isSaved[0].categoryName && !isSaved[0].items) {
                const updatedCategories = categories.map(category =>
                    category._id === clickedCategory ? { ...category, categoryName: newCategoryName } : category
                )
                setCategories(updatedCategories)
                updateCategoryNameInDb(idOfSelectedList, clickedCategory, newCategoryName)
                console.log("updatuju jmeno")
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

        console.log(newOrder)
        console.log("updatuju databazi")
        console.log("id category" + idOfSelectedCategory)

        const clickedCategory = categoryId

        const accessToken = localStorage.getItem('token')
        axios.put(`http://localhost:3000/dashboard/${userId}`, {
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
                console.log(data)
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
                updateItemsOrder(newOrder)
                setLastUpdateTimestamp(Date.now())
            }

        }, 3000)
    }


    return <li className='category-wrapper' onClick={() => { handleClickOnCategory(categoryId) }} >
        <ul className='category-ul'>
            <li className='category-li-descriptions'>
                <input onBlur={handleBlurCategory} onChange={handleChange} type="text" name='Category name' defaultValue={value} placeholder='Category name' />
                <div className='qt-weight'>
                    <span className='qty-span-cell'>Qantity</span>
                    <span className='weight-span-cell'>Weight</span>
                    <button className='delete-category-button' name={categoryId} onClick={handleDeleteCategoryClick}>X</button>
                </div>
            </li>


            <Reorder.Group axis='y' values={itemsOfOneCategory} onReorder={debounce((newOrder) => { handleReorder(newOrder) }, 0.200)}>
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
                        handleDeleteItemClick={handleDeleteItemClick}
                        items={items}
                        setItems={setItems}
                        idOfSelectedList={idOfSelectedList}
                        idOfSelectedCategory={idOfSelectedCategory}

                    />

                })}
            </Reorder.Group>


            <li className='category-total'>
                <div className='category-total-help-div'></div>
                <div className='category-total-wrapper-div'>
                    <div><span className='category-total-qty'>{totalPcsInCatgeory}</span></div>
                    <div className='category-total-weight'>
                        <span className='category-total-value'>{totalCategoryWeight % 1 === 0 ? totalCategoryWeight : totalCategoryWeight.toFixed(3)}</span>
                        <span className='category-total-unit'>{totalUnit}</span>
                    </div>
                    <span className='category-total-help-span'></span>
                </div>
            </li>
        </ul>

        {actualCategoryNameValue ? <button id={categoryId} className='add-item-button' onClick={handleClickOnAddItem}>Add item</button> : ''}
    </li>

    /*

    return <li className='category-wrapper' onClick={() => { handleClickOnCategory(categoryId) }} >
        <ul className='category-ul'>
            <li className='category-li-descriptions'>
                <input onBlur={handleBlurCategory} onChange={handleChange} type="text" name='Category name' defaultValue={value} placeholder='Category name' />
                <div className='qt-weight'>
                    <span className='qty-span-cell'>Qantity</span>
                    <span className='weight-span-cell'>Weight</span>
                    <button className='delete-category-button' name={categoryId} onClick={handleDeleteCategoryClick}>X</button>
                </div>
            </li>

            {items.filter(item => item._idOfCategory == categoryId).map(item => {
                return <Item
                    key={item._id}
                    id={item._id}
                    itemName={item.itemName}
                    itemDescription={item.itemDescription}
                    quantity={item.quantity}
                    weight={item.weight}
                    unit={item.unit}
                    handleDeleteItemClick={handleDeleteItemClick}
                    items={items}
                    setItems={setItems}
                    idOfSelectedList={idOfSelectedList}
                    idOfSelectedCategory={idOfSelectedCategory}

                />
            })}
            <li className='category-total'>
                <div className='category-total-help-div'></div>
                <div className='category-total-wrapper-div'>
                    <div><span className='category-total-qty'>{totalPcsInCatgeory}</span></div>
                    <div className='category-total-weight'>
                        <span className='category-total-value'>{totalCategoryWeight % 1 === 0 ? totalCategoryWeight : totalCategoryWeight.toFixed(3)}</span>
                        <span className='category-total-unit'>{totalUnit}</span>
                    </div>
                    <span className='category-total-help-span'></span>
                </div>
            </li>
        </ul>

        {actualCategoryNameValue ? <button id={categoryId} className='add-item-button' onClick={handleClickOnAddItem}>Add item</button> : ''}
    </li>
    
    */

}

export default Category