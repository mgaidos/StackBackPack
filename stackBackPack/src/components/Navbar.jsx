import React from 'react'
import { useState, useEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

//styles
import '../components/navbar.scss'

const Navbar = (props) => {

    const { handleShowLists } = props

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const { loggedIn, setLoggedIn } = props

    useEffect(()=> {


        return () => {
            setIsOpen(false)
        }
    }, [])
    

    const handleClick = (e) => {
        if (e.target.id === 'navigation') {
            return
        }

        if (e.target.id === 'logout') {
            setIsOpen(!isOpen)
            setLoggedIn(false)
            localStorage.removeItem('token')
            navigate('/')
        }

        if (e.target.id === 'login' || 'home' || 'register') {
            setIsOpen(!isOpen)

        }



    }

    const handleHamburgerClick = (e) => {
        console.log(e.target)
        setIsOpen(!isOpen)
        handleShowLists()

    }

    return <header>
        <h1>StackBackPack</h1>

        <button onClick={handleHamburgerClick} className='hamburger' >
            <span className={`line ${isOpen ? 'open' : ''}`}></span>
            <span className={`line ${isOpen ? 'open' : ''}`}></span>
            <span className={`line ${isOpen ? 'open' : ''}`}></span>
        </button>

        <div className='nav-container'>
            <nav id='navigation' onClick={handleClick} className={` ${isOpen ? 'nav-open' : ''}`}>
                {loggedIn ? '' : <NavLink id='home' to='/'>Home</NavLink>}
                {loggedIn ? <a className='logout-button' id='logout' >Log out</a> : ''}
                {loggedIn ? '' : <NavLink id='login' to='/login'>Login</NavLink>}
                {loggedIn ? '' : <NavLink id='register' to='/register'>Register</NavLink>}
            </nav>
        </div>
    </header>

}

export default Navbar