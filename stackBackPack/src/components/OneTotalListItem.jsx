import React from 'react'

//styles
import './OneTotalListItem.scss'

const OneTotalListItem = (props) => {
    const { value, label } = props

    return <li className='one-total-list-item'>
        <div className='one-total-category-name-container'>
            <span className='one-total-category-name-wrapper'>
                {label}
            </span>
        </div>
        <div className='weight-unit-container'>
            <div className='weight-unit-wrapper'>
                <span>{value}</span>
                <span>kg</span>
            </div>
        </div>
    </li>

}

export default OneTotalListItem