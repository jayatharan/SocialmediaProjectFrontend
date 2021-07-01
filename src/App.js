import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './screens/Home'
import Login from './screens/Login'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/login' component={Login}/>
    </BrowserRouter>
  );
}

export default App;
