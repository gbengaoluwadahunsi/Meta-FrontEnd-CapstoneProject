// import React from "react";
import {Link} from   'react-router-dom'
import './App.css'
import CardArray from './CardArray'
import Image from './Images/3d3cce7a3104bf255ed0e69195e2a157338c1bff.jpg'
import Cards from './Specials'



const Homepage = () => {

    const Cadd = CardArray.map(item => (
        <Cards
          key={item.id}
          img={item.img}
          menu={item.menu}
          price={item.price}
          description={item.description}
          order={item.order}
          deliveryLogo={item.deliveryLogo}
        />
      ))


    return(
        <>        
            <section className='first-section'>
                <div className='content-grid'>
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <Link to="/BookingPage" className="booking-button">Reserve  a Table</Link>
                </div>
                <div className="img">
                    <img src= {Image} alt="homepage Image" />
                </div> 
            </section> 
            <section className="second-section">
                <h1>This Week&apos;s Specials!</h1>
                <Link to= '/Menu' className='booking-button online-order'>Online Menu</Link>
            </section>   
            <div className='card-container'>
            {Cadd}  
            </div>   
            

            
            
        </>
    )
}

export default Homepage;