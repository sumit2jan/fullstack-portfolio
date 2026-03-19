//import logo from './logo.svg';
import './App.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hello from "./pages/Hello";
import { AuthProvider } from './context/Authcontext';
import PrivateRoute from "./middleware/privateRoute";




function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer position='top-right' autoClose={2000} />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<p>404 Not Found</p>} />
            <Route element={<PrivateRoute />}>
            <Route path="/hello" element={<Hello/>} />
          </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
