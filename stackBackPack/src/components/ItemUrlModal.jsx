import React from 'react'

import { useRef, useEffect } from 'react'

//styles
import './ItemUrlModal.scss'


const ItemUrlModal = (props) => {
    const {
        isModalOpen,
        setIsModalOpen,
        items,
        setItems,
        isSharedList,
        setUpdatingItems,
        id,
        itemUrl
    } = props

    useEffect(() => {

        if (isModalOpen) {
            showModal()
        }

    }, [isModalOpen])

    const modalRef = useRef(null)
    const inputUrlRef = useRef(null)

    //console.log(isModalOpen)

    const showModal = () => {
        
        
        

        modalRef.current.showModal()

    }

    const handleClick = (e) => {

        if (e.target.id === 'dialog') {
            const dialogDimension = modalRef.current.getBoundingClientRect()

            if (
                e.clientX < dialogDimension.left ||
                e.clientX > dialogDimension.right ||
                e.clientY < dialogDimension.top ||
                e.clientY > dialogDimension.bottom
            ) {

                setIsModalOpen(false)
                modalRef.current.close()
            }
        }

        if (e.target.id === 'cancel-button') {
            setIsModalOpen(false)
            modalRef.current.close()
        }

        if (e.target.id === 'save-button') {


            setItems(items.map(oneItem =>
                oneItem._id == id ?
                    { ...oneItem, itemUrl: inputUrlRef.current.value }
                    :
                    oneItem))
            isSharedList? '' : setUpdatingItems(true)

            setIsModalOpen(false)
            modalRef.current.close()
        }

    }



    return <dialog id='dialog' onClick={handleClick} ref={modalRef}>
        <h3>Add link</h3>
        <input defaultValue={itemUrl} ref={inputUrlRef} placeholder='Link here' type="text" />
        <button type='submit' id='save-button'>Save</button>
        <button type='submit' id='cancel-button'>Cancel</button>
    </dialog>

}

export default ItemUrlModal