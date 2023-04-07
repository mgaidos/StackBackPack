import React from 'react'

import { motion } from 'framer-motion'




const Home = () => {
    return <motion.main
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }} >
        <article>
            <h3>About</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ex reprehenderit provident ut quidem architecto ab mollitia quod voluptatibus, eaque, ipsa itaque minus doloribus animi asperiores vero repellat quibusdam. Veniam!</p>
        </article>
    </motion.main>

}

export default Home