import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './SharedLayout.scss'

//components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ShardeLayout = (props) => {

  const { loggedIn, setLoggedIn } = props

    return <>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Outlet/>
        <Footer/>
    </>

}

export default ShardeLayout