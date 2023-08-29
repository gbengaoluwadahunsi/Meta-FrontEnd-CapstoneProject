
import PropTypes from 'prop-types';

const Specials = (props) => {
  return (
    <>      
        <div className='card-container'>
            <section className="card">
                <img src={`./imagesInPublic/${props.img}`} alt={`${props.menu} Image`}/>
                <div className='menu-price'>
                    <h3>{props.menu}</h3>
                    <span className="price">{props.price}</span>
                </div>
                <p className='description'>{props.description}</p>
                <a href=""><span className="order-button">{props.order}</span>
                <img  className ="delivery" src={`./imagesInPublic/${props.deliveryLogo}`} alt={`${props.menu} Image`}/></a>
                
            </section>   
      
        </div>
    </>
  );
};

Specials.propTypes = {
  img: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  deliveryLogo: PropTypes.number.isRequired,
};

export default Specials;
