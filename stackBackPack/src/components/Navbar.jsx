import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

//styles
import '../components/navbar.scss'

const Navbar = (props) => {

    const navigate = useNavigate()

    const { loggedIn, setLoggedIn } = props

    const handleClick = () => {
        setLoggedIn(false)
        localStorage.removeItem('token')
        navigate('/')
    }

    return <header>
        <h1>StackBackPack</h1>
        <div className='nav-container'>
            <nav >
                {loggedIn ? '' : <NavLink to='/'>Home</NavLink>}
                {loggedIn ? <a className='logout-button' onClick={handleClick}>Log out</a> : ''}
                {loggedIn ? '' : <NavLink to='/login'>Login</NavLink>}
                {loggedIn ? '' : <NavLink to='/register'>Register</NavLink>}
            </nav>
        </div>
    </header>

}

export default Navbar