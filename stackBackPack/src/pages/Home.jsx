import React from 'react'

import { motion } from 'framer-motion'


//Styles
import './Home.scss'



const Home = () => {
    return <motion.main className='main-home'
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }} >
        <section className='home-container'>
            <h2 className='home-heading'>Hi! this app will help you keep track of the weight of your hiking gear.</h2>
            <article className='home-article'>
                <div className='article-1'>
                    <ul>
                        <li>Step one - Register</li>
                        <li>Step two - Login</li>
                        <li>Step three - Add new list</li>
                    </ul>
                </div>
                <div className='article-2'>
                    <img src="src/assets/stb-mini.png" alt="" />
                </div>
            </article>

        </section>
    </motion.main>

}

export default Home