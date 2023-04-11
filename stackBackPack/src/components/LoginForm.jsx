import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'


//components
import FormInput from './FormInput'


//styles
import '../components/LoginForm.scss'

const LoginForm = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const { email, password } = values


    const [dbEmailErr, setDbEmailErr] = useState('')
    const [dbPasswordErr, setDbPasswordErr] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/login', {
            email, password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Custom-Header': 'login'
            }
        })
            .then(response => {
                const data = response.data
                console.log(data)
                

                if (data.message === 'Login successful') {
                    localStorage.setItem('token', data.token)
                    navigate(`/dashboard/${data.userId.userId}`)
                } else {
                    return
                }
            })
            .catch(err => {
                console.log(err)
                setDbEmailErr(err.response.data.message === 'User not found' ? 'User not found' : '')
                setDbPasswordErr(err.response.data.message === 'Invalid password' ? 'Invalid password' : '')
            })


    }


    const inputs = [
        {
            id: 1,
            name: 'email',
            placeholder: 'Email',
            type: 'email',
            required: true,
            errMsg: 'Insert email you used to register.',
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
            title: 'Enter the email you used to register'
        },
        {
            id: 2,
            name: 'password',
            placeholder: 'Password',
            type: 'password',
            required: true,
            errMsg: 'Insert correct password',
            pattern: "^.{6,}$",
            title: 'Enter password'
        }
    ]



    return <form className='login-form' onSubmit={handleSubmit}>

        {inputs.map(input => (
            <FormInput
                key={input.id}
                placeholder={input.placeholder}
                required={input.required}
                type={input.type}
                name={input.name}
                errMsg={input.errMsg}
                dbEmailErr={dbEmailErr}
                dbPasswordErr={dbPasswordErr}
                pattern={input.pattern}
                value={values[input.name]}
                title={input.title}
                onChange={(e) => {
                    setValues({
                        ...values,
                        [input.name]: e.target.value
                    })
                    console.log(values.email)
                }}
            />
        ))}

        <button type='submit'>Login</button>

        <Link to="/register">Don't have an account yet?</Link>

    </form>


}

export default LoginForm