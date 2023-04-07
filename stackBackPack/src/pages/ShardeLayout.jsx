import React from 'react'
import { Outlet } from 'react-router-dom'
import './SharedLayout.scss'

//components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ShardeLayout = () => {
    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>

}

export default ShardeLayout