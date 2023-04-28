import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

//styles


//pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SharedList from './pages/SharedList'


//pages
import ShardeLayout from './pages/ShardeLayout'



const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [isSharedList, setIsSharedList] = useState(false)
  const [showLists, setShowLists] = useState(false)

  const handleShowLists = () => {
    setShowLists(!showLists)
  }


 
  return <BrowserRouter >
    <Routes>
      <Route path='/' element={<ShardeLayout handleShowLists={handleShowLists} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route index element={<Home />} />
        <Route path='/register' element={<Register />} />  
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/:userId' element={<Dashboard showLists={showLists} setShowLists={setShowLists} setLoggedIn={setLoggedIn}  />} />
      </Route>
      <Route path='/my-list/:userId/:listId' element={<SharedList  setIsSharedList={setIsSharedList} />} />
    </Routes>
  </BrowserRouter>



}

export default App