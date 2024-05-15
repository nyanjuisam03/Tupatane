import { useState } from 'react'
import {BrowserRouter,Routes,Route}from "react-router-dom"
import Home from "./pages/home"
import Login from './pages/login'
import SignUp from './pages/SignUp'
import Layout from './component/layout'
import TupataneHome from './pages/TupataneHome'
import Proflie from './pages/proflie'
import JoinGroup from './pages/JoinGroup'
import CreatedGroup from './pages/createdGroup'
import GroupChat from './pages/GroupChat'
import MyGroups from './pages/MyGroups'
import MyFriends from './pages/MyFriends'
import PersonalChat from './pages/PersonalChat'
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
    <Route path='/tupatane-profile' element={<Proflie/>}/>
    <Route path='/tupatane-makeGroup' element={<CreatedGroup/>}/>
  <Route path='/tupatane-joinGroup' element={<JoinGroup/>}/>
  <Route path='/groups/:groupId/:groupName' element={<GroupChat/>}/>
  <Route path='/mygroups' element={<MyGroups/>}/>
  <Route path='/myfriends' element={<MyFriends/>}/>
  <Route path='/private-chat/:id' element={<PersonalChat/>}/>

    </Routes>
     </Layout>
     </BrowserRouter>
    </>
  )
}

export default App
