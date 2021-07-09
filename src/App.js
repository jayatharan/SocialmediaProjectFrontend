import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from 'axios'

import Navigation from './components/Navigation'
import Home from './screens/Home'
import Login from './screens/Login'
import CreatePost from './screens/CreatePost';
import Profile from './screens/Profile'


function App() {

  const [user, setUser] = useState(null)

  const getToken = ()=>{
        const user = JSON.parse(localStorage.getItem("user"))
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
        }).catch((err)=>{
            localStorage.setItem('user', "")
            setUser(null)
        })
    }

  const userCheck = () => { 
    getUserData()  
    if(localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user'))) 
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
      <Route path='/edit/:id'><CreatePost /></Route>
      <Route path='/profile/:id'><Profile /></Route>
      <Route path='/login' component={Login}/>
    </BrowserRouter>
  );
}

export default App;
