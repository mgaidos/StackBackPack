import React from 'react'

//animations
import { motion } from 'framer-motion'



//components
import RegisterForm from '../components/RegisterForm'



//styles
import '../pages/Register.scss'

const Register = () => {


  return <div className='main-register-container'>
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className='main-register'
    >
      <article >
        <h3>Create an acount</h3>
      </article>

      <RegisterForm />


      <div>
        <p>
        Note: If no user is currently active, it may take up to one minute to log in/register to the app due to free tier hosting on render.com. The server automatically shuts down after 15 minutes of inactivity.
        </p>
      </div>
    </motion.main>
  </div>
}

export default Register