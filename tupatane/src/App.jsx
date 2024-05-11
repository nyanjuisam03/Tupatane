import { useState } from 'react'
import {BrowserRouter,Routes,Route}from "react-router-dom"
import Home from "./pages/home"
import Login from './pages/login'
import SignUp from './pages/SignUp'
import Layout from './component/layout'
import TupataneHome from './pages/TupataneHome'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Layout>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/tupataneHome" element={<TupataneHome/>}/>
    </Routes>
     </Layout>
     </BrowserRouter>
    </>
  )
}

export default App
