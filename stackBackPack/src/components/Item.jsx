import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash-es'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Reorder, useDragControls } from "framer-motion"

//components
import ItemUrlModal from './ItemUrlModal'

//icons
import { MdDragIndicator } from 'react-icons/md'
import { TbShirt } from 'react-icons/tb'
import { GiKnifeFork } from 'react-icons/gi'
import { FiLink } from 'react-icons/fi'

//styles
import './Item.scss'

//config
import { USER_DASHBOARD_URL } from '../config.js'

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
        wearable,
        eatable,
        setItems,
        itemUrl,
        value,
        handleOnMouseUp,
        isSharedList
    }
        = props

    const [updatingItems, setUpdatingItems] = useState(false)
    const [idOfSelectedItem, setIdOfSelectedItem] = useState('')
    const [labelsVisible, setLabelsVisible] = useState(false)
    const [isWearable, setIsWearable] = useState(wearable)
    const [isEatable, setIsEatable] = useState(eatable)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { userId } = useParams()

    const controls = useDragControls()






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


        isSharedList ? '' : setUpdatingItems(true)

    }, 500)

    const updateItem = () => {
        const updatedItem = items.filter(oneItem => oneItem._id == idOfSelectedItem)

        const accessToken = localStorage.getItem('token')



        axios.put(`${USER_DASHBOARD_URL}/${userId}`, {
            idOfSelectedList, idOfSelectedCategory, updatedItem
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'updateItem',
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

    const handleMouseOver = () => {
        setLabelsVisible(true)


    }
    const handleMouseLeave = () => {
        setLabelsVisible(false)


    }

    const handleClickOnLabels = (e, id) => {
        //e.stopPropagation()
        setIdOfSelectedItem(id)


        if (e.target.id === 'wearable') {

            if (isEatable) return

            setIsWearable(!isWearable)
            //console.log( Boolean(e.target.getAttribute('value')))

            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, wearable: !isWearable }
                    :
                    oneItem))

        }

        if (e.target.id === 'eatable') {

            if (isWearable) return


            setIsEatable(!isEatable)

            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, eatable: !isEatable }
                    :
                    oneItem))

        }

        if (e.target.id === 'item-link') {
           // console.log('link')

            setIsModalOpen(!isModalOpen)
        }

        //console.log(isModalOpen)

        isSharedList ? '' : setUpdatingItems(true)
    }



    return <Reorder.Item
        value={value}
        dragListener={false}
        dragControls={controls}
    >
        <ul onMouseLeave={isSharedList ? '' : handleMouseLeave} onMouseOver={isSharedList ? '' : handleMouseOver} className='category-ul-items' onChange={(e) => handleChangeOnInputs(e, id)} >
            <div className="reorder-handle" style={{ touchAction: "none" }} onPointerDown={(e) => controls.start(e)}><MdDragIndicator style={{ fontSize: '1.6rem' }} /></div>
            <div className='category-li-items'>
                <div className='item-name-description'>

                    {
                        isSharedList
                            ?
                            <div>
                                <a target='_blank' className='item-anchor' href={itemUrl}>{itemName}</a>
                            </div>

                            :
                            <input className={isSharedList ? 'item-name read-only' : 'item-name'} type="text" name='item-name' defaultValue={itemName} placeholder='Item name' />
                    }



                    <input className={isSharedList ? 'item-description read-only' : 'item-description'} type="text" name='item-description' defaultValue={itemDescription} placeholder='Item description' />
                </div>
                <div className='item-quantity-weight'>



                    <div /*onClick={(e)=> e.stopPropagation()}*/ className={labelsVisible ? 'labels labels-visible' : 'labels'}>
                        {
                            <TbShirt
                                id='wearable'
                                onClick={isSharedList ? '' : (e) => handleClickOnLabels(e, id)}
                                className={isWearable || labelsVisible ? 'wearable-visible' : ''}

                            />
                        }

                        {
                            <GiKnifeFork
                                id='eatable'
                                onClick={isSharedList ? '' : (e) => handleClickOnLabels(e, id)}
                                className={isEatable || labelsVisible ? 'eatable-visible' : ''}

                            />

                        }

                        {


                            <FiLink
                                id='item-link'
                                onClick={isSharedList ? '' : (e) => handleClickOnLabels(e, id)}
                                className={itemUrl || labelsVisible ? 'link-visible' : ''}
                            />
                        }

                        {
                            isSharedList ?
                                ''
                                :
                                <ItemUrlModal
                                    isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}
                                    items={items}
                                    setItems={setItems}
                                    isSharedList={isSharedList}
                                    setUpdatingItems={setUpdatingItems}
                                    id={id}
                                    itemUrl={itemUrl}
                                />
                        }





                    </div>




                    <input className={isSharedList ? 'read-only input-qty' : 'input-qty'} type="number" min={0} name='item-pcs' defaultValue={quantity ? quantity : 0} placeholder='pcs' />
                    <div className='select-weight'>
                        <input className={isSharedList ? 'read-only' : ''} type="number" min={0} name='item-weight' defaultValue={weight ? weight : 0} placeholder='0' />
                        <select defaultValue={unit} name='item-unit' id='unit-of-weight'>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                        </select>

                    </div>
                    {isSharedList ? '' : <button className='delete-item-button' id={id} onClick={handleDeleteItemClick}>X</button>}
                </div>
            </div>
        </ul>



    </Reorder.Item>

    {

    }


}

export default Item