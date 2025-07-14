import Navbar from './components/Navbar/Navbar';
import Cta from './components/Cta/Cta';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CakeDetails from './components/Cakes/CakeDetails';
import { useStateContext } from './context/StateContextProvider';
import About from './components/About/About';
import Orders from './components/Orders/Orders';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect } from 'react';
import Cancel from './pages/Cancel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessPage from './components/SuccessPage';
import ManageOrders from './components/Admin/ManageOrders';
import OrdersPage from './components/OrdersPage';

function App() {
  const { showCart } = useStateContext()
  useEffect(() => {
    document.querySelector("body").style.overflow = showCart ? "hidden" : "visible";
  },[showCart]);
  console.log("showCart is:", showCart);
  return (
      <BrowserRouter>
        <Navbar />
        { showCart && <Orders />}
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/cakes/:slug' element={<CakeDetails />}></Route>
          <Route path='/success' element={<SuccessPage/>}></Route>
          <Route path='/cancel' element={<Cancel />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <Cta />
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
      
  );
}

export default App;
