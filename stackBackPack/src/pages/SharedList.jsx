import React from 'react'

import { useState } from 'react'
import { useParams } from 'react-router-dom'



//components
import Dashboard from './Dashboard'
import Footer from '../components/Footer'


const SharedList = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [isSharedList, setIsSharedList] = useState(true)


    const { listId } = useParams()
   // console.log(listId)



    return <div>
        <Dashboard
            setLoggedIn={setLoggedIn}
            isSharedList={isSharedList}
            listId={listId}
        />

        <Footer/>
    </div>

}

export default SharedList