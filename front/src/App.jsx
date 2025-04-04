
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/Home';
import  Landing from './pages/Landing';
import Login from './pages/login';
import Signup from './pages/signup';
import Homes from './pages/Home';
import './App.css'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch("http://localhost:8080/messages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      console.log(json)
    };
    fetchAPI()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App
