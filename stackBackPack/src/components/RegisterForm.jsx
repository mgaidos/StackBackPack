import React from 'react'

import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

//components
import FormInput from './FormInput'

//styles
import '../components/RegisterForm.scss'







const RegisterForm = () => {

  const [dbEmailErr, setDbEmailErr] = useState('')

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [registered, setRegistred] = useState(false)
  const [msg, setMsg] = useState('');
  const navigate = useNavigate()

  const { username, email, password } = values

  //Toto bude poslední krok po validaci formu
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
//todo axios
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })



      const data = await res.json()
      console.log(data)
      setDbEmailErr(data.message ===
        'This email is already registered'
        ?
        'This email is already registered'
        :
        ''
      )

      console.log(dbEmailErr.length)
      
        if (data.message === 'This email is already registered') {
          return
        } else {
          navigate('/login')
        }
      


      //After successful registration you will be redirect to login



    } catch (err) {
      console.log(err);

    }
  }

  const inputs = [
    {
      id: 1,
      name: "username",
      placeholder: "Username",
      type: "text",
      required: true,
      errMsg: 'Username should be 3-15 characters without any special characters.',
      pattern: '^[A-Za-z0-9]{3,16}$',
      title: 'Username should be 3-15 characters without any special characters.'
    },
    {
      id: 2,
      name: "email",
      placeholder: "Email",
      type: "email",
      required: true,
      errMsg: 'Insert valid email. For example email@address.com.',
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
      title: 'Example: email@address.com'
    },
    {
      id: 3,
      name: "password",
      placeholder: "Password",
      type: "password",
      required: true,
      errMsg: 'Password should be minimum 6 characters long.',
      pattern: "^.{6,}$",
      title: 'Password should be minimum 6 characters long.',
      autocomplete: "off"
    },
    {
      id: 4,
      name: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
      required: true,
      errMsg: 'Password do not match!',
      pattern: values.password
    }
  ]

  return <form
    className='register-form'
    onSubmit={handleSubmit}
  //noValidate
  >

    {inputs.map((input) => (
      <FormInput
        key={input.id}
        required={input.required}
        type={input.type}
        name={input.name}
        placeholder={input.placeholder}
        errMsg={input.errMsg}
        pattern={input.pattern}
        value={values[input.name]}
        dbEmailErr={dbEmailErr}
        title={input.title}
        autocomplete={input.autocomplete}
        onChange={(e) => {
          setValues({
            ...values,
            [input.name]: e.target.value
          })
          console.log(values.email)
        }}
      />
    ))}
    <button type='submit'>Register</button>

    <Link to="/login">Already have an account?</Link>

  </form>

}

export default RegisterForm