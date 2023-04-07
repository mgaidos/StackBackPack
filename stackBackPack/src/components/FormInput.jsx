import React from 'react'

import { useState } from 'react'

//styles
import '../components/FormInput.scss'



const FormInput = (props) => {

    const [focused, setFocused] = useState(false)

    const handleFocus = (e) => {
        setFocused(true)
    }

    const { name, placeholder, type, required, pattern, errMsg, value, onChange, title, onBlur, autocomplete, dbPasswordErr, dbEmailErr, ...rest } = props

    return <div className='form-input'>
        <input
            placeholder={placeholder}
            name={name}
            type={type}
            required={required}
            pattern={pattern}
            value={value}
            onChange={onChange}
            title={title}
            onBlur={handleFocus}
            focused={focused.toString()}
            autoComplete={autocomplete}

        />
        <span>{errMsg}</span>
        {
            name === 'email' && dbEmailErr && <span className='db-err'>{dbEmailErr}</span>
            ||
            name === 'password' && dbPasswordErr && <span className='db-err'>{dbPasswordErr}</span>
        }
    </div>
}

export default FormInput