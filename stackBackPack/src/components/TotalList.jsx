import React, { useEffect } from 'react'

//styles
import './TotalList.scss'

//components
import OneTotalListItem from './OneTotalListItem'

const TotalList = (props) => {


    const { dataForChart, setTotalUnit, totalUnit, items, idOfSelectedList } = props

    useEffect(() => {


    }, [])

    const itemsOfSelectedList = items.filter(item => item._idOfList == idOfSelectedList)
   // console.log(itemsOfSelectedList)

    const totalValue = dataForChart.dataSet.reduce((acc, cur) => {
        return acc + cur
    }, 0)

    

    /*
        const baseWeight = itemsOfSelectedList
            .filter(item => item.quantity > 0 && item.wearable === false && item.eatable === false)
            .reduce((acc, cur) => {
                return acc + (cur.weight * cur.quantity)
            }, 0)
    
    */



    const baseWeight = itemsOfSelectedList
        .filter(item => item.quantity > 0 && item.eatable === false)
        .reduce((acc, cur) => {

            //If a wearable item is inserted more than 1 time, each additional item counts towards the base weight
            if (cur.wearable && cur.quantity > 1) {
                return acc + (cur.weight * (cur.quantity - 1))
            }
            //If the item is wearable and there is 1 or less of it, it does not count towards the base weight
            if (cur.wearable && cur.quantity <= 1) {
                return acc
            }
            //If the item is not wearable, it counts towards the basic weight
            if (cur.wearable === false) {
                return acc + (cur.weight * cur.quantity)
            }

        }, 0)


    //add up the weight of all consumable items
    const consumable = itemsOfSelectedList
        .filter(item => item.quantity > 0 && item.eatable === true)
        .reduce((acc, cur) => {
            return acc + (cur.weight * cur.quantity)
        }, 0)




    const worn = itemsOfSelectedList
        .filter(item => item.quantity > 0 && item.wearable === true)
        .reduce((acc, cur) => {
            // if an wearable item is inserted more than 1 time, it is counted only once
            return acc + (cur.weight * 1)
        }, 0)



    const finalValue = (value, totalUnit) => {
        let result
        if (totalUnit === 'g') {
            result = value
        }

        if (totalUnit === 'kg') {
            result = value / 1000
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
                key={index}
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
                <span className='total-list-footer-total-value' >{finalValue(totalValue, totalUnit)}</span>
                <div>
                    <select defaultValue={totalUnit} name='unit-select' >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
            </div>
        </li>

        <li className='total-list-footer-container'>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-span'>Worn</span>
            </div>

            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-value' >{finalValue(worn, totalUnit) + ' ' + totalUnit}</span>
            </div>
        </li>

        <li className='total-list-footer-container'>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-span'>Consumable</span>
            </div>

            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-value' >{finalValue(consumable, totalUnit) + ' ' + totalUnit}</span>
            </div>
        </li>

        <li className='total-list-footer-container'>
            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-span'>Base&nbsp;weight</span>
            </div>

            <div className='total-list-footer-span-wrapper'>
                <span className='total-list-footer-total-value' >{finalValue(baseWeight, totalUnit) + ' ' + totalUnit}</span>
            </div>
        </li>

    </ul>

}

export default TotalList