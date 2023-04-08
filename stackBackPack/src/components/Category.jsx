import React from 'react'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



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
        totalUnit,
        setItemUnit,
        itemUnit
    }
        = props

    const [actualCategoryNameValue, setActualCategoryNameValue] = useState('')


    const [totalCategoryWeight, setTotalCategoryWeight] = useState(0)
    const [totalPcsInCatgeory, setTotalPcsInCatgeory] = useState('')
    

 
    
    useEffect(() => {
        console.log(actualCategoryNameValue)
    }, [actualCategoryNameValue])

    useEffect(() => {
        setActualCategoryNameValue(value)
    }, [])

    useEffect(() => {
        sumWeights(categoryId, setTotalCategoryWeight)
        sumPcs(categoryId, setTotalPcsInCatgeory)
    }, [items, totalUnit, itemUnit])

    const { userId } = useParams()

    const handleChange = (e) => {
        setActualCategoryNameValue(e.target.value)
        console.log(e.target.value)
    }

    const updateCategoryNameInDb = async (idOfSelectedList, clickedCategory, newCategoryName) => {
        await axios.put(`http://localhost:3000/dashboard/${userId}`, {
            idOfSelectedList, clickedCategory, newCategoryName
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'updateCategoryName'
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
        console.log(savingCategory)
        axios.post(`http://localhost:3000/dashboard/${userId}`, {
            savingCategory
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'newCategory'
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
                    setItemUnit={setItemUnit}
            
                />
            })}
            <li className='category-total'>
                <div className='category-total-help-div'></div>
                <div className='category-total-wrapper-div'>
                    <div><span className='category-total-qty'>{totalPcsInCatgeory}</span></div>
                    <div className='category-total-weight'>
                        <span className='category-total-value'>{totalCategoryWeight}</span>
                        <span className='category-total-unit'>{totalUnit}</span>
                    </div>
                    <span className='category-total-help-span'></span>
                </div>
            </li>
        </ul>

        {actualCategoryNameValue ? <button id={categoryId} className='add-item-button' onClick={handleClickOnAddItem}>Add item</button> : ''}
    </li>

}

export default Category