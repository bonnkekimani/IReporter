import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
// import SignUp from './components/pages/SignUp';
import Signup from './components/signup';
import LoginForm from './components/login';
import AdminPage from './ADMIN_COMPONENT/AdminPage';
import UserPage from './User Components/UserPage';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/login' element={<LoginForm />} />

          <Route path='/adminpage' element={<AdminPage />} />

          <Route path='/userpage' exact element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
