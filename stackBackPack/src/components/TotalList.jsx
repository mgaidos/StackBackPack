import React from 'react'

//styles
import './TotalList.scss'

//components
import OneTotalListItem from './OneTotalListItem'

const TotalList = (props) => {

    const { dataForChart } = props

    const totalValue = dataForChart.dataSet.reduce((acc, cur) => {
        return acc + cur
    }, 0)

    return <ul className='total-list'>
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
            />)
        }

        <li className='total-list-footer-container'>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-span'>Total</span>
            </div>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-value' >{totalValue}</span>
                <div>
                    <select>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
            </div>
        </li>

    </ul>

}

export default TotalList