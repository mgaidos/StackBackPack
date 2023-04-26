import React from 'react'
import { Outlet } from 'react-router-dom'
import './SharedLayout.scss'

//components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ShardeLayout = (props) => {

  const { loggedIn, setLoggedIn, handleShowLists  } = props

    return <>
        <Navbar  loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleShowLists={handleShowLists} />
        <Outlet/>
        <Footer/>
    </>

}

export default ShardeLayout