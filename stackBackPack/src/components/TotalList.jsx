import React from 'react'

//styles
import './TotalList.scss'

//components
import OneTotalListItem from './OneTotalListItem'

const TotalList = (props) => {

    const { dataForChart } = props

    const totalValue = dataForChart.dataSet.reduce((acc, cur)=> {
        return acc + cur
    }, 0)

    return <ul className='total-list'>
        <li className='total-list-header'>
            <span className='total-list-header-span'>Category</span>
            <span className='total-list-header-span'>Weight</span>
        </li>

        {
            dataForChart.dataSet.map((value, index) => <OneTotalListItem
                    dataForChart={dataForChart}
                    value={value}
                    label={dataForChart.labels[index]}
                 />)
        }

        <li className='total-list-footer'>
            <span className='one-total-category-name'>Total</span>
            <div className='total-sum-of-weights'>
                <span>{totalValue}</span>
                <span>kg</span>
            </div>
        </li>

    </ul>

}

export default TotalList