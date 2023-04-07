import React from 'react'
import { useState, useEffect } from 'react'
import { debounce } from 'lodash-es'
import { useParams } from 'react-router-dom'
import axios from 'axios'

//styles
import './Item.scss'

const Item = (props) => {

    const {
        id,
        idOfSelectedList,
        idOfSelectedCategory,
        handleDeleteItemClick,
        itemName,
        itemDescription,
        quantity,
        weight,
        unit,
        items,
        setItems,
    }
        = props

    const [updatingItems, setUpdatingItems] = useState(false)
    const [idOfSelectedItem, setIdOfSelectedItem] = useState('')

    const { userId } = useParams()

    useEffect(() => {
        // This side effect is triggered by the handleChangeOnInputs function which changes the state of items. The function has debouncing set to 1000 ms. 
        if (updatingItems) {
            updateItem()
        }
        setUpdatingItems(false)
    }, [items])


    const handleChangeOnInputs = debounce((e, id) => {

        setIdOfSelectedItem(id)

        const changingInput = e.target.name



        if (changingInput === 'item-name') {
            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, itemName: e.target.value }
                    :
                    oneItem))
        }
        if (changingInput === 'item-description') {
            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, itemDescription: e.target.value }
                    :
                    oneItem))

        }
        if (changingInput === 'item-pcs') {
            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, quantity: +(e.target.value) }
                    :
                    oneItem))

        }
        if (changingInput === 'item-weight') {
            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, weight: +(e.target.value), unit: unit ? unit : 'g' }
                    :
                    oneItem))

        }
        if (changingInput === 'item-unit') {
            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, unit: e.target.value }
                    :
                    oneItem))

        }

        setUpdatingItems(true)

    }, 1000)

    const updateItem = () => {
        const updatedItem = items.filter(oneItem => oneItem._id == idOfSelectedItem)

        console.log("updatuju")

        axios.put(`http://localhost:3000/dashboard/${userId}`, {
            idOfSelectedList, idOfSelectedCategory, updatedItem
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'updateItem'
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



    return <li className='category-ul-items' onChange={(e) => handleChangeOnInputs(e, id)} >
        <div className='category-li-items'>
            <div className='item-name-description'>
                <input type="text" name='item-name' defaultValue={itemName} placeholder='Item name' />
                <input type="text" name='item-description' defaultValue={itemDescription} placeholder='Item description' />
            </div>
            <div className='item-quantity-weight'>
                <input type="number" min={0} name='item-pcs' defaultValue={quantity ? quantity : 0} placeholder='pcs' className='input-qty' />
                <div className='select-weight'>
                    <input type="number" min={0} name='item-weight' defaultValue={weight ? weight : 0} placeholder='0' />
                    <select defaultValue={unit} name='item-unit' id='unit-of-weight'>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>

                </div>
                <button className='delete-item-button' id={id} onClick={handleDeleteItemClick}>X</button>
            </div>
        </div>
    </li>


    {
        /*
    
        <ul className='category-ul-items' onChange={(e) => handleChangeOnInputs(e, id)} >
            <li className='category-li-items'>
                <div className='item-name-description'>
                    <input type="text" name='item-name' defaultValue={itemName} placeholder='Item name' />
                    <input type="text" name='item-description' defaultValue={itemDescription} placeholder='Item description' />
                </div>
                <div className='item-quantity-weight'>
                    <input type="number" min={0} name='item-pcs' defaultValue={quantity} placeholder='pcs' className='item-1' />
                    <div className='item-2'>
                        <input type="number" min={0} name='item-weight' defaultValue={weight} placeholder='0' />
                        <select defaultValue={unit} name='item-unit' id='unit-of-weight'>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                        </select>
                        <button id={id} onClick={handleDeleteItemClick}>X</button>
                    </div>
                </div>
            </li>
        </ul>
    
    
    
    
    */
    }


}

export default Item