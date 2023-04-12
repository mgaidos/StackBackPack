import React from 'react'
import { useState, useEffect } from 'react'

//styles
import './OneTotalListItem.scss'

const OneTotalListItem = (props) => {
    const { value, label, totalUnit,  } = props
    const [totalValue, setTotalValue] = useState()

    useEffect(()=> {
        finalValue(totalUnit)
    },[])

    const finalValue = (totalUnit) => {
    let result
        if(totalUnit === 'g') {
            result = value
        }

        if(totalUnit === 'kg') {
            result = value / 1000
        }
        setTotalValue(result % 1 === 0 ? result : result.toFixed(3))
    }

    return <li className='one-total-list-item'>
        <div className='one-total-category-name-container'>
            <span className='one-total-category-name-wrapper'>
                {label}
            </span>
        </div>
        <div className='weight-unit-container'>
            <div className='weight-unit-wrapper'>
                <span>{totalValue}</span>
                <span>{totalUnit}</span>
            </div>
        </div>
    </li>

}

export default OneTotalListItem