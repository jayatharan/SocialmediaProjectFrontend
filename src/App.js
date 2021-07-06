import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './screens/Home'
import Login from './screens/Login'
import CreatePost from './screens/CreatePost';
import Navigation from './components/Navigation'
function App() {

  const [user, setUser] = useState(null)

    const userCheck = () => { 
        if(localStorage.getItem('user')) setUser(JSON.parse(localStorage.getItem('user'))) 
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

  return (
    <BrowserRouter>
      <Navigation logout={logout} />
      <Route path='/' exact>
        <Home user={user} setUser={setUser} userCheck={userCheck} logout={logout} />
      </Route>
      <Route path='/edit/:id'><CreatePost /></Route>
      <Route path='/login' component={Login}/>
    </BrowserRouter>
  );
}

export default App;
