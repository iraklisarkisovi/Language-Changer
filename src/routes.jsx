import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import App from './App'
import Costume from './Customise'
import Customise from './Customise'
import Customiseres from './Customiseres'

function Routes1() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<App/>}/>
            <Route path='/custom' element={<Customiseres />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routes1
