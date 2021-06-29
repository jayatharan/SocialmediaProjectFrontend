import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './screens/Home'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/login' />
    </BrowserRouter>
  );
}

export default App;
