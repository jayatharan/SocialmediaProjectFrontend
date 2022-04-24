import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from 'axios'

import Navigation from './components/Navigation'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Questions from './screens/Questions';
import EditPost from './screens/EditPost';
import Page from './screens/Page'
import Admin from './screens/Admin';
import ReportedPosts from './screens/ReportedPosts';
import Lab from './screens/Lab';
import ReportedComments from './screens/ReportedComments';

function App() {

  const [user, setUser] = useState(null)

  useEffect(()=>{
    userCheck()
  },[])

  const getToken = ()=>{
        let user = null
        try{
            user = JSON.parse(localStorage.getItem("user"))
        }catch(err){

        }
        if(user){
            return user.token
        }
        return ""
  }
  
  const getUserData = ()=>{
        axios({
            method:"GET",
            url:'http://localhost:5000/user/my_data',
            headers: {"Authorization" : `Bearer ${getToken()}`},
        }).then((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
        }).catch((err)=>{
            localStorage.setItem('user', "")
            setUser(null)
        })
    }

  const userCheck = () => { 
    getUserData()  
    if(localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    } 
  }

  const logout = () => {
      localStorage.removeItem('user')
      setUser(null)
  }

  return (
    <BrowserRouter>
      <Navigation logout={logout} user={user} />
      <Route path='/' exact>
        <Home user={user} setUser={setUser} userCheck={userCheck} logout={logout} />
      </Route>
      <Route path='/admin' exact><Admin user={user} userCheck={userCheck} /></Route>
      <Route path='/admin/reported_posts'><ReportedPosts user={user} userCheck={userCheck} /></Route>
      <Route path='/admin/reported_comments'><ReportedComments user={user} userCheck={userCheck} /></Route>
      <Route path='/page/:id'><Page user={user} /></Route>
      <Route path='/lab/:id'><Lab user={user} /></Route>
      <Route path='/edit-post/:id'><EditPost /></Route>
      <Route path='/profile/:id'><Profile /></Route>
    </BrowserRouter>
  );
}

export default App;
