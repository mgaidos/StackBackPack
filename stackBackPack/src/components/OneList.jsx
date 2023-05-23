import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import axios from 'axios'

//styles
import './OneList.scss'

//config
import { USER_DASHBOARD_URL } from '../config.js'




const OneList = (props) => {

  const {
    id,
    setIdOfSelectedList,
    setLists,
    setDashboardDataHeading,
    actualListNameValue,
    setActualListNameValue,
    lists,
    listsInDb,
    value,
    type,
    name,
    createNewCategory,
    shareUrl,
    open
  } = props

  const [listNameExist, setListNameExist] = useState(false)
  const [listNameEmpty, setListNameEmpty] = useState(false)
  const [isValidListName, setIsValidListName] = useState(true)
  const { userId } = useParams()
  const user = userId

  //This onChange function changes the list name and saves it to the database on blur. Dashboard --> DashboardSidebar --> OneListInput 


  const changeListName = (e) => {
    const updatedOrNewListId = e.target.id
    const _id = e.target.id
    const newName = e.target.value
    const oldName = lists.filter(oneList => oneList._id == updatedOrNewListId)
    const isAlreadySaved = lists.filter(oneList => oneList.listName == newName)
    const justUpdate = listsInDb.some(item => item._id == updatedOrNewListId)


    if (oldName[0].listName == newName) {
      return
    } else if (isAlreadySaved.length > 0) {
      //console.log('This name of list is already used')
      setListNameExist(true)
      return
    } else if (justUpdate) {
      //Updating the name of list
      setListNameExist(false)

      const newArr = lists.map(oneList =>
        oneList._id == updatedOrNewListId ? { ...oneList, listName: newName } : oneList
      )
      setLists(newArr)

      //console.log(newArr)

      const accessToken = localStorage.getItem('token')

      axios.put(`${USER_DASHBOARD_URL}/${userId}`, {
        _id, newName, shareUrl
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': 'updateListName',
          'Authorization': accessToken
        }
      })
        .then(response => {
          const data = response.data
          //console.log(response)

          if (data.message === 'List name update was successful') {
            //console.log(data.message)
          } else {
            return
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {

      //Saving new list
      setListNameExist(false)
      const newArr = lists.map(oneList =>
        oneList._id == updatedOrNewListId ? { ...oneList, listName: newName } : oneList
      )
      setLists(newArr)

      const accessToken = localStorage.getItem('token')
      const listName = e.target.value

      axios.post(`${USER_DASHBOARD_URL}/${userId}`, {
        _id, user, listName, shareUrl, open
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Custom-Header': 'savingNewList',
          'Authorization': accessToken
        }
      })
        .then(response => {
          const data = response.data
          ////console.log(data)

          if (data.message === 'Data saved!!') {
            //console.log(data.message)
          } else {
            return
          }

        })
        .catch(err => {
          console.log(err)
        })


      return
    }

  }


  const handleDeleteListClick = (e) => {
    const removedListId = parseInt(e.target.name)
    const filteredLists = lists.filter(list => list._id != removedListId)
    //console.log(removedListId)
    const accessToken = localStorage.getItem('token')

    axios.delete(`${USER_DASHBOARD_URL}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Custom-Header': 'deleteList',
        'Authorization': accessToken
      },
      data: { removedListId: removedListId }
    })
      .then(response => {
        const data = response
        //console.log(data)
        setLists(filteredLists)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const handleClickOnInput = (e) => {

    const accessToken = localStorage.getItem('token')
    const _id = e.target.id

    setActualListNameValue(value)
    setIdOfSelectedList(e.target.id)
    setDashboardDataHeading(e.target.value)
    e.target.value ? createNewCategory(e) : ''

    lists.map(oneList => {
      oneList.id == id ? {...oneList, open: true} : null
    })

    axios.put(`${USER_DASHBOARD_URL}/${userId}`, {
      _id, open
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Custom-Header': 'updateOpen',
        'Authorization': accessToken
      }
    })
      .then(response => {
        const data = response.data

        if (data.message === 'List open update was successful') {

        } else {
          return
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

  const handleChange = (e) => {
    setDashboardDataHeading(e.target.value)
    setActualListNameValue(e.target.value)

    actualListNameValue ? createNewCategory(e) : ''
  }


  const handleBlur = (e) => {
    changeListName(e)
    actualListNameValue ? setListNameEmpty(false) : setListNameEmpty(true)
  }

  return <React.Fragment>
    <motion.li
      className='one-list-li'
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        default: {
          duration: 0.1,
          ease: [0, 0, 0, 1.01]
        },
        scale: {
          type: "spring",
          damping: 50,
          stiffness: 500,
        }
      }}
    >
      <div className='one-list-input-wrapper'>
        <input
          className={`one-list-input ${listNameExist || listNameEmpty ? 'input-err' : ''} `}
          defaultValue={value}
          onBlur={handleBlur}
          type={type}
          onClick={handleClickOnInput}
          onChange={(e) => {
            handleClickOnInput
            handleChange(e)
          }}
          id={id}
          name={name}
          placeholder='List name'
        />

        <button
          className='delete-list-button'
          onClick={handleDeleteListClick}
          name={id}
        >
          X
        </button>
      </div>

      {listNameExist ? <p className='list-err'>This list name already exists</p> : ''}
      {listNameEmpty ? <p className='list-err'>Add list name</p> : ''}
    </motion.li>

  </React.Fragment>
}

export default OneList