import React from 'react'
import { useState, useEffect } from 'react'
import { Reorder } from "framer-motion"

//components
import OneList from './OneList'

//styles
import './DashboardSidebar.scss'




const DashboardSidebar = (props) => {


    const {
        idOfselectedList,
        setIdOfSelectedList,
        setDashboardDataHeading,
        actualListNameValue,
        setActualListNameValue,
        lists,
        listsInDb,
        setLists,
        createNewCategory
    } = props

    const createNewList = () => {
        setLists(
            [...lists,
            {
                _id: new Date().getTime(),
                value: '',
                type: 'text'
            }]
        )
    }

    const handleClickCreateNewList = () => {
        createNewList()
    }
    return <aside>
        <h3>Your lists</h3>


        <button onClick={handleClickCreateNewList} className='new-list-button'>Create new list</button>

        <ul className='lists'>
            {lists.map((oneList) => {
                return <OneList
                    key={oneList._id}
                    id={oneList._id}
                    value={oneList.listName}
                    type='text'
                    name={'new-list-input'}
                    idOfselectedList={idOfselectedList}
                    lists={lists}
                    setLists={setLists}
                    listsInDb={listsInDb}
                    setDashboardDataHeading={setDashboardDataHeading}
                    setIdOfSelectedList={setIdOfSelectedList}
                    createNewCategory={createNewCategory}
                    actualListNameValue={actualListNameValue}
                    setActualListNameValue={setActualListNameValue}
                />
            })}
        </ul>

    </aside>

}

export default DashboardSidebar