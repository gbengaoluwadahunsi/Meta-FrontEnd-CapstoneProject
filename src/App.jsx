// import React from 'react'
import { useState ,useReducer} from 'react'
import {Routes , Route, Link} from   'react-router-dom'
import Home from './Homepage'
import About from './AboutLittleLemon'
import Menu from './Menu'
import OrderOnline from './OrderOnline'
import Login from './Login'
import BookingPage from './BookingPage'
import Footer from './Footer'
import ConfirmedBooking from './ConfirmedBooking';
import './App.css'
import Image from './Images/725cbe0ca5da8536fc99c51e00d4d13628bd9745.png'

// Reducer function
const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // Implement logic to update available times based on selected date
      // For now, just return the same available times regardless of the date
      return action.times;
    default:
      return state;
  }
};

const App = () => {
  const initializeTimes = () => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  };
  

  const [availableTimes, setAvailableTimes] = useState(initializeTimes());

  const [times, dispatch] = useReducer(availableTimesReducer, initializeTimes());

 
  const updateTimes = async (newTimes) => {
    const updatedTimes = await fetchAPI(newTimes); // You need to implement this logic
    dispatch({ type: 'UPDATE_TIMES', times: updatedTimes });
  };
  
  
  

  return (
    <>
        <header>
          <nav>
            <Link to="/">
              <img src={Image} alt="Little Lemon restaurant Logo" />
            </Link>
            <ul>
              <li><Link to="/" aria-label="Navigate to Home">Home</Link></li>
              <li><Link to="/about" aria-label="Navigate to About page">About</Link></li>
              <li><Link to="/menu" aria-label="Navigate to Menu Page">Menu</Link></li>
              <li><Link to="/bookingPage" aria-label="Navigate to the booking Page">Reservations</Link></li>
              <li><Link to="/orderonline" aria-label="Navigate to OrderOnline Page">Order Online</Link></li>
              <li><Link to="/Login" aria-label="Login Page">Login</Link></li>
            </ul>
          </nav>
        </header>
       <Routes>
            <Route path="/" element={<Home availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />} />
            <Route path="About" element={<About />} />
            <Route path="Menu" element={<Menu />} />
            <Route path="OrderOnline" element={<OrderOnline/>} />
            <Route path="Login" element={<Login />} />   
            <Route path="/booking-confirmation" element={<ConfirmedBooking />} />
            
        </Routes>
        <BookingPage
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
        />      
        <Footer/>  
    </>
  );
}

export default App;
