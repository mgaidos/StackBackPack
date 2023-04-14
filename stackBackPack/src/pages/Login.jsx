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
    </motion.main>
  </div>

}

export default Login