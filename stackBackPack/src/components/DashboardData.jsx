import axios from 'axios'
import React from 'react'
import { useState, useEffect, useRef } from 'react'

import Graph from './Graph'
import TotalList from './TotalList'

//styles
import './DashboardData.scss'

//components
import Category from './Category'
import { result, set } from 'lodash-es'



const DashboardData = (props) => {




  const {
    idOfSelectedList,
    idOfSelectedCategory,
    dashboardDataHeading,
    handleClickOnAddItem,
    handleClickOnAddCategory,
    handleDeleteItemClick,
    handleDeleteCategoryClick,
    handleClickOnCategory,
    actualListNameValue,
    categories,
    setCategories,
    items,
    setItems,
    listsInDb,
    lists
  } = props

  const [dataForChart, setDataForChart] = useState({
    dataSet: [],
    labels: []
  })
  const [labels, setLabels] = useState([])

  useEffect(() => {
    console.log(dataForChart)
  }, [dataForChart])
  /*
    const cleanUp = () => {
      setDataSet([])
      setLabels([])
    }
  
    useEffect(() => {
  
      return () => {
        cleanUp
      }
    }, [])
  */
  useEffect(() => {
    //Filter the categories of the selected list
    const categoriesOfSelectedList = categories.filter(category => category._idOfList === idOfSelectedList)

    const categoriesNames = categoriesOfSelectedList
      .map(oneCat => oneCat.categoryName ? oneCat.categoryName : '')


    const categoriesWeights = () => {
      //Filter the items of the selected list
      const itemsOfSelectedList = items.filter(item => item._idOfList === idOfSelectedList)


      //Sorting and counting category weights by category id
      const result = itemsOfSelectedList.reduce((accumulator, currentValue) => {

        const existingItem = accumulator.find((item) => item._idOfCategory == currentValue._idOfCategory)
        console.log(currentValue.quantity)
        if (existingItem) {
          existingItem.totalWeight += currentValue.weight * currentValue.quantity

        } else {
          accumulator.push({ _idOfCategory: currentValue._idOfCategory, totalWeight: currentValue.weight * currentValue.quantity })
        }
        return accumulator
      }, []).map(item => item.totalWeight ? item.totalWeight : '')

      console.log(result)

      setDataForChart({ dataSet: result, labels: categoriesNames })

    }

    categoriesWeights()

  }, [categories, items, idOfSelectedList])







  //counting the weight of each category
  const sumWeights = (categoryId, setTotalCategoryWeight) => {
    console.log('Počítám items..' + categoryId)

    if (items.length > 0) {
      const itemsWeight = items.filter(item => item._idOfCategory == categoryId)
        .map(item => {
          if (item.weight) {
            if (item.unit === 'g') {
              //console.log('grams')
              const result = item.weight * item.quantity
              return result
            }

            if (item.unit === 'kg') {
              //console.log('kilograms')
              const result = (item.weight * 1000) * item.quantity
              return result
            }

            //TODO: add another units

          } else {
            return
          }
        })
        .reduce((actualVal, nextVal) => {
          return actualVal + nextVal
        }, 0)
      console.log(itemsWeight)

      // grams to kilograms
      setTotalCategoryWeight((itemsWeight / 1000).toPrecision(3))
      return itemsWeight
    }



  }
  //counting the number of items in each category
  const sumPcs = (categoryId, setTotalPcsInCatgeory) => {
    const itemsPcs = items.filter(item => item._idOfCategory == categoryId)
      .map(item => item.quantity ? item.quantity : '')
      .reduce((actualVal, nextVal) => {
        return actualVal + nextVal
      }, 0)

    setTotalPcsInCatgeory(itemsPcs)

    return itemsPcs
  }



  return <article className='dashboard-data'>
    <h3>{dashboardDataHeading}</h3>
    {
      actualListNameValue ?
        <div className='summary-container'>
          <div className='chart-container'>
            <Graph
              dataForChart={dataForChart}
            />
          </div>
          <div className='total-list-container'>
            <TotalList
              key={new Date().getTime()}
              labels={labels}
              dataForChart={dataForChart}
            />
          </div>
        </div>
        : ''
    }

    { /*<p>id listu: {idOfSelectedList}</p>*/}


    <ul className='category-list'>
      {actualListNameValue ?
        /*filters only the categories of the selected list and then maps */
        categories.filter(category => category._idOfList === idOfSelectedList).map(category => {
          return <Category
            key={category._id}
            categoryId={category._id}
            value={category.categoryName}
            idOfSelectedList={idOfSelectedList}
            handleClickOnAddItem={handleClickOnAddItem}
            handleDeleteItemClick={handleDeleteItemClick}
            handleDeleteCategoryClick={handleDeleteCategoryClick}
            handleClickOnCategory={handleClickOnCategory}
            items={items}
            setItems={setItems}
            idOfSelectedCategory={idOfSelectedCategory}
            listsInDb={listsInDb}
            lists={lists}
            categories={categories}
            setCategories={setCategories}
            sumWeights={sumWeights}
            sumPcs={sumPcs}
          />
        })
        : ''}



      {actualListNameValue ? <button
        className='add-category-button'
        name='add-category-button'
        onClick={handleClickOnAddCategory}
      >
        Add category
      </button> : ''}

    </ul>
  </article>

}

export default DashboardData