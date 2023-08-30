
import  BookingForm from  './BookingForm'
import  './App.css'
import PropTypes from 'prop-types';

const BookingPage = ({ submitForm, availableTimes, setAvailableTimes }) => {
return (
     <BookingForm submitForm={submitForm} availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />
);
}

BookingForm.propTypes = {
     submitForm: PropTypes.func.isRequired,
     availableTimes: PropTypes.array.isRequired,
     setAvailableTimes: PropTypes.func.isRequired
   };


export default BookingPage;