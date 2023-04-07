import React from 'react'

//styles
import './OneTotalListItem.scss'

const OneTotalListItem = (props) => {
    const  {value, label } = props

    return <li className='one-total-list-item'>
        <span className='one-total-category-name'>{label}</span>
        <div className='weight-unit-container'>
            <span>{value}</span>
            <span>kg</span>
        </div>
    </li>

}

export default OneTotalListItem