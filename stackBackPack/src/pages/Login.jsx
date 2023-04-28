import React from 'react'
import LoginForm from '../components/LoginForm'

//animations
import { motion } from 'framer-motion'

//stlyes
import '../pages/Login.scss'

const Login = () => {
  return <div className='main-login-container'>
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className='main-login'>
      <article>
        <h3>Log in to your account</h3>
      </article>

      <LoginForm />


      <div>
        <p>
        Note: If no user is currently active, it may take up to one minute to log in/register to the app due to free tier hosting on render.com. The server automatically shuts down after 15 minutes of inactivity.
        </p>
      </div>
    </motion.main>
  </div>

}

export default Login