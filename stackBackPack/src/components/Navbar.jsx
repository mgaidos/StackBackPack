import React from 'react'
import { NavLink } from 'react-router-dom'

//styles
import '../components/navbar.scss'

const Navbar = () => {
    return <header>
        <h1>StackBackPack</h1>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
        </nav>
    </header>

}

export default Navbar