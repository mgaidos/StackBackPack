import React from 'react'

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
        createNewCategory,
        userId
    } = props

    const createNewList = () => {

        const listId = new Date().getTime()
            setLists(
                [...lists,
                {
                    _id: listId,
                    value: '',
                    type: 'text',
                    shareUrl: `https://stackbackpack.netlify.app/my-list/${userId}/${listId}`
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
                    shareUrl={oneList.shareUrl}
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