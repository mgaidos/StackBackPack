import React, { useEffect } from 'react'

//styles
import './TotalList.scss'

//components
import OneTotalListItem from './OneTotalListItem'

const TotalList = (props) => {


    const { dataForChart, setTotalUnit, totalUnit} = props

    const totalValue = dataForChart.dataSet.reduce((acc, cur) => {
        return acc + cur
    }, 0)

    const finalValue = (totalUnit) => {
        let result
        if (totalUnit === 'g') {
            result = totalValue
        }

        if (totalUnit === 'kg') {
            result = totalValue / 1000
        }
        return result % 1 === 0 ? result : result.toFixed(3)
    }

    const onSelectChange = (e) => {

        const changingElement = e.target.name

        if (changingElement === 'unit-select') {
            setTotalUnit(e.target.value)
        }

    }


    return <ul onChange={onSelectChange} className='total-list'>
        <li className='total-list-header-container'>
            <div className='total-list-header-span-wrapper'>
                <span className='total-list-header-category-span'>Category</span>
            </div>
            <div className='total-list-header-span-wrapper'>
                <span className='total-list-header-weight-span'>Weight</span>
            </div>
        </li>

        {
            dataForChart.dataSet.map((value, index) => <OneTotalListItem
                dataForChart={dataForChart}
                value={value}
                label={dataForChart.labels[index]}
                totalUnit={totalUnit}
    
            />)
        }

        <li className='total-list-footer-container'>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-span'>Total</span>
            </div>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-value' >{finalValue(totalUnit)}</span>
                <div>
                    <select defaultValue={totalUnit} name='unit-select' >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
            </div>
        </li>

    </ul>

}

export default TotalList