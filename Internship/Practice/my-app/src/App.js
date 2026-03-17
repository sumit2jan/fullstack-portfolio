//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import Test from './components/Test';

function App() {
  return (
    <>
    <BrowserRouter>
    <Test/>
      <ToastContainer position='top-right' autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter> // react router dom. 
    </>
  );
}
export default App;
