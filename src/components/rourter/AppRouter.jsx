import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Approval from '../../pages/approval/Approval'
import Notice from '../../pages/notice/Notice'

const AppRouter = () => {
  return (
  <Routes>
    <Route path="/" exact={true} element={<Home/>}></Route>
    <Route path="/approval" exact={true} element={<Approval/>}></Route>
    <Route path="/notice" exact={true} element={<Notice/>}></Route>
  </Routes>
  )
}

export default AppRouter