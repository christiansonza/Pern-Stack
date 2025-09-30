import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './view/Nav'
import NewUser from './view/NewEmployee'
import Lists from './view/EmployeeLists'
import Edit from './view/EditEmployee'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/newUser' element={<NewUser/>} />
        <Route path='/list' element={<Lists/>} />
        <Route path='/edit/:id' element={<Edit/>} />
      </Routes>
    </Router>
  )
}

export default App
