import React from 'react'

import { motion } from 'framer-motion'

//config
import { HOME_IMAGE_SRC } from '../config'


//Styles
import './Home.scss'



const Home = () => {
    return <div className='main-home-container'>
        <motion.main className='main-home'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }} >
            <section className='home-container'>
                <h2 className='home-heading'>Hi! this app will help you keep track of the weight of your hiking gear.</h2>
                <article className='home-article'>
                    <div className='article-1'>
                        <ul>
                            <li>Register</li>
                            <li>Login</li>
                            <li>Create list</li>
                            <li>Share it</li>
                        </ul>
                    </div>
                    <div className='article-2'>
                        <img src={`${HOME_IMAGE_SRC}`} alt="" />
                    </div>


                </article>



            </section>
        </motion.main>
    </div>
}

export default Home